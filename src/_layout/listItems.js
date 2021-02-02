import React,{useState} from 'react';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { AssignmentInd, Business, Spa, Description, ListAlt, Build, ExpandLess, ExpandMore, Notifications, SupervisorAccount, Favorite, Star} from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import GroupIcon from '@material-ui/icons/Group';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const MainListItems = ({isOpen, windowsDimension, drawerClose, role}) => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleSelected = (value) => {
    setSelected(value);
  }; 
  const listItems = () =>{
   return(
      <div>
      <NavLink onClick={() => handleSelected(1)} style={{color: "#4A4A4A"}} exact to="/campeonatos" activeClassName={"selected-left"}>
        <ListItem button>
          <ListItemIcon>
            <BeachAccessIcon />
          </ListItemIcon>
          <ListItemText primary="Campeonatos" />
        </ListItem>
      </NavLink>
      <NavLink onClick={() => handleSelected(2)} style={{color: "#4A4A4A"}} exact to="/usuarios" activeClassName={"selected-left"}>
        <ListItem button>
          <ListItemIcon>
            <GroupIcon/>
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>
      </NavLink>
      <NavLink onClick={() => handleSelected(3)} style={{color: "#4A4A4A"}} exact to="/" activeClassName={"selected-left"}>
        <ListItem button>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
          <ListItemText primary="Perfil de Usuario" />
        </ListItem>
      </NavLink>
        </div>
    )
  }
 
  return( 
    listItems()
  )
    
   
  
}

export default MainListItems;
