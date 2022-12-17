var admin= require('firebase-admin')
var templates= require('./templates')

var db= admin.firestore()
var sendMail={};

// order confirmation email

sendMail.orderConfirmaion= (orderDetails, mailId)=>{
    return new Promise((resolve, reject)=>{
        db.collection('mail').add(templates.orderConfirmation(orderDetails, mailId))
        .then(doc=> resolve(`queued for delivery: ${doc.id}`))
        .catch(err=> reject(`some error occurred: ${err}`))
    })
}

// appointment confirmation email

sendMail.appointmentConfirmation= (docData, mailId)=>{
    return new Promise((resolve, reject)=>{
        db.collection('mail').add(templates.appointmentConfirmation(docData, mailId))
        .then(doc=> resolve(`queued for delivery: ${doc.id}`))
        .catch(err=> reject(`some error occurred: ${err}`))
    })
}
// offer-promotion email

sendMail.offerPromotion= (offerDetails, mailIdArray)=>{
    return new Promise((resolve, reject)=>{
        db.collection('mail').add(templates.offerPromotion(offerDetails, mailIdArray))
        .then(doc=> resolve(`queued for delivery: ${doc.id}`))
        .catch(err=> reject(`some error occurred: ${err}`))
    })
}

sendMail.orderDelivered= (mailId)=>{
    return new Promise((resolve, reject)=>{
        db.collection('mail').add(templates.orderDelivered(mailId))
        .then(doc=> resolve(`queued for delivery: ${doc.id}`))
        .catch(err=> reject(`some error occurred: ${err}`))
    })
}

module.exports= sendMail