import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Stack,
  Chip,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import SensorAccounts from "../components/SensorAccounts"; // ⬅️ nouveau composant

// Shared styles

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Box sx={{ p: 3,  minHeight: "100vh" }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Typography variant="h5" sx={{  fontWeight: 700 }}>
          Profile
        </Typography>
        <Chip size="small" label="Account" />
        <Box sx={{ flexGrow: 1 }} />
        <Link component={RouterLink} to="/dashboard" underline="hover" >
          ← Back to Dashboard
        </Link>
      </Stack>

      {/* Main sections */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {/* Personal info (read-only) */}
        <Card sx={{ flex: 1 }}>
          <CardHeader
            title={<Typography sx={{  fontWeight: 700 }}>Personal Information</Typography>}
            subheader={<Typography variant="body2" >Your account details</Typography>}
          />
          <Divider  />
          <CardContent>
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="First name"
                  value={user?.name || ""}
              
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
                <TextField
                  label="Last name"
                  value={user?.surname || ""}
              
                  InputProps={{readOnly: true }}
                  fullWidth
                />
              </Stack>
              <TextField
                label="Email"
                value={user?.email || ""}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Sensor accounts component */}
        <SensorAccounts />
      </Stack>

      {/* Help / Tips */}
      <Card sx={{mt: 2 }}>
        <CardHeader
          title={<Typography sx={{  fontWeight: 700 }}>Help & Tips</Typography>}
          subheader={<Typography variant="body2" >Managing multiple linked accounts</Typography>}
        />
        <Divider sx={{  }} />
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="body2">
              • A "Primary" account will be used by default for dashboards. You can change it at any time.
            </Typography>
            <Typography variant="body2">
              • Manual synchronization is available for each account. Automatic syncs depend on the provider.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
