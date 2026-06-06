// components/Sidebar/Sidebar.jsx
import * as React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authenticationSlice/authenticationSlice";




export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector(
    (state) => state.authentication.authentication
  );
  const isLoggedIn = Boolean(token);

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250 }}>
        {/* Close Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <List>
          {/* Always visible */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNav("/")}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          {/* Author only */}
          {isLoggedIn && user?.role === "author" && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNav("/me/author")}>
                  <ListItemIcon><DashboardIcon /></ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNav("/me/author/create-blog")}>
                  <ListItemIcon><CreateIcon /></ListItemIcon>
                  <ListItemText primary="Create Blog" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {/* Not logged in */}
          {!isLoggedIn && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNav("/register")}>
                  <ListItemIcon><AppRegistrationIcon /></ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNav("/login")}>
                  <ListItemIcon><LoginIcon /></ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {/* Logged in */}
          {isLoggedIn && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNav("/me")}>
                  <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>

              <Divider />

              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
}