import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("userId");
    navigate("/");
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar >
          <Box display="flex" flexGrow={1}>
            <Button onClick={logoutUser} color="inherit" sx={{ textTransform: "none", mr: 3 }}>
              Log out
            </Button>
          </Box>
          <Button onClick={() => {navigate("/home")}} color="inherit" sx={{ textTransform: "none", mr: 3 }}>
            Users
          </Button>
          <Button onClick={() => {navigate("/home/birthdays")}} color="inherit" sx={{ textTransform: "none", mr: 3 }}>
            Birthdays
          </Button>
          
          <Button onClick={() => {navigate("/home/wishlist")}} color="inherit" sx={{ textTransform: "none", mr: 3 }}>
            My Wishlist
          </Button>
          <IconButton color="inherit">
            <MenuIcon></MenuIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
