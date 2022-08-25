import {
  Typography,
  TextField,
  Button,
  Container,
  CssBaseline,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [error, setError] = useState(null);

  const usernameChangeHandler = (event) => {
    setUser(event.target.value);
  };

  const handleSubmit = async () => {
    const url = "http://localhost:5000/users/name/" + user;
    console.log(url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      localStorage.setItem("userId", data);
    } catch (error) {
      setError(error.message);
    }
    if (!error) {
      navigate("/home", { replace: true });
    }
  };
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            sx={{ mt: 1 }}
          >
            <TextField onChange={usernameChangeHandler}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
