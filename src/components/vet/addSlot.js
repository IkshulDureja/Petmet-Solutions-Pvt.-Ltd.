import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';
import AddSlotTile from './addSlot_tile'
import {db} from '../../firebase'
import './vet.css';

import DateFnsUtils from '@date-io/date-fns';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

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

export default function AddSlot(props) {
  const classes = useStyles();
  
  const [state, setState]= useState({
    slots: []
  })
  const [newSlot, setNewSlot]= useState(new Date())
  const [sentSlot, setSentSlot]= useState(null)

  useEffect(() => {
    // doc id-> uid of user
    db.collection('vet').doc('Wsqzi5DoefSSpKvTKELy').collection('freeSlots').get()
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
  },[sentSlot])

  const addSlot=(e)=>{
    setNewSlot(e.target.value)
  }
  const sendSlot=()=>{
   
    db.collection('vet').doc('Wsqzi5DoefSSpKvTKELy').collection('freeSlots').add({
      Type: "any",
      Time: newSlot      
    }).then(()=> {
      alert("added new slot")
      setSentSlot(newSlot)
    })
    
  }

  
  console.log(state.slots)
  return (
    <div>
      
        <form className={classes.container} noValidate>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        
        <DateTimePicker value={newSlot} onChange={setNewSlot} />
        </MuiPickersUtilsProvider>

            <button className="pink-btn" onClick={sendSlot} type="button" >
              Confirm
            </button>
        </form>
        <h1 className="addSlot_h1">Current Slots</h1>
        {
          state.slots.map((slot)=>           
             <AddSlotTile slt={slot} />
          )
        }
                   
    </div>    
  );
}
