import React, { useState } from 'react';
import clsx from 'clsx';
import {AppBar,
  Drawer, CssBaseline, Toolbar, List, Typography, Divider,
  IconButton, Badge, Button, Grid, makeStyles, Tabs, Tab, Hidden
} from '@material-ui/core';
import { Menu, ChevronLeft, Notifications, Person, CloseSharp } from '@material-ui/icons';
import { NavLink, useLocation } from 'react-router-dom';
import GetDimensions from '../_helpers/GetDimensions';
import {userActions} from '../_actions/user.actions';
import {useDispatch} from 'react-redux';





const drawerWidth = 240;



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingLeft: 16,
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: "#019DF4",
    minHeight: 100,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("sm")]:{
      width: `calc(100% - 270px)`
    }
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    paddingTop: '14%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("sm")]:{
      position: 'absolute',
      width: 270
    }
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    paddingTop: '46%',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
    [theme.breakpoints.down("sm")]:{
      width: "0px !important"
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  appBarIcon: {
    backgroundColor: '#fff',
    color: '#323232',
    borderRadius: '50%',
  },
  content: {
    flexGrow: 1,
    height: 'auto',
    overflow: 'visible',
    width: 'auto',
    marginTop: "10%",
    [theme.breakpoints.down('sm')]:{
      overflowX: "hidden",
      marginTop: "20%"
    }
  },
  contenedor:{
    height: "100px",
    paddingRight: "75px",
    [theme.breakpoints.down("sm")]:{
      paddingRight: "0px"
    }

  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  button: {
    background: '#0FC42D',
    borderColor: '#222',
    border: 0,
    color: 'white',
    width: '260px',
    height: '40px',
    borderRadius: '20px',
    textTransform: 'capitalize',
    '&:hover': {
      background: "#323232",
      color: '#0FC42D',
      border: '1px solid #0FC42D'
    },
  },
  selectedButton: {
    background: '#323232',
    border: '1px solid #0FC42D',
    color: '#0FC42D',
    width: '260px',
    height: '40px',
    borderRadius: '20px',
    textTransform: 'capitalize'
  },
  link: {
    color: "white"
  },
  topNavOption: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  selectedOption: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderBottom: '8px solid #0FC42D',
    color: '#0FC42D',
    fontWeight: "bold"
  },
  selectedText: {
    color: '#0FC42D',
    fontWeight: "bold"
  },
  padding20Desk:{
    padding: "20px",
    [theme.breakpoints.down("sm")]:{
      padding: 0
    }
  },
  flexEndMob:{
    [theme.breakpoints.down("sm")]:{
      width: 200,
      justifyContent: "flex-end"
    }
  }
}));

export default function NavBarDashboard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const location = useLocation();
 
 const dimensions = GetDimensions();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
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
  const handleChange = (newValue) => {
    setSelected(newValue);
  };

  const logout = ()=>{
    dispatch(userActions.logout()); 
  }

  const renderTopNavBarLinks = () => {
    return (
      <React.Fragment>
        <Grid className={classes.padding20Desk} item style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <NavLink activeClassName={"selected"} exact to="/" style={{ color: '#FFF' }} onClick={() => handleChange(0)}>
            <Typography>Usuarios</Typography>
          </NavLink>
        </Grid>

        <Grid className={classes.padding20Desk} item style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <NavLink activeClassName={"selected"} exact to="/campeonatos" style={{ color: '#FFF' }} onClick={() => handleChange(1)}>
            <Typography>Campeonatos</Typography>
          </NavLink>
        </Grid>

        <Grid item className={classes.padding20Desk}>
          <Grid container>
            <Grid item>
              <NavLink activeClassName={"selected"} exact to="/">
                <IconButton>
                  <Person className={classes.appBarIcon} />
                </IconButton>
              </NavLink>
            </Grid>
            <Grid item>
              <IconButton>
                <Badge badgeContent={4} color="secondary">
                  <Notifications className={classes.appBarIcon} />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

      </React.Fragment>

    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Grid container direction="row" justify={dimensions >=768 ? 'space-between' : 'center'} alignItems="center" className={classes.contenedor}>
            <Grid item>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(open && classes.menuButtonHidden)}
              >
                <Menu />
              </IconButton>
            </Grid>
            <Grid item xs={3} lg={2}>
             
              {/* <img className="logo" src={logo} alt="modo agrario logo" />*/}

              
            </Grid>
            {/*  check windowDimensions */}
            
            {dimensions >= 768 ? renderTopNavBarLinks(): ''}
      
            
            <Hidden smDown>
              <Grid item>
                <IconButton onClick={logout}>
                  <CloseSharp className={classes.appBarIcon} />
                </IconButton>
              </Grid>
            </Hidden>
           <Hidden smUp>
             {!open ? <Grid item>
                <Grid container className={classes.flexEndMob}>
                  <Grid item>
                    <NavLink activeClassName={"selected"} exact to="/company-information">
                      <IconButton>
                        <Person className={classes.appBarIcon} />
                      </IconButton>
                    </NavLink>
                  </Grid>
                </Grid>
            </Grid> : ''}

           </Hidden>

           



          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        {/*<Divider />
        <List>{secondaryListItems}</List>*/}
      </Drawer>
     
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {props.children}
        </main>
      
      
    </div>
   
  );
    }