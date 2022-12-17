var admin= require('firebase-admin')
var templates= require('./templates')

// var db= admin.firestore()
var fcm= admin.messaging()
var db= admin.firestore()
var notify={};

// template file
// docData= snap
notify.sendToSingleUser= (deviceTokenSent, docData, purposeId, coll, docId)=>{
    var deviceToken= deviceTokenSent || false
    var message= templates.generatePayload(docData, purposeId)
    message.token= deviceToken
    return new Promise((resolve, reject)=>{
        if(deviceToken){
            var dateObj= new Date()
            var str= dateObj.toISOString()
            var dateStr= str.slice(0, str.length-1)+'+5:30'
            var p1= fcm.send(message)
            var p2= db.collection(coll).doc(docId).collection('notifications').doc(dateStr).set({message: message.notification.title})
            //fcm.send(message).then((messageId)=>resolve(messageId))
            resolve(Promise.all([p1, p2]))
            .catch((error)=>reject(`error while sending notification to ${message.token}: ${error} `))
        }
        else resolve(69)
        
    })
}

// ofer promotion notification

module.exports= notify

