import React, {useState, useEffect} from 'react';
import OutCards from './OutofStockCard';
import {db} from '../../firebase'

const OutOfStock = () => {
    const [arr, setArr]= useState([])
    useEffect(()=>{
        db.collection('All_Products').where('details.quantity', '==', '0').onSnapshot(snap=>{
            var temp=[]
            snap.forEach(doc=>{
                temp.push({
                    key: doc.id,
                    name: doc.data().details.name,
                    category: doc.data().category
                })
            })
            setArr(temp)
        })
    }, [arr])
    return ( 
        <div className="row">
            <div className="col-12 col-sm-6 col-lg-3">
                {
                    arr.length? arr.map(pro=>( <OutCards data={pro} />)): null
                }
               
            </div>
        </div>
     );
}
 
export default OutOfStock;