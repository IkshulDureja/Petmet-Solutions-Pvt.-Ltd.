import React from 'react';
import './Admin.css';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Container from "@material-ui/core/Container";
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {RiCheckboxCircleLine} from 'react-icons/ri';
import {FaStethoscope,FaPlusCircle,FaClock} from 'react-icons/fa';
import {MdLocalGroceryStore} from 'react-icons/md';
import AddProduct from './addProduct';
import VerifyVet from './verify';
import RecentProducts from './recentProducts';
import {useParams, Link} from 'react-router-dom'
import MainLogo from "../pictures/Logo WT Tagline PET MET.png";
import Footer from '../FooterNew';
import Orders_List from './Orders';
import Appointments from './Appointments';
import {Button} from 'react-bootstrap';
import {ImCross} from 'react-icons/im';
import OutOfStock from './OutofStock';
import AddCategory from './AddCategory';
import PastAppointments from './PastAppointments';
import {db, auth} from '../../firebase'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    paddingTop: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [sideBar, setSideBar] = React.useState("vet");
  const {component}= useParams()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List style={{width: "235px"}}>
        {
          sideBar=="e-commerce"?(
            <div>
              <Link to={"/admin/addProduct"}>
              <ListItem button>
                <ListItemIcon>
                  <FaPlusCircle className="menu_icons"/>
                </ListItemIcon>
                <ListItemText primary="Add Product" />
              </ListItem>
            </Link>
            <Link to={"/admin/addcategory"}>
              <ListItem button>
                <ListItemIcon>
                  <FaPlusCircle className="menu_icons"/>
                </ListItemIcon>
                <ListItemText primary="Add Category" />
              </ListItem>
            </Link>
            <Link to={"/admin/recentProducts"}>
            <ListItem button>
              <ListItemIcon>
                <MdLocalGroceryStore className="menu_icons"/>
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
          </Link>
          <Link to={"/admin/outofstock"}>
            <ListItem button>
              <ListItemIcon>
                <ImCross className="menu_icons"/>
              </ListItemIcon>
              <ListItemText primary="Out of Stock" />
            </ListItem>
          </Link>
          <Link to={"/admin/orders"}>
            <ListItem button>
              <ListItemIcon>
                <RiCheckboxCircleLine className="menu_icons"/>
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            </Link>
          </div>
          ):
          (
            <div>
              <Link to={"/admin/verifyVet"}>
              <ListItem button>
                <ListItemIcon>
                  <FaStethoscope className="menu_icons" />
                </ListItemIcon>
                <ListItemText primary="Verify Vets" />
              </ListItem>
            </Link>
            <Link to={"/admin/appointments"}>
              <ListItem button>
                <ListItemIcon>
                  <FaClock className="menu_icons"/>
                </ListItemIcon>
                <ListItemText primary="Pending Appointments" />
              </ListItem>
            </Link>
            <Link to={"/admin/pastappointments"}>
              <ListItem button>
                <ListItemIcon>
                  <FaClock className="menu_icons"/>
                </ListItemIcon>
                <ListItemText primary="Past Appointments" />
              </ListItem>
            </Link>
          </div>
          )
        }
            
            <Divider />
            {sideBar=="e-commerce"?<Link to="/admin/verifyVet"><Button className="btn btn-block mt-2" onClick={()=>{setSideBar("vet")}}>VET</Button></Link>:<Link to="/admin/orders"><Button className="btn btn-block mt-2" onClick={()=>{setSideBar("e-commerce")}}>E-COMMERCE</Button></Link>} 
        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={{background: "#F1F1F1"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{color: "white"}} noWrap>
            <img className="mainlogoonnav"
              style={{ width: "130px", height: "33px" }}
              src={MainLogo}></img>
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="container">
          {component=='verifyVet'? <VerifyVet />: component=='addProduct'? <AddProduct />:component=='recentProducts'? <RecentProducts />:component=='orders'?<Orders_List/>:component=='appointments'?<Appointments/>:component=='outofstock'?<OutOfStock/>:component=='addcategory'?<AddCategory/>:component=='pastappointments'?<PastAppointments/>: null}
        </div>
        <Footer />    
      </main>
      
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
