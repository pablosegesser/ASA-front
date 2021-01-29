import React from 'react'
import NavBarLogin from './NavBarLogin';
import NavBarDashboard from './NavBarDashboard';
import {useSelector} from 'react-redux';


const MainContainer = ({loggedIn, children})=> { 
  if (!loggedIn) {
    return (
    <React.Fragment>
      <NavBarLogin />
      {children}
    </React.Fragment>
    );
  }
    return (<NavBarDashboard>
             {children}
      </NavBarDashboard>);
  
   
  
}

export default MainContainer;