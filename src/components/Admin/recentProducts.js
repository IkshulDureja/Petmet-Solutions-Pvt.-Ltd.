import React, { Component, useState, useEffect } from 'react';
import './Admin.css';
import Product from './product';
import {db} from '../../firebase'


export default function Products(){
    const [products, setProducts]= useState([])

    const loadProducts= async(category)=>{
        var temp=[]
        var docs= await db.collection('items').doc(category).collection('products').get()
        docs.forEach(doc=>{
            temp.push(doc.data())
        })
        console.log(temp)
        return temp
    }
    const fillProducts= async()=>{
        var items= await db.collection('items').get()
        var allProducts=[]
        items.forEach(cat=>{
            var catProducts= loadProducts(cat.data().type)
            allProducts.push([...catProducts])
        })
        return allProducts 
    }
    useEffect(()=>{
        // var allProducts= fillProducts()
        // setProducts(allProducts)
        db.collection('All_Products').get().then(docs=>{
            var temp=[]
            docs.forEach(doc=>temp.push(doc.data()))
            setProducts(temp)
        })
    }, [])

    return ( 
        <div className="row">
            {
                products.length? products.map(pro=>(
                        <div className="col-lg-6 col-12">
                            <Product data= {pro.details}/>
                        </div>
                ))
                : null
            }
            
            
        </div>
     );
}

// class RecentProducts extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             products:[]
//         }
//     }

    
//     async componentDidMount(){
//         var items= await db.collection('items').get()

//             items.forEach(async(cat)=>{
//                 var temp=[]
//                 var docs= await db.collection('items').doc(cat.data().type).collection('products').get()

//                 docs.forEach(doc=>{
//                     temp.push(doc.data)
//                 })
//                 this.state.products.push(...temp)
//             })
//             console.log(this.state.products)
//     }
//     render() { 
//         return ( 
//             <div className="row">
//                 {
//                     this.state.products.length? this.state.products.map(pro=>(
//                             <div className="col-lg-6 col-12">
//                                 <Product data= {pro.details}/>
//                             </div>
//                     ))
//                     : null
//                 }
                
                
//             </div>
//          );
//     }
// }
 
// export default RecentProducts;