import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ls from 'local-storage'

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Update your Profile
      </Typography>
     
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="address"
            required
            onBlur={e=>{ls.set('address', e.target.value)}}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="city"
            onBlur={e=>{ls.set('city', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State" fullWidth
          onBlur={e=>{ls.set('state', e.target.value)}}
          />
          
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Pin code"
            fullWidth
            autoComplete="shipping postal-code"
            onBlur={e=>{ls.set('pin', e.target.value)}}
          />
        </Grid>
        
    </React.Fragment>
  );
}