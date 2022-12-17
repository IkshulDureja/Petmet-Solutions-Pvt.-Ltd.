import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
  r: {
    textAlign: "right",
    marginLeft: "auto",
  },
});

export default function ContinuousSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <p style={{ marginTop: "19.55px" }}>₹0.00</p>
        <p style={{ marginTop: "19.55px" }} className={classes.r}>
          ₹1100.0
        </p>

        <Slider
          style={{ color: "black" }}
          value={value}
          onChange={handleChange}
          aria-labelledby="continuous-slider"
        />
      </Grid>
    </div>
  );
}
