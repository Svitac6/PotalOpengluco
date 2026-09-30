// src/pages/password.tsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  LinearProgress,
  Paper,
} from "@mui/material";
import type { AlertColor } from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../utils/Api";
import { hashPassword } from "../utils/hash";

type ToastState = { open: boolean; message: string; severity: AlertColor };

function passwordStrength(pw: string) {
  // Score simple 0..4
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
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

const Password: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const token = useMemo(() => new URLSearchParams(search).get("token") || "", [search]);

  const [values, setValues] = useState({ password: "", confirm: "" });
  const [show, setShow] = useState({ p1: false, p2: false });
  const [errors, setErrors] = useState<{ password?: string; confirm?: string; token?: string }>({});
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

  React.useEffect(() => {
    if (!token) {
      setErrors((e) => ({ ...e, token: "Missing or invalid link." }));
      openToast("Missing token in the link.", "error");
    }
  }, [token]);

  const handleChange =
    (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValues((s) => ({ ...s, [field]: val }));
    };

  const validate = () => {
    const next: typeof errors = {};
    const { password, confirm } = values;

    // Règles minimales (adaptables pour correspondre à ta politique)
    const rules: Array<[boolean, string]> = [
      [password.length >= 8, "At least 8 characters."],
      [/[A-Z]/.test(password), "At least one uppercase letter."],
      [/[a-z]/.test(password), "At least one lowercase letter."],
      [/\d/.test(password), "At least one number."],
      [/[^A-Za-z0-9]/.test(password), "At least one special character."],
    ];

    const failed = rules.filter(([ok]) => !ok).map(([, msg]) => msg);
    if (failed.length) {
      next.password = failed[0];
    }

    if (!confirm) {
      next.confirm = "Please confirm your password.";
    } else if (password !== confirm) {
      next.confirm = "Passwords do not match.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      openToast("Invalid or missing token.", "error");
      return;
    }
    if (!validate()) return;

    try {
      setSubmitting(true);
      await api(`/password?token=${encodeURIComponent(token)}`, {
        method: "PATCH",
        json: { password: await hashPassword(values.password) },
      });
      openToast("Password updated successfully. You can now sign in.", "success");
      // Petite attente UX ou redirection immédiate :
      setTimeout(() => navigate("/login", { replace: true }), 900);
    } catch (err: any) {
      const msg =
        err?.data?.error ||
        err?.message ||
        "Could not update password. The link may be invalid or expired.";
      openToast(msg, "error");
      // Messages ciblés côté champ si on reconnaît l’erreur
      if (/expired/i.test(msg)) setErrors((e) => ({ ...e, token: "This reset link has expired." }));
      if (/invalid/i.test(msg)) setErrors((e) => ({ ...e, token: "Invalid reset token." }));
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
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
            Set a new password
          </Typography>
          <Typography variant="body2" >
            Choose a strong password you haven’t used elsewhere.
          </Typography>

          {/* Token errors (si lien invalide/expiré) */}
          {errors.token && (
            <Alert severity="error" variant="filled">
              {errors.token}
            </Alert>
          )}

          <TextField
            id="password"
            label="New password"
            type={show.p1 ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            autoComplete="new-password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password ? errors.password : "Use at least 8 characters."}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={show.p1 ? "Hide password" : "Show password"}
                    onClick={() => setShow((s) => ({ ...s, p1: !s.p1 }))}
                    edge="end"
                    sx={{ color: "primary.main" }}
                  >
                    {show.p1 ? <VisibilityOff /> : <Visibility />}
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

          <TextField
            id="confirm"
            label="Confirm password"
            type={show.p2 ? "text" : "password"}
            value={values.confirm}
            onChange={handleChange("confirm")}
            autoComplete="new-password"
            fullWidth
            error={!!errors.confirm}
            helperText={errors.confirm || "Re-enter the new password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={show.p2 ? "Hide password" : "Show password"}
                    onClick={() => setShow((s) => ({ ...s, p2: !s.p2 }))}
                    edge="end"
                 
                  >
                    {show.p2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting || !token}
            sx={{ py: 1.25, borderRadius: 2, mt: 1 }}
          >
            {submitting ? "Saving…" : "Save new password"}
          </Button>

          <Typography variant="caption">
            By saving, you’ll replace your current password and be able to log in with the new one.
          </Typography>
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

export default Password;
