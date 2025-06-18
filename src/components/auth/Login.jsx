import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

// Placeholder logo component
function Logo() {
  return (
    <Box mb={2} display="flex" justifyContent="center">
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "12px",
          background: "#222",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          color: "#fff",
        }}
      >
        {/* Replace with your actual logo */}
        <span>csdsd</span>
      </Box>
    </Box>
  );
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#fafbfc"
    >
      <Paper elevation={3} sx={{ p: 4, minWidth: 350, maxWidth: 400 }}>
        <Logo />
        <Typography variant="h5" align="center" fontWeight={600} mb={1}>
          Sign ind 
        </Typography>
        <Box component="form" mt={3}>
          <Stack spacing={2}>
            <TextField
              label="Email address"
              type="email"
              fullWidth
              variant="outlined"
              autoComplete="email"
              InputProps={{ sx: { borderRadius: 2 } }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              autoComplete="current-password"
              InputProps={{
                sx: { borderRadius: 2 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ borderRadius: 2, mt: 1, fontWeight: 600 }}
            >
              Sign in
            </Button>
          </Stack>
          <Box mt={2} textAlign="center">
            <MuiLink
              component={Link}
              to="/forgot-password"
              underline="hover"
              color="text.secondary"
              fontSize={14}
            >
              Forgot your password?
            </MuiLink>
          </Box>
          <Box mt={4} textAlign="center">
            <Typography color="text.secondary" fontSize={15}>
              Don&apos;t have a flashStudy account?
            </Typography>
            <Button
              component={Link}
              to="/signup"
              variant="outlined"
              fullWidth
              sx={{ borderRadius: 2, mt: 1, fontWeight: 600 }}
            >
              Create new account
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}