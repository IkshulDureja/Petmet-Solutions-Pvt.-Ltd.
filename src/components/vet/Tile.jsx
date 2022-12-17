import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './vet.css';

const useStyles = makeStyles({
  root: {
    mixWidth: '100%',
  },
});

// this function will take arguments (date, time, status, clientinfo="Blank", description="blank") from the parent component

export default function Tile(props) {
  const classes = useStyles();
  
  
  return (
    <Card className={classes.root} className="tile_vet">
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.slt? props.slt.name:"lol"}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {props.slt? props.slt.Time.toString().split(' ').slice(1,4).join(' ') :null}<br />
            {props.slt? props.slt.Time.toString().split(' ')[4] :null}

          </Typography>
          
        </CardContent>
      <CardActions>
        <button className="pink-btn" >
          Client Information
        </button>  
      </CardActions>
    </Card>
  );
}
