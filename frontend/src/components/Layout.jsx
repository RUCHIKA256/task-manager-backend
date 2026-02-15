import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton
  } from "@mui/material";
  import { Link } from "react-router-dom";
  
  const drawerWidth = 200;
  
  function Layout({ children }) {
    return (
      <Box sx={{ display: "flex", background: "#f4f6f8", minHeight: "100vh" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": { width: drawerWidth }
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
  
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/tasks">
                <ListItemText primary="Tasks" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
  
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          {children}
        </Box>
      </Box>
    );
  }
  
  export default Layout;
  