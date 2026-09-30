import React from "react";
import {
  Box, Typography, Card, CardContent, CardHeader, Divider, TextField, Button,
  Stack, Chip, Tooltip, Snackbar, Alert, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Avatar, CardActionArea, LinearProgress
} from "@mui/material";
import {
  DeleteOutline, Refresh, Lock as LockIcon, Link as LinkIcon,
  InfoOutlined, Star, StarBorder
} from "@mui/icons-material";
import { api } from "../utils/Api";

// ------------------------- Types -------------------------
type Provider = "LibreLinkUp" | "Dexcom" | "Medtronic";

type LinkedAccount = {
  id: string;
  dbId: number | null;
  provider: Provider;
  label: string;
  region: string;
  username: string;
  lastSync: string | null;
  isPrimary?: boolean;
};

// Providers configuration
const PROVIDERS: Array<{
  id: Provider; label: string; subtitle: string; hue: string; hint: string; comingSoon?: boolean;
}> = [
  { id: "LibreLinkUp", label: "Freestyle Libre", subtitle: "LibreView / LibreLink", hue: "#FFB703", hint: "Connect via LibreView (OAuth later)." },
  { id: "Dexcom", label: "Dexcom", subtitle: "G6 / G7", hue: "#3B82F6", hint: "Connect via Dexcom (OAuth later)." },
  { id: "Medtronic", label: "Medtronic", subtitle: "CareLink", hue: "#8B5CF6", hint: "Coming soon", comingSoon: true },
];

// Dialog for entering credentials
function CredentialsDialog({
  open, onClose, provider, onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  provider: Provider | null;
  onSubmit: (vals: { username: string; password: string; region: string }) => void;
}) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [region, setRegion] = React.useState("eu");

  React.useEffect(() => {
    if (!open) { setUsername(""); setPassword(""); setRegion("eu"); }
  }, [open]);

  const label = PROVIDERS.find(p => p.id === provider)?.label ?? "Provider";

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Link {label}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth autoFocus />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
          <TextField label="Region" value={region} onChange={e => setRegion(e.target.value)} helperText="ex: eu, us" />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSubmit({ username, password, region })} disabled={!username || !password || !region}>
          Link
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function SensorAccounts() {
  const [linkedAccounts, setLinkedAccounts] = React.useState<LinkedAccount[]>([]);
  const [primaryId, setPrimaryId] = React.useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = React.useState<Provider | null>(null);
  const [isLinking, setIsLinking] = React.useState(false);
  const [isSyncingId, setIsSyncingId] = React.useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = React.useState<number | null>(null);

  const [snack, setSnack] = React.useState<{ open: boolean; msg: string; sev: "success" | "info" | "warning" | "error" }>({ open: false, msg: "", sev: "success" });
  const [confirmOpen, setConfirmOpen] = React.useState<{ open: boolean; id: number | null; label?: string | null }>({ open: false, id: null, label: null });
  const [credOpen, setCredOpen] = React.useState(false);

  const selectedMeta = PROVIDERS.find((p) => p.id === selectedProvider);

  const makeLocalId = (provider: string, region: string, username: string) =>
    `${provider}:${region}:${username}`;

  // Fetch linked accounts
  const fetchConnections = React.useCallback(async () => {
    const res = await api("/CGMCredentials", { method: "GET" });
    const rows: any[] = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];

    const mapped: LinkedAccount[] = rows.map((tup: any) => {
      let dbId: number | null = null;
      let username: string, type: Provider, region: string;
      if (tup.length === 4) {
        [dbId, username, type, region] = tup as [number, string, Provider, string];
      } else {
        [username, type, region] = tup as [string, Provider, string];
      }
      const id = makeLocalId(type, region, username);
      const label = PROVIDERS.find(p => p.id === type)?.label ?? type;
      return { id, dbId, provider: type, label, region, username, lastSync: null, isPrimary: false };
    });

    setLinkedAccounts(mapped);
    if (mapped.length && !primaryId) {
      const first = mapped[0].id;
      setPrimaryId(first);
      setLinkedAccounts(prev => prev.map(a => ({ ...a, isPrimary: a.id === first })));
    }
  }, [primaryId]);

  React.useEffect(() => { fetchConnections().catch(e => setSnack({ open: true, msg: e?.message || "Failed to load connections", sev: "error" })); }, [fetchConnections]);

  // Handle linking
  const handleLink = () => {
    if (!selectedProvider) return;
    const meta = PROVIDERS.find(p => p.id === selectedProvider);
    if (meta?.comingSoon) {
      setSnack({ open: true, msg: `${meta.label} is coming soon!`, sev: "info" });
      return; // Do nothing for Medtronic
    }
    setCredOpen(true);
  };

  const submitCredentials = async (vals: { username: string; password: string; region: string }) => {
    if (!selectedProvider) return;
    try {
      setIsLinking(true);
      const dup = linkedAccounts.some(a => a.provider === selectedProvider && a.region === vals.region);
      if (dup) { setSnack({ open: true, msg: `${selectedMeta?.label} (${vals.region}) is already linked.`, sev: "warning" }); setCredOpen(false); setIsLinking(false); return; }
      await api("/CGMCredentials", { method: "POST", json: { username: vals.username, password: vals.password, type: selectedProvider, region: vals.region } });
      setCredOpen(false); await fetchConnections(); setSnack({ open: true, msg: `Account ${selectedMeta?.label} linked`, sev: "success" });
    } catch (e: any) { setSnack({ open: true, msg: e?.message || "Failed to link account.", sev: "error" }); } finally { setIsLinking(false); }
  };

  // Sync
  const handleSync = async (id: string) => {
    setIsSyncingId(id);
    await new Promise(r => setTimeout(r, 700));
    setLinkedAccounts(prev => prev.map(a => a.id === id ? { ...a, lastSync: new Date().toLocaleString() } : a));
    setSnack({ open: true, msg: "Synchronization started", sev: "info" });
    setIsSyncingId(null);
  };

  const handleSetPrimary = (id: string) => {
    setPrimaryId(id);
    setLinkedAccounts(prev => prev.map(a => ({ ...a, isPrimary: a.id === id })));
    setSnack({ open: true, msg: "Primary source updated", sev: "success" });
  };

  const requestUnlink = (acc: LinkedAccount) => {
    if (!acc.dbId && acc.dbId !== 0) { setSnack({ open: true, msg: "Missing database id.", sev: "error" }); return; }
    setConfirmOpen({ open: true, id: acc.dbId, label: `${acc.label} · ${acc.region.toUpperCase()} (${acc.username})` });
  };

  const confirmUnlink = async () => {
    if (confirmOpen.id == null) return;
    setIsDeletingId(confirmOpen.id);
    await api("/CGMCredentials", { method: "DELETE", json: { id: confirmOpen.id } });
    setConfirmOpen({ open: false, id: null, label: null });
    await fetchConnections();
    setSnack({ open: true, msg: "Connection unlinked", sev: "success" });
    setIsDeletingId(null);
  };

  return (
    <>
      <Card sx={{ flex: 1 }}>
        <CardHeader title={<Typography sx={{ fontWeight: 700 }}>Sensor Accounts</Typography>} subheader={<Typography variant="body2">Connect multiple providers and select a primary source.</Typography>} />
        <Divider />
        <CardContent>
          <Stack spacing={1}>
            {linkedAccounts.length === 0 ? <Typography variant="body2">No accounts linked at the moment.</Typography> : linkedAccounts.map(acc => {
              const isSyncing = isSyncingId === acc.id;
              const isDeleting = acc.dbId != null && isDeletingId === acc.dbId;
              return (
                <Card key={acc.id} variant="outlined">
                  {isSyncing && <LinearProgress />}
                  <CardContent>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ width: 40, height: 40 }}><LockIcon /></Avatar>
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography sx={{ fontWeight: 700 }}>{acc.label} · {acc.region.toUpperCase()}</Typography>
                            {acc.isPrimary ? <Chip size="small" color="success" label="Primary" /> : <Chip size="small" variant="outlined" label="Secondary" />}
                          </Stack>
                          <Typography variant="caption">User: {acc.username}</Typography><br/>
                          {acc.lastSync && <Typography variant="caption">Last sync: {acc.lastSync}</Typography>}
                        </Box>
                      </Stack>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                        <Button size="small" variant="contained" startIcon={<Refresh />} onClick={() => handleSync(acc.id)} disabled={isSyncing}>
                          {isSyncing ? "Sync…" : "Sync"}
                        </Button>
                        <Button size="small" variant={acc.isPrimary ? "outlined" : "contained"} startIcon={acc.isPrimary ? <Star /> : <StarBorder />} onClick={() => handleSetPrimary(acc.id)} disabled={acc.isPrimary}>
                          {acc.isPrimary ? "Primary" : "Set as Primary"}
                        </Button>
                        <Tooltip title={acc.dbId == null ? "Missing server id" : "Unlink this connection"}>
                          <span>
                            <Button size="small" variant="outlined" color="error" startIcon={<DeleteOutline />} disabled={acc.dbId == null || isDeleting} onClick={() => requestUnlink(acc)}>
                              {isDeleting ? "Unlinking…" : "Unlink"}
                            </Button>
                          </span>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Choose provider */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 2 }}>
            {PROVIDERS.map(p => {
              const already = linkedAccounts.some(a => a.provider === p.id);
              const disabled = already || p.comingSoon;
              return (
                <Card key={p.id} variant="outlined"
                  sx={{
                    borderColor: selectedProvider === p.id ? p.hue : "rgba(255,255,255,0.12)",
                    outline: selectedProvider === p.id ? `2px solid ${p.hue}55` : "none",
                    transition: "all .2s ease",
                    "&:hover": { borderColor: disabled ? "rgba(255,255,255,0.12)" : p.hue, transform: disabled ? "none" : "translateY(-2px)" },
                    opacity: disabled ? 0.5 : 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: disabled ? "not-allowed" : "pointer"
                  }}
                  onClick={() => { if (!disabled) setSelectedProvider(p.id); }}
                >
                  <CardActionArea sx={{ flexGrow: 1 }}>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: p.hue, width: 40, height: 40 }}><LockIcon /></Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 700 }}>{p.label}</Typography>
                          <Typography variant="body2">{p.subtitle}</Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                        <Chip size="small" label={already ? "Already linked" : p.comingSoon ? "Coming soon" : "Available"} color={already || p.comingSoon ? "default" : "success"} variant={already || p.comingSoon ? "outlined" : "filled"} />
                        <Typography variant="caption">{p.hint}</Typography>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "stretch", sm: "center" }} sx={{ mt: 2 }}>
            <Button variant="contained" startIcon={<LinkIcon />} onClick={handleLink} disabled={!selectedProvider || isLinking} sx={{ minWidth: 220 }}>
              {isLinking ? "Linking…" : selectedMeta ? `Link ${selectedMeta.label}` : "Link"}
            </Button>
            <Tooltip title="Why do I need to sign in?"><InfoOutlined /></Tooltip>
            <Typography variant="caption">You can link multiple providers and choose the primary source.</Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* Confirm unlink */}
      <Dialog open={confirmOpen.open} onClose={() => setConfirmOpen({ open: false, id: null, label: null })}>
        <DialogTitle>Unlink account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmOpen.label ? (
              <>You will unlink <b>{confirmOpen.label}</b>. You will need to log in again to resynchronize your data. Continue?</>
            ) : (
              <>You will need to log in again to resynchronize your data. Continue?</>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen({ open: false, id: null, label: null })}>Cancel</Button>
          <Button color="error" startIcon={<DeleteOutline />} onClick={confirmUnlink} autoFocus>Unlink</Button>
        </DialogActions>
      </Dialog>

      <CredentialsDialog open={credOpen} onClose={() => setCredOpen(false)} provider={selectedProvider} onSubmit={submitCredentials} />

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack((s) => ({ ...s, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snack.sev} variant="filled" sx={{ width: "100%" }}>{snack.msg}</Alert>
      </Snackbar>
    </>
  );
}
