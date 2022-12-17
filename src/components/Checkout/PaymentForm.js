import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ls from 'local-storage'

export default function PaymentForm() {

  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Update your Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Full name"
            fullWidth
            autoComplete="given-name"
            onBlur={e=>{ls.set('name', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mail"
            name="mail"
            label="E-mail"
            fullWidth
            autoComplete="email"
            onBlur={e=>{ls.set('mail', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            autoComplete="number"
            onBlur={e=>{ls.set('phone', e.target.value)}}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}