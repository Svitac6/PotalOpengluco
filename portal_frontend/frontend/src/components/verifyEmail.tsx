import React, { useEffect, useMemo, useState } from "react";
import { AppBar, Toolbar, Box, Button, Typography, Paper, Fade, CircularProgress, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

// Reuse your api() helper and API_BASE
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export type ApiOptions = RequestInit & { json?: any };

async function api(path: string, opts: ApiOptions = {}) {
  const { json, headers, ...rest } = opts;
  const init: RequestInit = {
    credentials: "include",
    headers: {
      ...(json ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    ...rest,
    ...(json ? { body: JSON.stringify(json) } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, init);
  let data: any = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    const msg = data?.error || data?.message || res.statusText;
    const err = new Error(msg);
    (err as any).status = res.status;
    (err as any).data = data;
    throw err;
  }
  return data;
}

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const token = useMemo(() => new URLSearchParams(search).get("token") || "", [search]);
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Missing token.");
        return;
      }
      setStatus("loading");
      try {
        const res = await api(`/verify?token=${encodeURIComponent(token)}`, { method: "GET" });
        if (ignore) return;
        setStatus("success");
        setMessage(res?.message || "Successfully verified account.");
      } catch (err: any) {
        if (ignore) return;
        setStatus("error");
        setMessage(err?.message || "Verification failed.");
      }
    };
    run();
    return () => { ignore = true; };
  }, [token]);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 0.4 }}>
            OpenGluco
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Email Verification
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
        <Fade in timeout={700}>
          <Paper
            elevation={0}
            sx={{
              width: "100%", maxWidth: 560, p: { xs: 4, sm: 5 }, textAlign: "center",
              borderRadius: 4, backdropFilter: "blur(14px)",
               boxShadow: "0 20px 80px rgba(0,0,0,0.45)",
              position: "relative", overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Box
                sx={{
                  width: 74, height: 74, borderRadius: "50%", display: "grid", placeItems: "center",
                  background: isSuccess
                    ? "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(59,130,246,0.15))"
                    : "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(59,130,246,0.15))",
                  boxShadow: isSuccess ? "0 10px 30px rgba(34,197,94,0.25)" : "0 10px 30px rgba(239,68,68,0.25)",
                }}
              >
                {isSuccess ? (
                  <CheckCircleRoundedIcon sx={{ fontSize: 44, color: "#34d399" }} />
                ) : isError ? (
                  <ErrorOutlineRoundedIcon sx={{ fontSize: 44, color: "#ef4444" }} />
                ) : (
                  <CircularProgress size={44} />
                )}
              </Box>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: 0.2 }}>
              {isLoading ? "Verifying..." : isSuccess ? "Email verified" : "Verification failed"}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {isLoading
                ? "Please hold on while we confirm your email."
                : message || (isSuccess ? "You can now log in to your account." : "We couldn’t verify this link.")}
            </Typography>

            {isError && (
              <Alert severity="error" sx={{ textAlign: "left", mb: 2 }}>
                {message || "Invalid or expired link."}
              </Alert>
            )}

            {isSuccess ? (
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/login", { replace: true })}
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{ borderRadius: 2.5, py: 1.4, px: 3, fontWeight: 700, textTransform: "none", letterSpacing: 0.2 }}
              >
                Go to login
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="large"
                onClick={() => window.location.reload()}
                sx={{ borderRadius: 2.5, py: 1.2, px: 3, fontWeight: 700, textTransform: "none", letterSpacing: 0.2 }}
                disabled={isLoading}
              >
                Try again
              </Button>
            )}

            <Typography variant="caption" sx={{ display: "block", mt: 2.5 }}>
              {isSuccess
                ? "Tip: You can close this tab and sign in anytime."
                : "If the link expired, request a new verification email from the login page."}
            </Typography>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
