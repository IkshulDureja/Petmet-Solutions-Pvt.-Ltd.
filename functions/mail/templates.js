var templates={};

templates.orderConfirmation=(orderDetails, mailId)=>{
    // orderDetailsSchema={
    //     // details can be trusted as they will be crosschecked while posting to All_Orders collection
    //     products:[
    //         {
    //             product: 'product name',
    //             productId:'product  id',
    //             units: 69,
    //             costPerPc: 99
    //         }
    //     ],
    //     total: 990,
    //     user: "username"

    // }
    var orderSummary=``
    orderDetails.products.forEach((product, index)=>{
        orderSummary+=`${index}. ${product.productName} (*${product.units})\n`
    })
    orderSummary+=`Total: ${orderDetails.total}`
    return {
        to: mailId,
        message:{
            subject: 'petmet-order placed',
            text: 'order confirmed...',
            html: `
                <div>
                    <pre>
                    Dear ${orderDetails.user},
                        Your order has been placed. It will be delivered in 4-6 working days.
                        Order details:
                        ${orderSummary}
                        Regards,
                        Team petmet
                    </pre>
                </div>
            `
        }
    }
}

templates.appointmentConfirmation=(docData, mailId)=>{
    var confirmString= `Appointment booked with Dr. ${docData.doctorName} on ${docData.date} at ${docData.time}`
    return {
        to: mailId,
        message: {
            subject: 'Appointment Booked',
            text: 'Vet-Appointment booked...',
            html: `
                <div>
                <pre>
                Dear User,
                    ${confirmString}\n
                    Regards,
                    Team petmet
                </pre>
                </div>
            `
        }
    }
}

templates.offerPromotion=(offerDetails, mailIdArray)=>{
    return {
        to: mailIdArray,
        message: {
            subject: 'exciting deals',
            text: 'petmet-offers...',
            html: `
                <div>
                <pre>
                Dear User,
                    ${offerDetails.description}\n
                    For more info <a href=${offerDetails.link}>Click here</a>
                    Regards,
                    Team petmet
                </pre>
                </div>
            `
        }
    }
}

templates.orderDelivered= (mailId)=>{
    var confirmString= `Your order was delivered successfully. Thanks for shopping with us`
    return {
        to: mailId,
        message: {
            subject: 'Order Delivered',
            text: 'Order Delivered...',
            html: `
                <div>
                <pre>
                Dear User,
                    ${confirmString}\n
                    Regards,
                    Team petmet
                </pre>
                </div>
            `
        }
    }
}

module.exports= templates