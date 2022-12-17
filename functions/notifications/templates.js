var templates={};

templates.generatePayload= (docData, purposeId)=>{
    var [main, sub]= purposeId.split('_')
    var titles= {
        appointment: {
            registered: `initiated procedure for scheduling appointment with Dr. ${docData.doctorName}`,
            confirmed: `appointment confirmed with Dr. ${docData.doctorName}`,
            accepted: `Dr. ${docData.doctorName} accepted your appointment request`,
            declined: `Dr. ${docData.doctorName} declined your appointment request`
        },
        order: {
            placed: "order paced"
        },
        broadcast: {
            all: `${docData.title}`,
            topic: `${docData.title}`
        },
        appointmentReverse: {
            registered: `you have an appointment request`,
            cancelled: `${docData.patientName} cancelled the request`
        },     
    }

    var bodies= {
        appointment: {
            registered: `initiated procedure for scheduling appointment with Dr. ${docData.doctorName}`,
            confirmed: `appointment confirmed with Dr. ${docData.doctorName}`,
            accepted: `Dr. ${docData.doctorName} accepted your appointment request`,
            declined: `Dr. ${docData.doctorName} declined your appointment request`
        },
        order: {
            placed: "order paced"
        },
        broadcast: {
            all: `${docData.description}`,
            topic: `${docData.description}`
        },
        appointmentReverse: {
            registered: `you have an appointment request`,
            cancelled: `${docData.patientName} cancelled the request that was scheduled for ${docData.date} at ${docData.time}`
        }        
    }

    var payload= {
        notification:{
            title: titles[main][sub],
            body: bodies[main][sub]
        }
    }
    return payload
}

module.exports= templates