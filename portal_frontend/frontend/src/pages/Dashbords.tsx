// src/pages/Dashboard.tsx (ou là où tu déclares le composant)
// NOTE: ton fichier original exportait "Dashbords". Tu peux garder ce nom si tu veux,
// mais je te propose "Dashboard" ci-dessous (change l'import là où il est utilisé).

import React from "react";
import ProfileMenu from "../components/ProfileMenu";
import { useNavigate } from "react-router-dom";
import { fetchCGM, computeStats, type GlucosePoint } from "../utils/cgm";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Link as MuiLink,
  Breadcrumbs,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Card,
  CardContent,
  Divider,
  Drawer,
} from "@mui/material";
import { Dashboard as DashboardIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useAuth } from "../contexts/useAuth";

// IMPORTANT: place the component at src/components/GlucoseChart.tsx
// and install MUI X Charts if you haven't:  npm i @mui/x-charts
import GlucoseChart from "../components/GlucoseChart";

const drawerWidth = 240;

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed", err);
    }
    handleMenuClose();
  };

  // ---- CGM data (live) ----
  const [data, setData] = React.useState<GlucosePoint[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const points = await fetchCGM("w"); // /CGMData?period=w
        if (alive) {
          setData(points);
          setError(null);
        }
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Fetch error");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const stats = React.useMemo(() => computeStats(data), [data]);

  // ---- Responsive left nav (hamburger on small screens) ----
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toggleMobileDrawer = () => setMobileOpen((v) => !v);

  const sidebar = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: { md: "1px solid", xs: "none" },
        borderColor: "divider",
      }}
      role="presentation"
      onClick={() => {
        // sur mobile : fermer le drawer quand on clique dans le menu
        if (mobileOpen) setMobileOpen(false);
      }}
    >
      <Box sx={{ p: 1.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          OpenGluco
        </Typography>
      </Box>
      <List sx={{ flex: 1 }}>
        <ListItem disablePadding>
          <ListItemButton selected>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2">v1.0.0</Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh", bgcolor: "background.default" }}>
      {/* Left nav: permanent on md+, hamburger (temporary) on <md */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        {/* Temporary drawer for mobile/tablet */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleMobileDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              overflowX: "hidden",
              height: "100dvh",
            },
          }}
        >
          {sidebar}
        </Drawer>

        {/* Permanent drawer for desktop */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              position: "relative",
              boxSizing: "border-box",
              overflowX: "hidden",
              height: "100dvh",
              borderRight: "1px solid",
              borderColor: "divider",

            },
          }}
        >
          {sidebar}
        </Drawer>
      </Box>

      {/* Right side: AppBar + content. Add left margin when the desktop drawer is visible */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          // Pas de margin-left sur desktop : le <nav> réserve déjà 240px
          ml: 0,
        }}
      >
        <AppBar
          position="sticky"
          color="transparent"
          elevation={0}
          sx={{
            backdropFilter: "saturate(180%) blur(6px)",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Toolbar sx={{ position: "relative", minHeight: 64 }}>
            {/* Hamburger for small screens */}
            <IconButton
              onClick={toggleMobileDrawer}
              sx={{ mr: 1, display: { xs: "inline-flex", md: "none" } }}
              edge="start"
            >
              <MenuIcon />
            </IconButton>

            {/* Center title */}
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Dashboard
              </Typography>
            </Box>

            {/* Profile on the right */}
            <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, display: { xs: "none", sm: "block" } }}>
                Hi, {user ? `${user.surname} ${user.name}` : "—"}!
              </Typography>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar alt={user?.name} src="/path/to/profile.jpg" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main content: make sure the chart always has room (minWidth:0 prevents flex overflow) */}
        <Box sx={{ p: { xs: 2, sm: 3 }, flex: 1, overflow: "auto", minWidth: 0 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <MuiLink underline="hover" color="inherit" href="/dashboard" sx={{ cursor: "pointer" }}>
              Dashboard
            </MuiLink>
            <Typography sx={{ fontWeight: 500 }}>Home</Typography>
          </Breadcrumbs>

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Overview
          </Typography>

          {/* KPI cards — responsive grid */}
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              mb: 2,
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="overline">Average (24h)</Typography>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {loading ? "…" : `${stats.avg} mg/dL`}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="overline">Time in Range</Typography>
                <Typography
                  variant="h4"
                  sx={{ color: stats.tir >= 70 ? "#9be29b" : "#ffd27a", fontWeight: 800 }}
                >
                  {loading ? "…" : `${stats.tir}%`}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="overline">Min (24h)</Typography>
                <Typography variant="h4" sx={{ color: "#9bb5ff", fontWeight: 800 }}>
                  {loading ? "…" : `${stats.min} mg/dL`}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="overline">Max (24h)</Typography>
                <Typography variant="h4" sx={{ color: "#ff9bb3", fontWeight: 800 }}>
                  {loading ? "…" : `${stats.max} mg/dL`}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Chart: grows to full width, no cramping on small screens */}
          {error ? (
            <Typography color="error" sx={{ mt: 2 }}>
              Unable to load CGM data: {error}
            </Typography>
          ) : (
            <Box sx={{ minWidth: 0 }}>
              <GlucoseChart data={data} title="Glucose — CGM Data" />
            </Box>
          )}

          <Divider sx={{ my: 4 }} />

          {/* Empty state */}
          {!loading && !error && data.length === 0 && (
            <Typography variant="body2">No data available for the period.</Typography>
          )}
        </Box>
      </Box>

      {/* Profile menu */}
      <ProfileMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleLogout={handleLogout}
        onOpenProfile={() => navigate("/profilePage")}
        onOpenSettings={() => alert("Open settings")}
        user={{ name: `${user?.surname ?? ""} ${user?.name ?? ""}`.trim() }}
      />
    </Box>
  );
};

export default Dashboard;
