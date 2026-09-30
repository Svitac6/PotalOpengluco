import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { hashPassword } from "../utils/hash";

import {
  Box,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import type { AlertColor } from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { useAuth } from "../contexts/useAuth";

type ToastState = {
  open: boolean;
  message: string;
  severity: AlertColor; // 'error' | 'warning' | 'info' | 'success'
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [values, setValues] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    severity: "info",
  });

  const openToast = (message: string, severity: AlertColor = "info") =>
    setToast({ open: true, message, severity });

  const closeToast = (_?: unknown, reason?: string) => {
    if (reason === "clickaway") return; // éviter fermeture à clic extérieur
    setToast((t) => ({ ...t, open: false }));
  };

  React.useEffect(() => {
    if ((location.state as any)?.fromSignup) {
      openToast("Your account has been created. Please check your email to verify your account.", "info");
    }
  }, [location.state]);


  const handleChange =
    (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = field === "remember" ? (e.target as any).checked : e.target.value;
      setValues((s) => ({ ...s, [field]: val }));
    };

  const validate = () => {
    const next: typeof errors = {};
    if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) next.email = "Enter a valid email.";
    if (!values.password) next.password = "Password is required.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // afficher le premier message d’erreur en toast
      const first = next.email || next.password || "Invalid form.";
      openToast(first, "warning");
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      const hashed = await hashPassword(values.password);

      await login(values.email, hashed, values.remember);
      openToast("Successfully signed in. Redirecting…", "success");
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (err: any) {
      const msg = err?.message || "Login failed. Please try again.";
      openToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        py: 2,
      }}
    >

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          OpenGluco
        </Typography>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBack />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            borderRadius: 3,
            boxShadow: 8,
            display: "grid",
            gap: 2.5,
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
            Log in to your account
          </Typography>

          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            value={values.email}
            onChange={handleChange("email")}
            autoComplete="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={values.password}
            onChange={handleChange("password")}
            autoComplete="current-password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password ? errors.password : "Enter your password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.remember}
                  onChange={handleChange("remember")}
                />
              }
              label={<Typography>Remember me</Typography>}
            />
            <Button
              type="button"
              variant="text"
              onClick={() => {
                openToast("Password reset flow coming right up…", "info");
                navigate("/forgot-password");
              }}
              sx={{ textTransform: "none" }}
            >
              Forgot password?
            </Button>
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            sx={{ mt: 1, py: 1.25, borderRadius: 2 }}
          >
            {submitting ? "Signing in..." : "Log In"}
          </Button>

          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
            }}
          >
            Don&apos;t have an account ?{' '}
            <Box
              component="a"
              href="/signup"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Create one
            </Box>
          </Typography>

        </Paper>
      </Box>

      {/* Toast global */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={closeToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeToast} severity={toast.severity} variant="filled" sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
