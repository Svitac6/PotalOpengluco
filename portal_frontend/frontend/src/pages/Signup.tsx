import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
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
  LinearProgress,
  Paper,
} from "@mui/material";
import type { AlertColor } from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { hashPassword } from "../utils/hash";

type ToastState = {
  open: boolean;
  message: string;
  severity: AlertColor;
};

// --- helpers force de mot de passe (mêmes règles que password.tsx) ---
function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0..4
}
function strengthLabel(score: number) {
  switch (score) {
    case 0:
    case 1:
      return "Very weak";
    case 2:
      return "Weak";
    case 3:
      return "Good";
    case 4:
      return "Strong";
    default:
      return "";
  }
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  

  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirm: "",
    accept: false,
  });
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
    if (reason === "clickaway") return;
    setToast((t) => ({ ...t, open: false }));
  };

  const handleChange =
    (field: keyof typeof values) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = field === "accept" ? (e.target as any).checked : e.target.value;
        setValues((s) => ({ ...s, [field]: val }));
      };

  const validate = () => {
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.surname.trim()) next.surname = "Please enter your surname.";
    if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) next.email = "Enter a valid email.";

    // mêmes règles que la page reset password
    const pwd = values.password;
    const rules: Array<[boolean, string]> = [
      [pwd.length >= 8, "At least 8 characters."],
      [/[A-Z]/.test(pwd), "At least one uppercase letter."],
      [/[a-z]/.test(pwd), "At least one lowercase letter."],
      [/\d/.test(pwd), "At least one number."],
      [/[^A-Za-z0-9]/.test(pwd), "At least one special character."],
    ];
    const failed = rules.filter(([ok]) => !ok).map(([, m]) => m);
    if (failed.length) next.password = failed[0];

    if (values.confirm !== values.password) next.confirm = "Passwords do not match.";
    if (!values.accept) next.accept = "You must accept the terms.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      const first =
        next.name || next.surname || next.email || next.password || next.confirm || next.accept || "Invalid form.";
      openToast(first, "warning");
      return false;
    }
    return true;
  };

  const parseJSON = async (res: Response) => {
    const ct = res.headers.get("content-type") || "";
    if (res.status === 204 || !ct.includes("application/json")) return null;
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      const hashed = await hashPassword(values.password);
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: hashed,
        }),
      });

      const data = await parseJSON(res);
      if (!res.ok) throw new Error((data as any)?.error || `${res.status} ${res.statusText}`);

      openToast(`Account created for ${values.email}`, "success");
      navigate("/login", { state: { fromSignup: true } });
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Signup failed. Please try again.";
      openToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const score = passwordStrength(values.password);
  const pct = (score / 4) * 100;
  const label = strengthLabel(score);

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

      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4">
          OpenGluco
        </Typography>
        <IconButton
          onClick={() => {
            openToast("Back to home", "info");
            navigate("/");
          }}
        >
          <ArrowBack />
        </IconButton>
      </Box>

      {/* Form */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper
          component="form"
          onSubmit={onSubmit}
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
            Create your account
          </Typography>

          {/* name */}
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={values.name}
            onChange={handleChange("name")}
            autoComplete="name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />

          {/* surname */}
          <TextField
            id="surname"
            label="Surname"
            variant="outlined"
            value={values.surname}
            onChange={handleChange("surname")}
            autoComplete="family-name"
            fullWidth
            error={!!errors.surname}
            helperText={errors.surname}
          />

          {/* Email */}
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

          {/* Password */}
          <TextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={values.password}
            onChange={handleChange("password")}
            autoComplete="new-password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password ? errors.password : "Use at least 8 characters incl. upper/lower, number & special"}
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

          {/* Strength meter */}
          <Box>
            <LinearProgress
              variant="determinate"
              value={pct}
              sx={{
                height: 8,
                borderRadius: 1,
                "& .MuiLinearProgress-bar": { borderRadius: 1 },
              }}
            />
            <Typography variant="caption">
              Strength: {label}
            </Typography>
          </Box>

          {/* Confirm password */}
          <TextField
            id="confirm"
            label="Confirm password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={values.confirm}
            onChange={handleChange("confirm")}
            autoComplete="new-password"
            fullWidth
            error={!!errors.confirm}
            helperText={errors.confirm}
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

          {/* Accept terms */}
          <FormControlLabel
            control={
              <Checkbox
                checked={values.accept}
                onChange={handleChange("accept")}
              />
            }
            label={
              <Typography>
                I accept the Terms & Privacy Policy
              </Typography>
            }
          />
          {errors.accept && (
            <Typography variant="body2" sx={{ mt: -1 }}>
              {errors.accept}
            </Typography>
          )}

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            sx={{ mt: 1, py: 1.25, borderRadius: 2 }}
          >
            {submitting ? "Creating account..." : "Sign Up"}
          </Button>

          {/* Link to login */}
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
            }}
          >
            Already have an account?{' '}
            <Box
              component="a"
              href="/login"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline', // hover:underline
                },
              }}
            >
              Log in
            </Box>
          </Typography>

        </Paper>
      </Box>

      {/* Toasts */}
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

export default Signup;
