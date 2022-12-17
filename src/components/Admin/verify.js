import React, { Component } from 'react';
import DoctorCard from './doctorCard';
import {db} from '../../firebase'

class VerifyVet extends Component {
    state = { vets: null }
    
    componentDidMount(){
        db.collection('vet').where('verified','==',false).get()
            .then(docs=>{
                var temp=[]
                docs.forEach(doc=>{
                    temp.push({
                        info: doc.data(),
                        id: doc.id
                    })
                })
                this.setState({vets: temp})
                console.log(this.state)
            })
            
    }
    render() { 
        return ( 
            <div>
                <div className="row">
                    {
                        this.state.vets? this.state.vets.map(vet=>
                            (
                                <div className="col-lg-6 col-12">
                                    <DoctorCard data={vet.info} vid={vet.id} />
                                </div>
                            )): null                        
                    }                    
                </div>
            </div>
         );
    }
}
 
export default VerifyVet;