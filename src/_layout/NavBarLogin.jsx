import './layout.css';
//import logo from '../../assets/LOGO_Modo_Agrario.svg';
//import logoMob from '../../assets/ISOLOGO_MODO_AGRARIO.svg';
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Grid } from '@material-ui/core';
import { CloseSharp } from '@material-ui/icons';
import GetDimensions from '../_helpers/GetDimensions';
import logo from '../assets/logoTrans.png';


const useStyles = makeStyles((theme) => ({
  logo:{
    maxXidth: "100%",
    minHeight: "10px",
    maxHeight: "100px",
    padding: "10px"
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    backgroundColor:"#019DF4",
    minHeight: 100,
    marginBottom: "3%"
  },
  title: {
    flexGrow: 1,
  },
  marginMob:{
    [theme.breakpoints.down("md")]:{
      margin: "20px"
    }
    
  },
  right:{
    float: "right"
  },
  appBarIcon: {
    backgroundColor: '#0FC42D',
    color: '#323232',
    borderRadius: '50%',
  },
}));

export default function NavBarLogin(props) {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
 const dimensions = GetDimensions();



  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeSession = (e) => {
    //redirect
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('factoriesFatherId');
    localStorage.removeItem('userId');
    window.location = '/';
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.marginMob}>
         <Grid item xs ={6}>
         <img className={classes.logo} src={logo} alt="ASA surf" />
         </Grid>
         <Grid item xs={6}>
       
        
          <div className={classes.right}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <HomeIcon  />
            </IconButton>
          </div>
        
         </Grid>
     
        </Toolbar>
      </AppBar>
    </div>
  );
}
