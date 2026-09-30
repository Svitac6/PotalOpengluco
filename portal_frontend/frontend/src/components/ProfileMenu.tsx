import {
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import Logout from "@mui/icons-material/Logout";

/**
 * Drop-in replacement for your profile menu.
 * Keeps your existing anchorEl / handlers, but gives it a nicer, glassy style
 * and a small identity header. Plug it in where you render the <Menu />.
 */
export default function ProfileMenu({
    anchorEl,
    handleMenuClose,
    handleLogout,
    onOpenProfile,
}: {
    anchorEl: HTMLElement | null;
    handleMenuClose: () => void;
    handleLogout: () => void;
    onOpenProfile?: () => void;
    onOpenSettings?: () => void;
    user?: { name?: string; email?: string; avatarUrl?: string };
}) {
    const open = Boolean(anchorEl);

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: "hidden",
                    mt: 1,
                    borderRadius: 3,
                    backdropFilter: "blur(14px)",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.45), inset 0 1px rgba(255,255,255,0.06)",
                    "& .MuiMenuItem-root": {
                        gap: 10,
                        px: 1.2,
                        minWidth: 220,
                        "&:hover": {
                            background:
                                "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                        },
                    },
                    "& .MuiListItemIcon-root": { minWidth: 34 },
                },
            }}
        >

            <MenuItem
                onClick={() => {
                    handleMenuClose();
                    onOpenProfile?.();
                }}
            >
                <ListItemIcon sx={{ minWidth: 'unset', mr: -8 }}>
                    <AccountCircleOutlined fontSize="small"  />
                </ListItemIcon>
                <ListItemText
                    primary={<Typography>Profile</Typography>}
                    secondary={
                        <Typography variant="caption" >
                            View & edit account
                        </Typography>
                    }
                />
            </MenuItem>



            {/* <MenuItem
                onClick={() => {
                    handleMenuClose();
                    onOpenSettings?.();
                }}
            >
                <ListItemIcon sx={{ minWidth: 'unset', mr: -8 }}>
                    <SettingsOutlined fontSize="small" />
                </ListItemIcon>
                <ListItemText
                    primary={<Typography>Settings</Typography>}
                    secondary={
                        <Typography variant="caption" >
                            Preferences & security
                        </Typography>
                    }
                />
            </MenuItem> */}

            <Divider sx={{  my: 0.5 }} />

            <MenuItem
                onClick={() => {
                    handleMenuClose();
                    handleLogout();
                }}
                sx={{
                    "& .MuiListItemIcon-root, & .MuiTypography-root": { color: "#f87171" },
                    "&:hover": { background: "rgba(248,113,113,0.08)" },
                }}
            >
                <ListItemIcon sx={{ minWidth: 'unset', mr: -8 }}>
                    <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={<Typography>Logout</Typography>} />
            </MenuItem>
        </Menu>
    );
}
