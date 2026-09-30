import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Alert,
  Chip,
  Card,
  CardContent,
  Divider,
  Link as MuiLink,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Link,
  Stack
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import CookieIcon from "@mui/icons-material/Cookie";
import PolicyIcon from "@mui/icons-material/Policy";
import LinkIcon from "@mui/icons-material/Link";
import LockIcon from "@mui/icons-material/Lock";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import StorageIcon from "@mui/icons-material/Storage";
import PersonIcon from "@mui/icons-material/Person";
import CloudIcon from "@mui/icons-material/Cloud";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";

/**
 * GDPR.tsx — GDPR / Privacy Notice (Material UI + TypeScript)
 *
 * IMPORTANT:
 * - Replace ALL UPPER_SNAKE_CASE placeholders with your real information.
 * - This template is informational only and is NOT legal advice. Have counsel review before launch.
 *
 * Context (from your brief):
 * - Auth with a session cookie only (login).
 * - You process medical glucose data + identity (first name, last name, email, password).
 * - Account linking/integration with FreeStyle Libre, Dexcom, Medtronic.
 */

const GDPR: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Typography variant="h5" sx={{  fontWeight: 700 }}>
          Profile
        </Typography>
        <Chip size="small" label="Account" />
        <Box sx={{ flexGrow: 1 }} />
        <Link component={RouterLink} to="/" underline="hover" >
          ← Back to Home
        </Link>
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <SecurityIcon fontSize="large" />
        <Typography variant="h4" fontWeight={700}>Data Protection (GDPR)</Typography>
        <Chip label="Last updated: Aug 16, 2025" variant="outlined" sx={{ ml: { sm: 1 } }} />
      </Stack>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        This notice explains how <strong>COMPANY_NAME</strong> (the "Controller") collects and processes your personal data when you use the app.
      </Typography>

      <Alert icon={<WarningAmberIcon />} severity="info" sx={{ mb: 4 }}>
        This is a <em>template</em>. Adapt it to your situation and get a lawyer to review it before going live.
      </Alert>

      {/* Quick jump */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={1} sx={{ mb: 3 }}>
        <MuiLink href="#controller" underline="hover">Controller</MuiLink>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
        <MuiLink href="#data" underline="hover">Data & Purposes</MuiLink>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
        <MuiLink href="#legal-bases" underline="hover">Legal Bases</MuiLink>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
        <MuiLink href="#cookies" underline="hover">Cookies</MuiLink>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
        <MuiLink href="#processors" underline="hover">Recipients & Processors</MuiLink>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
        <MuiLink href="#transfers" underline="hover">International Transfers</MuiLink>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
        <MuiLink href="#retention-security" underline="hover">Retention & Security</MuiLink>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
        <MuiLink href="#rights" underline="hover">Your Rights</MuiLink>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
        <MuiLink href="#contact" underline="hover">Contact</MuiLink>
      </Stack>

      {/* Controller */}
      <Card id="controller" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Controller</Typography>
          <Typography variant="body2">
            <strong>Legal name:</strong> COMPANY_NAME<br/>
            <strong>Address:</strong> COMPANY_ADDRESS<br/>
            <strong>Email (Support/DPO):</strong> <MuiLink href="mailto:DPO_EMAIL">DPO_EMAIL</MuiLink><br/>
            <strong>Company number (if any):</strong> COMPANY_REG_NUMBER<br/>
            <strong>Legal representative:</strong> COMPANY_LEGAL_REP
          </Typography>
        </CardContent>
      </Card>

      {/* Data & purposes */}
      <Card id="data" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Data processed & purposes</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            We only process what is necessary to operate the app and deliver features to you.
          </Typography>

          <Table size="small" aria-label="data and purposes">
            <TableHead>
              <TableRow>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Examples</strong></TableCell>
                <TableCell><strong>Purpose</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><PersonIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />Identity</TableCell>
                <TableCell>First name, last name, email</TableCell>
                <TableCell>Account creation, profile, communications</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><LockIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />Credentials</TableCell>
                <TableCell>Password (hashed + salted)</TableCell>
                <TableCell>Authentication and account security</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><StorageIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />Medical data</TableCell>
                <TableCell>Glucose readings and related health metrics</TableCell>
                <TableCell>Display, analytics, alerts, care insights</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><LinkIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />Integrations</TableCell>
                <TableCell>Account linking tokens/IDs with <strong>FreeStyle Libre</strong>, <strong>Dexcom</strong>, <strong>Medtronic</strong></TableCell>
                <TableCell>Import device data; synchronize updates</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><CloudIcon fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />Technical</TableCell>
                <TableCell>Session cookie, logs, device & crash diagnostics</TableCell>
                <TableCell>Keep you logged in; security; debugging; preventing abuse</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Legal bases */}
      <Card id="legal-bases" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Legal bases (Art. 6 & 9 GDPR)</Typography>
          <List>
            <ListItem>
              <ListItemIcon><PolicyIcon /></ListItemIcon>
              <ListItemText
                primary="Contract (Art. 6(1)(b))"
                secondary="To create and operate your account, provide core app features, and maintain integrations you choose to activate."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><PolicyIcon /></ListItemIcon>
              <ListItemText
                primary="Explicit consent for health data (Art. 9(2)(a))"
                secondary="We process glucose/medical data only when you give explicit consent, which you can withdraw at any time in settings."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><PolicyIcon /></ListItemIcon>
              <ListItemText
                primary="Legitimate interests (Art. 6(1)(f))"
                secondary="To keep the service secure, prevent fraud, and improve reliability, in a way that does not override your rights."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><PolicyIcon /></ListItemIcon>
              <ListItemText
                primary="Legal obligations (Art. 6(1)(c))"
                secondary="Where we must retain or disclose data to comply with applicable law or regulatory requests."
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Cookies */}
      <Card id="cookies" sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <CookieIcon />
            <Typography variant="h6">Cookies</Typography>
          </Stack>
          <Typography variant="body2" sx={{ mb: 2 }}>
            We use a <strong>strictly necessary session cookie</strong> for login. No analytics or advertising cookies are set without your consent.
          </Typography>
          <Table size="small" aria-label="cookies">
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Purpose</strong></TableCell>
                <TableCell><strong>Retention</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>SESSION_COOKIE_NAME</TableCell>
                <TableCell>Strictly necessary</TableCell>
                <TableCell>Keep you authenticated between page loads</TableCell>
                <TableCell>Expires on logout or after SESSION_LIFETIME</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recipients & processors */}
      <Card id="processors" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Recipients & processors</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            We share data only with service providers acting on our instructions ("processors") and, when you choose, with device platforms you connect.
          </Typography>
          <Table size="small" aria-label="processors">
            <TableHead>
              <TableRow>
                <TableCell><strong>Recipient</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>Data</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>HOSTING_PROVIDER_NAME</TableCell>
                <TableCell>Cloud hosting & database</TableCell>
                <TableCell>All categories necessary to run the app</TableCell>
                <TableCell>COUNTRY / REGION</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>EMAIL_PROVIDER_NAME</TableCell>
                <TableCell>Transactional email</TableCell>
                <TableCell>Email, name</TableCell>
                <TableCell>COUNTRY / REGION</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>FreeStyle Libre / Dexcom / Medtronic</TableCell>
                <TableCell>Integration partners (you opt in)</TableCell>
                <TableCell>Tokens/IDs; glucose data pulled via their APIs</TableCell>
                <TableCell>As per their privacy notices</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transfers */}
      <Card id="transfers" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>International data transfers</Typography>
          <Typography variant="body2">
            If data is transferred outside the EEA/UK, we implement appropriate safeguards (e.g., EU Standard Contractual Clauses, UK IDTA/Addendum) and assess recipient laws. Copies of relevant safeguards can be requested.
          </Typography>
        </CardContent>
      </Card>

      {/* Retention & Security */}
      <Card id="retention-security" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Retention & security</Typography>
          <List>
            <ListItem>
              <ListItemIcon><LockIcon /></ListItemIcon>
              <ListItemText
                primary="Security"
                secondary="Encryption in transit and at rest, strict access controls, audit logging, secret rotation, and regular backups. Passwords are hashed (e.g., Argon2/bcrypt) with unique salts."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><StorageIcon /></ListItemIcon>
              <ListItemText
                primary="Retention"
                secondary="Account data retained while your account is active; health data retained until you delete it or your account; logs kept for SECURITY_LOG_RETENTION. We may retain certain records as required by law."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><WarningAmberIcon /></ListItemIcon>
              <ListItemText
                primary="Breach notifications"
                secondary="If a personal data breach is likely to result in risk to your rights and freedoms, we will notify authorities and affected users as required."
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Rights */}
      <Card id="rights" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Your rights</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Subject to conditions in the GDPR, you have the right to:
          </Typography>
          <List dense>
            <ListItem><ListItemIcon><ArrowForwardIcon /></ListItemIcon><ListItemText primary="Access your data" secondary="Receive a copy of your personal data." /></ListItem>
            <ListItem><ListItemIcon><ArrowForwardIcon /></ListItemIcon><ListItemText primary="Rectify" secondary="Correct inaccurate or incomplete data." /></ListItem>
            <ListItem><ListItemIcon><ArrowForwardIcon /></ListItemIcon><ListItemText primary="Erase" secondary="Delete your data in certain cases." /></ListItem>
            <ListItem><ListItemIcon><ArrowForwardIcon /></ListItemIcon><ListItemText primary="Restrict" secondary="Limit processing in certain circumstances." /></ListItem>
            <ListItem><ListItemIcon><ArrowForwardIcon /></ListItemIcon><ListItemText primary="Portability" secondary="Obtain your data in a machine-readable format and transmit it elsewhere." /></ListItem>
            <ListItem><ListItemIcon><ArrowForwardIcon /></ListItemIcon><ListItemText primary="Object" secondary="Object to processing based on legitimate interests." /></ListItem>
            <ListItem><ListItemIcon><ArrowForwardIcon /></ListItemIcon><ListItemText primary="Withdraw consent" secondary="You can withdraw consent to health data processing or integrations at any time in settings; this does not affect prior processing." /></ListItem>
            <ListItem><ListItemIcon><ArrowForwardIcon /></ListItemIcon><ListItemText primary="Complain" secondary="Lodge a complaint with your local supervisory authority (e.g., CNIL/ICO)." /></ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card id="contact" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Contact</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            For requests or questions, contact our DPO/Privacy team:
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> <MuiLink href="mailto:DPO_EMAIL">DPO_EMAIL</MuiLink><br/>
            <strong>Postal:</strong> DPO_POSTAL_ADDRESS
          </Typography>
        </CardContent>
      </Card>

      {/* Helpful actions (optional) */}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Button variant="contained" href="#" onClick={(e) => e.preventDefault()}>Export my data (JSON)</Button>
        <Button variant="outlined" href="#" onClick={(e) => e.preventDefault()}>Delete my account</Button>
        <Button variant="text" href="#" onClick={(e) => e.preventDefault()}>Manage integrations</Button>
      </Box>
    </Container>
  );
}

export default GDPR;
