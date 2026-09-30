// src/pages/ForgotPassword.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import type { AlertColor } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/Api";

type ToastState = { open: boolean; message: string; severity: AlertColor };

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

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

  const validate = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Enter a valid email.");
      return false;
    }
    setError("");
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // backend attend GET /forgot_password?email=...
      const res = await api(`/forgot_password?email=${encodeURIComponent(email)}`, { method: "GET" });
      openToast(res?.message || "✅ Email sent.", "success");
      setSent(true);
    } catch (err: any) {
      const msg = err?.data?.error || err?.message || "Failed to send email.";
      openToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh', // h-screen
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        py: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{  fontWeight: 700 }}>
          OpenGluco
        </Typography>
        <IconButton onClick={() => navigate("/login")}>
          <ArrowBack />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper
          component="form"
          onSubmit={onSubmit}
          noValidate
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 460,
            p: 4,
            borderRadius: 3,
            boxShadow: 8,
            display: "grid",
            gap: 2.5,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Forgot your password?
          </Typography>
          <Typography variant="body2">
            Enter your account email and we’ll send you a password reset link.
          </Typography>

          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error || " "}
            autoComplete="email"
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            sx={{ py: 1.25, borderRadius: 2, mt: 1 }}
          >
            {submitting ? (
              <>
                <CircularProgress size={22} sx={{ mr: 1 }} /> Sending…
              </>
            ) : sent ? "Resend email" : "Send reset link"}
          </Button>

          {sent && (
            <Typography variant="caption" >
              If an account exists for <b>{email}</b>, you’ll receive an email with a link to reset your password.
            </Typography>
          )}
        </Paper>
      </Box>

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

export default ForgotPassword;
