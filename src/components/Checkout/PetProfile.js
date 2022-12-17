import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from  '@material-ui/core/Button';
import ls from 'local-storage'

export default function PetProfile() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Complete the profile of your pets
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Name"
            fullWidth
            autoComplete="pet-name"
            onBlur={e=>{ls.set('petName', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="animal"
            name="animal"
            label="Animal"
            fullWidth
            autoComplete="animal"
            onBlur={e=>{ls.set('animal', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="breed"
            name="breed"
            label="Breed"
            fullWidth
            autoComplete="breed"
            onBlur={e=>{ls.set('breed', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="age"
            name="age"
            label="Age"
            fullWidth
            autoComplete="age"
            onBlur={e=>{ls.set('age', e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="Gender" fullWidth
          onBlur={e=>{ls.set('gender', e.target.value)}}
         />
        </Grid>
                 
      </Grid>
    </React.Fragment>
  );
}