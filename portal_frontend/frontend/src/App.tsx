import React from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyEmail from './components/verifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import Password from './pages/Password';
import Dashbords from './pages/Dashbords';
import GDPR from './pages/GDPR';
import Terms from './pages/terms';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Typography, Stack, Box, Link, useMediaQuery } from "@mui/material";
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import ProfilePage from './pages/ProfilePage';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import ThemeToggle from './components/ThemeToggle';

const DARK_THEME_AVAILABLE = true;
const STORAGE_KEY = 'opengluco-mode';

type Mode = 'system' | 'light' | 'dark';
type Resolved = 'light' | 'dark';

type ThemeModeContextValue = {
  mode: Mode;
  setMode: (m: Mode) => void;
  resolvedMode: Resolved;
};

export const ThemeModeContext = React.createContext<ThemeModeContextValue>({
  mode: 'system',
  setMode: () => {},
  resolvedMode: 'light',
});

export default function App():React.ReactElement {
  // 1) Préférence système
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  // 2) Mode sauvegardé (system par défaut)
  const [mode, setMode] = React.useState<Mode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Mode | null;
    return saved ?? 'system';
  });

  // 3) Résolution du mode effectif pour MUI
  const resolvedMode: Resolved = React.useMemo<Resolved>(() => {
    if (mode === 'system') return prefersDark ? 'dark' : 'light';
    return mode;
  }, [mode, prefersDark]);

  // 4) Persistance
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  // 5) Thèmes light/dark (tu peux affiner les couleurs ici)
  const theme = React.useMemo(() => {
    const isDark = resolvedMode === 'dark';
    return createTheme({
      palette: {
        mode: resolvedMode,
        background: {
          default: isDark ? '#0b0b10' : '#ffffff',
          paper: isDark ? '#14141a' : '#f5f5f5',
        },
        text: {
          primary: isDark ? '#ffffff' : '#000000',
          secondary: isDark ? '#cccccc' : '#555555',
        },
    }
    });
  }, [resolvedMode]);

  const ctx: ThemeModeContextValue = React.useMemo(
    () => ({ mode, setMode, resolvedMode }),
    [mode, resolvedMode]
  );

  return (
    <ThemeModeContext.Provider value={ctx}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/password" element={<Password />} />
                <Route path="/gdpr" element={<GDPR />} />
                <Route path="/terms" element={<Terms />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashbords />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profilePage"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>

            {/* footer */}
            <Box component="footer" sx={{ mt: 'auto', py: 3, borderTop: '1px solid', borderColor: 'divider' }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                sx={{ maxWidth: 1500, mx: "auto", px: 2, width: '100%' }}
              >
                <Typography variant="body2">
                  © {new Date().getFullYear()} OpenGluco. All rights reserved.
                </Typography>

                <Stack direction="row" spacing={3} alignItems="center">
                  <Link href="/terms" underline="hover" sx={{ fontSize: "0.9rem" }}>
                    Terms & Conditions
                  </Link>
                  <Link href="/gdpr" underline="hover" sx={{ fontSize: "0.9rem" }}>
                    Privacy Policy (GDPR)
                  </Link>

                  {/* Bouton Light/Dark/System */}
                  {DARK_THEME_AVAILABLE && <ThemeToggle />}
                </Stack>
              </Stack>
            </Box>
          </AuthProvider>
        </Box>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
