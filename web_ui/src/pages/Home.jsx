import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
  CssBaseline,
} from "@mui/material";
import SideBar from "../components/SideBar";
import Stage from "../components/Stage";

const drawerWidth = 300;

export default function Home() {
  return (
    <Box sx={{display: "flex"}}>
      <CssBaseline />
      {/* Top Navigation Bar */}
      <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Index */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={true}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {width: drawerWidth, boxSizing: "border-box"},
        }}
      >
        <Toolbar />
        <SideBar />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin 0.3s",
        }}
      >
        <Toolbar />
        <Stage />
      </Box>
    </Box>
  );
}
