import * as React from "react";
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import SettingsBrightnessRoundedIcon from "@mui/icons-material/SettingsBrightnessRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { ThemeModeContext } from "../App"; // <- ajuste le chemin si besoin

type Mode = "system" | "light" | "dark";

const ThemeToggle: React.FC = () => {
  const { mode, setMode, resolvedMode } = React.useContext(ThemeModeContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const choose = (next: Mode) => {
    setMode(next);
    handleClose();
  };

  const icon = resolvedMode === "dark" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />;
  const label =
    mode === "system"
      ? `System (${resolvedMode})`
      : mode.charAt(0).toUpperCase() + mode.slice(1);

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
      <Tooltip title={`Theme: ${label}`}>
        <IconButton
          aria-label="toggle theme"
          onClick={handleOpen}
          sx={{
            color: "text.primary",
            borderRadius: 2.5,
            border: "1px solid",
            borderColor: "divider",
            backdropFilter: "blur(8px)",
          }}
        >
          {icon}
        </IconButton>
      </Tooltip>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={0}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 220,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            boxShadow: "0 16px 60px rgba(0,0,0,0.35)",
            overflow: "hidden",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="overline" sx={{ opacity: 0.7, letterSpacing: 1 }}>
            Theme
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Current: {label}
          </Typography>
        </Box>
        <Divider />

        <MenuItem onClick={() => choose("system")} sx={{ py: 1.2, gap: 1 }} selected={mode === "system"}>
          <ListItemIcon>
            <SettingsBrightnessRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="System" />
          {mode === "system" && <CheckRoundedIcon fontSize="small" />}
        </MenuItem>

        <MenuItem onClick={() => choose("light")} sx={{ py: 1.2, gap: 1 }} selected={mode === "light"}>
          <ListItemIcon>
            <LightModeRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Light" />
          {mode === "light" && <CheckRoundedIcon fontSize="small" />}
        </MenuItem>

        <MenuItem onClick={() => choose("dark")} sx={{ py: 1.2, gap: 1 }} selected={mode === "dark"}>
          <ListItemIcon>
            <DarkModeRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Dark" />
          {mode === "dark" && <CheckRoundedIcon fontSize="small" />}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ThemeToggle;
