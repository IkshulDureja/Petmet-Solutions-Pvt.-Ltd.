import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tile from './Tile'
import {db, auth} from '../../firebase'


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Requests(props) {
  const classes = useStyles();
  
  const [state, setState]= useState({
    slots: []
  })
  

  useEffect(() => {
    db.collection('vet').doc('Wsqzi5DoefSSpKvTKELy').collection('requests').get()
    .then(docs=>{
      console.log(typeof(state.slots))
      var temp=[]
      docs.forEach(doc=>{      
        temp.push(doc.data())
      })
      setState({
        ...state,
        slots: temp
        
      })

    }).catch(err=> {
      console.error(err)
    })
  },[])

  
  // console.log(state.slots.length)
  return (
    <div>
        
        <h1>Requests</h1>
        {
          state.slots.map((slot)=>           
             <Tile slt={slot} />
          )
        }
                   
    </div>    
  );
}
