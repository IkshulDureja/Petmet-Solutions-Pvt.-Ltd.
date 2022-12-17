import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {db, auth} from '../../firebase';
import Doctor from '../pictures/doc.jpg';
import dog from '../pictures/dog.png'
const useStyles = makeStyles((theme) => ({
    vet:{
        position: 'absolute',
    width: '141px',
    height: '23px',
    left: '130px',
    top: '238px',
    fontfamily:'Roboto',
    fontstyle: 'normal',
    fontweight: '500',
    fontsize: '20px',
    lineheight: '23px',
    color: '#000000',
},

image:{position: 'absolute',
    width: '94px',
    height: '94px',
    left: '19px',
    top: '238px',
    
    background: 'url(Rectangle60.png)', 
    background:'#C4C4C4',
    borderradius: '3px',},

    address:{
        position: 'absolute',
        width: '206px',
        height: '15px',
        left: '130px',
        top: '288px',
        
        fontfamily: 'Roboto',
        fontstyle: 'normal',
        fontweight: '500',
        fontsize: '13px',
        lineheight: '15px',
        
        color: '#B5B5B5',
        },

        open:{position: 'absolute',
            width: '31px',
            height: '15px',
            left:'130px',
            top: '310px',
            
            fontfamily: 'Roboto',
            fontstyle: 'normal',
            fontweight: '500',
            fontsize: '13px',
            lineheight: '15px',
            
            color: '#B5B5B5',
            },

            dist:{
                position: 'absolute',
                width: '34px',
                height: '14px',
                left: '354px',
                top: '314px',
                
                fontfamily: 'Roboto',
                fontstyle: 'normal',
                fontweight: 'normal',
                fontsize: '12px',
                lineheight: '4px',
                /* identical to box height */
                
                
                color: '#000000',
                },

  }));
  
  export default function   VetCard() {
    const classes = useStyles();
    const [state, setState]= useState({})

        console.log(state)
    return (
      <div className="container ">
        <div className="row ">
          <div className="image">
            <strong className="head">Name of Vet</strong>
            <img src={dog} className="profile_img" />
          </div>
          <div className="hi">
            <div className="vet">
              <strong className="col">Someone</strong>
            </div>
            <div className="address">
              <p className="col">#23 Model Town</p>
            </div>
            <div className="open">
              <p className="col"> Open Closes9 PM</p>
            </div>
            
            <div className="dist">
              <p className="col">36KM</p>
            </div>
            </div>
      
        </div>
        <hr/>
      </div>
      
    );
  }
  
  



