import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import ListSubheader from '@material-ui/core/ListSubheader';
//import DashboardIcon from '@material-ui/icons/Dashboard';
import {Link} from 'react-router-dom'

//import PeopleIcon from '@material-ui/icons/People';
//import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddAlarmIcon from '@material-ui/icons/AddAlarm'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
//import NotificationsIcon from '@material-ui/icons/Notifications';

export const mainListItems = (
  <div>
    <Link to={'/v/Profile/'}>
    <ListItem button>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    </Link>

    <Link to={'/v/AddSlot/'}>
       <ListItem button>
      <ListItemIcon>
        <AddAlarmIcon />
      </ListItemIcon>
      <ListItemText primary="Add Slot" />
    </ListItem>
    </Link>

    <Link to={'/v/Appointments/'}>
    <ListItem button>
      <ListItemIcon>
        <AccessAlarmIcon />
      </ListItemIcon>
      <ListItemText primary="Appointments" />
    </ListItem>
    </Link>

  </div>
);

