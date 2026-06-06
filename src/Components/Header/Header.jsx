import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, useNavigate } from "react-router";
import {useDispatch, useSelector} from "react-redux"
import { logout } from "../../features/authenticationSlice/authenticationSlice";
import Sidebar from "../Sidebar";


export default function Header() {
  const [sideBarOpen, setSideBarOpen]= React.useState(false)
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token, user} = useSelector(state => state.authentication.authentication )
  const isLoggedIn = Boolean(token)
 
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {

    setAnchorEl(null);
    navigate('/me')
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{
              setSideBarOpen(true)
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography> */}

          <Link to={"/"}>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: "white", mx: "1rem" }}
            >
              Home
            </Typography>
          </Link>
 
{


 !isLoggedIn && <>
          <Link to={"/register"}>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: "white", mx: "1rem" }}
            >
              Register
            </Typography>
          </Link>

          <Link to={"/login"}>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: "white", mx: "1rem" }}
              >
              Login
            </Typography>
          </Link>
              </>

            }
         
        
       
        </Toolbar>
      </AppBar>


      <Sidebar open={sideBarOpen} onClose={()=> setSideBarOpen(false)} />
    </Box>
  );
}
