import React, { Fragment, useEffect, useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ChampsPage } from '../ChampsPage/ChampsPage';
import MainContainer from '../_layout/MainContainer'
import { UsersPage } from '../UsersPage/UsersPage';
import {Dialog, DialogActions, DialogContent, DialogTitle, Divider} from "@material-ui/core";



function App() {
    const loggingIn = useSelector(state => state.authentication); 
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
if(loggingIn !== undefined && loggingIn !== ''){
    console.log('listo');
}else{
    console.log('no')
}
const [open, setopen] = useState(true);
const close = ()=>{
    setopen(!open);
    setTimeout(() => {
        dispatch(alertActions.clear());
        setopen(true)
    }, 300)
}
    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
          dispatch(alertActions.clear());
        });
        
    }, []);
{/*
      setTimeout(() => {
        dispatch(alertActions.clear());
    }, 8000)*/}
    return (
        <div>
                   
            <Router history={history}>
                   
           
                        <MainContainer loggedIn={loggingIn.loggedIn}>
                        {alert.message && 
                        <Dialog open={open} onClose={()=>close()}>
                            <DialogContent>
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                            </DialogContent>
                        </Dialog>}
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <PrivateRoute exact path="/campeonatos" component={ChampsPage} />
                            <PrivateRoute exact path="/usuarios" component={UsersPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </MainContainer>
                    
                   
            </Router>
     </div>
       
    );
}

export { App };