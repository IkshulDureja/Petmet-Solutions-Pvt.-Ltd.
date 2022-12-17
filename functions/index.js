const functions = require('firebase-functions')
const admin = require('firebase-admin')
// initialize app hamesha functions aur admin import krne ke baad kar do nahi toh functions pagal ho jate hain
admin.initializeApp();

const express= require('express')
var bodyParser= require('body-parser')
const cors= require('cors') 
const appRouter= require('./http/index')



const httpListner= express()
httpListner.use(cors())
httpListner.use(bodyParser.json())
httpListner.use(bodyParser.urlencoded({extended: true}))
httpListner.use('/payment', appRouter)

const notify= require('./notifications/index')
const background= require('./background/index')
const sendMail= require('./mail/index')


const db = admin.firestore()
// const fcm= admin.messaging()

// appointment notification 
exports.fixAppointment= functions.firestore
    .document('user/{uid}/appointments/{appId}')
    .onCreate(async(snap, context)=>{

        var usrPromise= db.collection('user').doc(context.params.uid).get()
        var doctorPromise= db.collection('vet').doc(snap.data().doctorId).get()

        var [usr, doctor]= await Promise.all([usrPromise, doctorPromise])
        var notifiactionPromise= notify.sendToSingleUser(usr.data().deviceToken, {...snap.data(), doctorName: doctor.data().Name || `${doctor.data().firstName} ${doctor.data().lastName}`}, 'appointment_registered', 'user', usr.id)
        var vetNotificationPromise= notify.sendToSingleUser(doctor.data().deviceToken, {...snap.data(), patientName: usr.data().name || `${usr.data().firstName} ${usr.data().lastName}`}, 'appointmentReverse_registered', 'vet', doctor.id)
        var user= {
            name: usr.data().name || usr.data().firstName,
            id: context.params.uid
        }
        var setAppointmentForVetPromise= background.setAppointentForVet(user, {...snap.data(), key: context.params.appId})
        var setAppointmentForAdminPromise= background.setAppointentForAdmin(user, {...snap.data(), key: context.params.appId})
        var addKeyPromise= db.collection('user').doc(context.params.uid).collection('appointments').doc(context.params.appId).update({key: context.params.appId, status: 'pending'})
        // var notificationPromise= notify.sendAppointmentConfirmationNotification(deviceToken, snap.data())
        var sendMailPromise= sendMail.appointmentConfirmation(snap.data(), usr.data().mail || usr.data().email )
        try{
            // var results= await Promise.all([setAppointmentForVetPromise, notificationPromise, sendMailPromise])
            return Promise.all([notifiactionPromise, vetNotificationPromise, setAppointmentForVetPromise, setAppointmentForAdminPromise, sendMailPromise, addKeyPromise])
                
        }catch(error){
            console.log(error)
        }
        
})

exports.orderConfirmationMail= functions.firestore.document('All_Orders/{orderId}')
    .onUpdate(async(change, context)=>{
        if(change.after.data().paid){
            await sendMail.orderConfirmaion(change.after.data().orderDetails, change.after.data().mailId)
        }
})

// vet dwara appointment mai kiye changes client ki collection mai
exports.appointmentStatusChangeByVet= functions.firestore.document('/vet/{vid}/appointments/{appId}')
        .onUpdate(async(change, context)=>{

            var doctorPromise= db.collection('vet').doc(context.params.vid).get()
            var usrPromise= db.collection('user').doc(change.after.data().patientId).get()

            var [usr, doctor]= await Promise.all([usrPromise, doctorPromise])

            var purpose1= 'appointment_'+change.after.data().status
            // var purpose2= 'appointmentReverse_'+change.after.data().status
            var notifiactionPromise= notify.sendToSingleUser(usr.data().deviceToken, {...change.after.data(), doctorName: doctor.data().Name} , purpose1, 'user', usr.id )
            // var vetNotificationPromise= notify.sendToSingleUser(doctor.data().deviceToken, {...change.after.data(), patientName: usr.data().name || usr.data().firstName + usr.data().lastName}, purpose2)

            if(change.after.data().status != change.before.data().status && !change.after.data().cancelledByUser){

                let clientRef= db.collection('user').doc(change.after.data().patientId)
                let docRef= clientRef.collection('appointments').doc(change.after.data().key) 
                var userChangePromise= docRef.update({
                    status: change.after.data().status,
                    key: change.after.data().key
                })
                // send the appointment status to appointments collection for vet to see

                let ref= db.collection('Appointments').doc(change.after.data().key)
                var adminChangePromise= ref.update({
                    status: change.after.data().status,
                    key: change.after.data().key
                })
            }

            try {
                return Promise.all([notifiactionPromise, userChangePromise, adminChangePromise])
            } catch (error) {
                console.log("appointmentStatusChangeByVet mai error hai".toUpperCase())
                console.error(error)
            }
            
            
            
})

exports.cancelAppointment= functions.firestore
    .document('user/{uid}/appointments/{appId}')
    .onUpdate(async(change, context)=>{

        if(change.after.data().status =='cancelled' && change.after.data().status != change.before.data().status){
            var usrPromise= db.collection('user').doc(context.params.uid).get()
            var doctorPromise= db.collection('vet').doc(change.after.data().doctorId).get()

            var [usr, doctor]= await Promise.all([usrPromise, doctorPromise])
            
            var vetNotificationPromise= notify.sendToSingleUser(doctor.data().deviceToken, {...change.after.data(), patientName: usr.data().name || "name field missing in patient" }, 'appointmentReverse_cancelled', 'vet', doctor.id)
            

            let clientRef= db.collection('vet').doc(change.after.data().doctorId)
                let docRef= clientRef.collection('appointments').doc(change.after.data().key) 
                var vetChangePromise= docRef.update({
                    status: change.after.data().status,
                    key: change.after.data().key,
                    cancelledByUser: true
                })
                // send the appointment status to appointments collection for vet to see

            let ref= db.collection('Appointments').doc(change.after.data().key)
            var adminChangePromise= ref.update({
                status: change.after.data().status,
                key: change.after.data().key,
                cancelledByUser: true
            })
            // var notificationPromise= notify.sendAppointmentConfirmationNotification(deviceToken, snap.data())
            // var sendMailPromise= sendMail.appointmentConfirmation(change.after.data(), usr.data().mail || usr.data().email )
            try{
                // var results= await Promise.all([setAppointmentForVetPromise, notificationPromise, sendMailPromise])
                return Promise.all([vetNotificationPromise, vetChangePromise, adminChangePromise])
                    
            }catch(error){
                console.log(error)
        }
    }
        
}) 

exports.orderDelivered= functions.firestore
    .document('All_Orders/{order_id}')
    .onUpdate(async(change, context)=>{
        if(change.after.data()!= change.before.data()){
            var info= change.after.data()
            var uid= info.uid
            var order_id= context.params.order_id
            var ref= db.collection('user').doc(uid).collection('orders').doc(order_id)
            
            var userUpdatePromise= ref.update({
                deliveryStatus: info.deliveryStatus
            })
            if(info.deliveryStatus== 'delivered') 
                sendMail.orderDelivered(info.mailId)
            
            return Promise.all([userUpdatePromise])
        }
    })

exports.paymentFunction= functions.https.onRequest(httpListner)