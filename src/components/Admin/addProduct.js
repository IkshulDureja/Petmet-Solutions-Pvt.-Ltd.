import React, { Component } from 'react';
import {Form,Button} from 'react-bootstrap';
import './Admin.css';
import {db, storage} from '../../firebase'
import { arrayIncludes } from '@material-ui/pickers/_helpers/utils';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: null,
            description: null,
            guaranteedAnalysis: null,
            cost: null,
            mrp: null,
            size: null,
            quantity: null,
            category: null, 
            ingredients: null,
            addInfo: null,
            url: null,
            urlList: null,
            brandList: null,
            categoryList: null,
            brand: null
         }
    }

    componentDidMount(){
        db.collection('homepage').doc('filter').get().then(doc=>{
            if(doc.exists){
                this.setState({brandList: doc.data().brand})
            }
        })
        db.collection('items').get().then(docs=>{
            var temp= []
            docs.forEach(doc=>{
                temp.push(doc.id)
            })
            this.setState({categoryList: temp})            
        })
    }
    sendImg=(e)=>{
        var file= e.target.files[0]
        var storageRef= storage.ref('itemImages/'+file.name)
        storageRef.put(file).then(()=> {
        alert("image uploaded")
        storageRef.getDownloadURL()
            .then(url=> this.setState({url: url}))
            .catch(err=> console.log(err))
        })
        .catch(err=> console.log(err))
    }

    sendImgArr=(e)=>{
      var files= e.target.files
        console.log(files)
        alert(typeof(files))
        var temp= []
        Array.prototype.forEach.call(files, (file,ind)=>{
            var storageRef= storage.ref('itemImages/'+file.name)
        storageRef.put(file).then(()=> {

        storageRef.getDownloadURL()
            .then(url=> temp.push(url))
            .catch(err=> console.log(err))
        })
        .catch(err=> console.log(err))
        })
        this.setState({urlList:temp})
    }

    
        submit=()=>{
        // console.log(this.state)
        var {category, name, size, cost, mrp, quantity, guaranteedAnalysis, url}= this.state
        if(category && name && size && cost && mrp && quantity && guaranteedAnalysis && url)
        {
            var ref =db.collection('items').doc(category)
            ref.get().then(doc=>{
                if(!doc.exists){
                    ref.set({
                        type: category,
                        img: url
                    }).then(()=>{
                        ref.collection('products').add({
                            details: this.state,
                            filterInfo: {
                                brand: this.state.brand,
                                cost: this.state.cost
                            }
                        }).then((doc)=>{
                            db.collection('All_Products').doc(doc.id).set({
                                details: this.state,
                                filterInfo: {
                                    brand: this.state.brand,
                                    cost: this.state.cost
                                }
                            }).then(()=>{window.location.reload()})
                        })
                    })
                }else{
                    ref.collection('products').add({
                        details: this.state,
                        filterInfo: {
                            brand: this.state.brand,
                            cost: this.state.cost
                        }
                    }).then((doc)=>{
                        db.collection('All_Products').doc(doc.id).set({
                            details: this.state,
                            filterInfo: {
                                brand: this.state.brand,
                                cost: this.state.cost
                            }
                        }).then(()=>{window.location.reload()})
                    })
                }
            })
            
            
            
            // alert("Done.... Refresh the page to add new product")
        }
        else{
            alert("category, name, size, cost,mrp, quantity, imageField .... required")
        }

        
        
    }
    render() { 
        return ( 
            <>
                <h1 className="main-head">ADD A  NEW PRODUCT</h1>
                <div className="container addProduct">
                    <Form className="addProduct_form">
                        <div className="row mb-3">
                            <Form.Label className="col-3">Image of Product</Form.Label>
                            <input className="col-7 col-sm-8 offset-sm-0 offset-1" type="file" onChange={this.sendImg} />
                        </div>
                        <div className="row mb-3">
                            <Form.Label className="col-3">Extra Images</Form.Label>
                            <input className="col-7 col-sm-8 offset-sm-0 offset-1"  type="file" multiple onChange={this.sendImgArr} />
                        </div>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Name</Form.Label>
                            <Form.Control className="col-7 col-sm-8 offset-sm-0 offset-1" as="input" onBlur={(e)=>{this.setState({name: e.target.value})}}></Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Description</Form.Label>
                            <Form.Control className="col-7 col-sm-8 offset-sm-0 offset-1" as="textarea" rows="3" onBlur={(e)=>{this.setState({description: e.target.value })}} />
                        </Form.Group>
                        
                        <Form.Group className="row">
                            <Form.Label className="col-3">guaranteedAnalysis</Form.Label>
                            <Form.Control className="col-7 col-sm-8 offset-sm-0 offset-1" as="textarea" rows="3" onBlur={(e)=>{this.setState({guaranteedAnalysis: e.target.value })}} />
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Cost</Form.Label>
                            <Form.Control className="col-7 col-sm-8 offset-sm-0 offset-1" as="input" onBlur={(e)=>{this.setState({cost: e.target.value})}}></Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">mrp</Form.Label>
                            <Form.Control className="col-7 col-sm-8 offset-sm-0 offset-1" as="input" onBlur={(e)=>{this.setState({mrp: e.target.value})}}></Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Category</Form.Label>
                            <Form.Control className="col-7 col-sm-8 offset-sm-0 offset-1" as="select" onChange={(e)=>{this.setState({category: e.target.value })}}>
                                <option defaultChecked>--Add Category--</option>
                                {
                                    this.state.categoryList? this.state.categoryList.map(cat=><option>{cat}</option>): null
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="row">
                            <Form.Label className="col-3">Brand</Form.Label>
                            
                            <Form.Control className="col-7 col-sm-8 offset-sm-0 offset-1" as="select" onChange={(e)=>{this.setState({brand: e.target.value })}}>
                                <option defaultChecked>--Select Brand--</option>
                                {
                                    this.state.brandList? this.state.brandList.map(brand=><option>{brand}</option>): null
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="row">
                            <Form.Label className="col-3">Size</Form.Label>
                            <Form.Control id="size" className="col-7 col-sm-8 offset-sm-0 offset-1" as="textarea" rows="3" onBlur={(e)=>{this.setState({size: e.target.value.split(' ') })}} />
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Quantity</Form.Label>
                            <Form.Control className="col-7 col-sm-8 offset-sm-0 offset-1" as="input" onBlur={(e)=>{this.setState({quantity: e.target.value })}}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Ingredients</Form.Label>
                            <Form.Control className="col-7 col-sm-8 offset-sm-0 offset-1" as="textarea" rows="3" onBlur={(e)=>{this.setState({ingredients: e.target.value })}} />
                        </Form.Group>
                        <Form.Group className="row">
                            <Form.Label className="col-3">Additional Information</Form.Label>
                            <Form.Control className="col-7 col-sm-8 offset-sm-0 offset-1" as="textarea" rows="3" onBlur={(e)=>{this.setState({addInfo: e.target.value})}} />
                        </Form.Group>
                        <button type="button" onClick={this.submit} className="offset-4 offset-sm-3 pink_btn pink_btn_form">
                            Add Product
                        </button>
                    </Form>
                </div>
            </>
         );
    }
}
 
export default AddProduct;