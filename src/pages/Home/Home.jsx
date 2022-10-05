import * as React from 'react';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';

import People from '@mui/icons-material/People';
import Groupe from '@mui/icons-material/GroupWork';
import PeopleCat from '@mui/icons-material/PeopleTwoTone';
import '../Home/home.css'
import logo from '../../assets/logo-paroquia.png'
import { Router, Link } from '@reach/router'

import Register from "../Catechizing/Register/Register";
import RegisterClasses from "../Classes/RegisterClasses";
import Classes from "../Classes";
import Users from "../Users";
import RegisterUsers from "../Users/registerUsers";
import Catechizing from "../Catechizing";
import Dashboard from "../Dashboard";
import { Group } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



const drawerWidth = 240;

function ResponsiveDrawer(props) {


  const [selectedIndex, setSelectedIndex] = useState(0);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigation = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const handleListItemClick = (event, index) => { //Função passada por referencia para navegar entre as telas
    setSelectedIndex(index);
  };

  React.useEffect(()=>{

    const loged = JSON.parse(localStorage.getItem('loged')) ||null
    console.log(loged)
    if(!loged?.loged) navigation("Login")
  },[])
 

  
  const drawer = (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <img src={logo} height={100} width={100}></img>
      </div>
      <div>
        <nav aria-label="main mailbox folders">
          <List style={{ marginTop: 30 }}>
            <Link style={{ textDecoration: "none" }} to="#home">
              <ListItem disablePadding className="Kemer">
                <ListItemButton
                  selected={selectedIndex === 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                >
                  <ListItemIcon>
                    <HomeIcon style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    className="text-button"
                    primary="Home"
                    style={{ color: "#fff" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link style={{ textDecoration: "none" }} to="#users">
              <ListItem disablePadding className="Kemer">
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                >
                  <ListItemIcon>
                    <People style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    className="text-button"
                    primary="Usuários"
                    style={{ color: "#fff" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link style={{ textDecoration: "none" }} to="#catechizing">
              <ListItem disablePadding className="Kemer">
                <ListItemButton
                  selected={selectedIndex === 3}
                  onClick={(event) => handleListItemClick(event, 3)}
                >
                  <ListItemIcon>
                    <PeopleCat style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    className="text-button"
                    primary="Catequizandos"
                    style={{ color: "#fff" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link style={{ textDecoration: "none" }} to="#classes">
              <ListItem disablePadding className="Kemer">
                <ListItemButton
                  selected={selectedIndex === 5}
                  onClick={(event) => handleListItemClick(event, 5)}
                >
                  <ListItemIcon>
                    <Groups style={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    className="text-button"
                    primary="Turmas"
                    style={{ color: "#fff" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </nav>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <Box sx={{ display: "flex" }}>
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </div>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer //DRAWER MOBILE
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "rgb(26 17 31)",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer //DRAWER WEB
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1a2845;",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        style={{ padding: 0 }}
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Router>
          <Dashboard
            default={selectedIndex === 0}
            path="#home"
            navTo={handleListItemClick}
          />
          <Users
            default={selectedIndex === 1}
            path="#users"
            navTo={handleListItemClick}
          />
          <RegisterUsers
            default={selectedIndex === 2}
            path="#registerUsers"
            navTo={handleListItemClick}
          />
          <Catechizing
            default={selectedIndex === 3}
            path="#catechizing"
            navTo={handleListItemClick}
          />
          <Register
            default={selectedIndex === 4}
            path="#register"
            navTo={handleListItemClick}
          />
          <Classes
            default={selectedIndex === 5}
            path="#classes"
            navTo={handleListItemClick}
          />
          <RegisterClasses
            default={selectedIndex === 6}
            path="#registerClasses"
            navTo={handleListItemClick}
          />
        </Router>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};


export default ResponsiveDrawer;
