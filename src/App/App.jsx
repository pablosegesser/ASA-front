import React, { Fragment, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { champsPage } from '../ChampsPage';
import MainContainer from '../_layout/MainContainer'
import { UsersPage } from '../UsersPage/UsersPage';

function App() {
    const loggingIn = useSelector(state => state.authentication); 
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
if(loggingIn !== undefined && loggingIn !== ''){
    console.log('listo');
}else{
    console.log('no')
}
    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear('lalalala'));
        });
    }, []);

    return (
        <div>
                   
                    <Router history={history}>
                   
                   
                    <MainContainer loggedIn={loggingIn.loggedIn}>
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <PrivateRoute exact path="/campeonatos" component={champsPage} />
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