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
import '../Home/home.css'
import logo from '../../assets/logo-paroquia.png'
import { Router, Link } from '@reach/router'
import InitialPage from '../Home-pages/InitialPage/InitialPage';
import Register from '../Home-pages/Register/Register'


const drawerWidth = 240;

function ResponsiveDrawer(props) {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const handleListItemClick = (event, index) => { //Função passada por referencia para navegar entre as telas
    setSelectedIndex(index);
  };

 

  
  const drawer = (
    <div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center' ,paddingTop:20}}>
        <img src={logo} height={100} width={100}></img>
      </div>
      <div>
        <nav aria-label="main mailbox folders">
          <List style={{ marginTop: 30 }}>
            <Link style={{ textDecoration: 'none' }} to='#home'>
              <ListItem disablePadding className='Kemer'>
                <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)} >
                  <ListItemIcon>
                    <HomeIcon style={{ color: '#fff' }}/>
                  </ListItemIcon>
                  <ListItemText className='text-button'   primary="Home" style={{ color: '#fff' }} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link style={{ textDecoration: 'none' }} to='#register'>
              <ListItem disablePadding className='Kemer'>
                <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)} >
                  <ListItemIcon>
                    <HomeIcon style={{ color: '#fff' }}/>
                  </ListItemIcon>
                  <ListItemText className='text-button'   primary="Cadastro de Catequizando" style={{ color: '#fff' }} />
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
    <Box sx={{ display: 'flex' }}>
      <div>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'rgb(26 17 31)' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer //DRAWER WEB
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'rgb(26 17 31)' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>



      <Box style={{ padding: 0 }}
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >

          
      <Router>
          <InitialPage default={selectedIndex==0} path="#home" navTo={handleListItemClick}/>
          <Register default={selectedIndex==1} path="#register" navTo={handleListItemClick}/>
      </Router>
         

        

      </Box>
    </Box>

  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
