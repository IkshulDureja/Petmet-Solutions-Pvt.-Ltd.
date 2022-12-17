import * as Razorpay from 'razorpay'
import MainLogo from "../pictures/Logo WT Tagline PET MET.png";


const loadScript=(src)=> {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			reject(false)
		}
		document.body.appendChild(script)
	})
}

var initialOptions = {
    "key_id": "rzp_test_HpdJifpKFyBE1U",
    "key": "rzp_test_HpdJifpKFyBE1U",
    "name": "Petmet",
    "description": "Test Transaction",
    "image": "https://picsum.photos/200",
    
    "handler": function (response){
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature)
    },
    
    "notes": {
        
    },
    "theme": {
        "color": "#3399cc"
    }
};

var paymentRazorpay= async(options)=>{
    try {
        var orderOptions= initialOptions
    orderOptions.amount= options.data.amount
    orderOptions.currency= options.data.currency
    
    orderOptions.order_id= options.data.id
    console.log(orderOptions)

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        console.log('script lag gyi')
    var rzp1 = new window.Razorpay(orderOptions)
    rzp1.on('payment.failed', function (response){
        console.log("<-----yahan bhi error hai------------>")
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
    })

    rzp1.open();
    } catch (error) {
        console.log("<---------yahan error hai----------->")
        console.error(error)
    }
    
}

export default paymentRazorpay