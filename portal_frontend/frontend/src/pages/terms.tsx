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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Stack,
  Link
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";;
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link as RouterLink } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";

export default function GDPRPage(): JSX.Element {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
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
        <Typography variant="h4" fontWeight={700}>Data Protection (GDPR) & Terms</Typography>
        <Chip label="Last updated: Aug 16, 2025" variant="outlined" sx={{ ml: { sm: 1 } }} />
      </Stack>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        This page explains both our <strong>Privacy Policy (GDPR)</strong> and our <strong>Terms & Conditions</strong>.
      </Typography>

      <Alert icon={<WarningAmberIcon />} severity="info" sx={{ mb: 4 }}>
        This is a <em>template</em>. Adapt it to your situation and get a lawyer to review it before going live.
      </Alert>

      {/* Quick jump */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={1} sx={{ mb: 3, flexWrap:"wrap" }}>
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
        $1terms$2
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
        <MuiLink href="#terms" underline="hover">Terms & Conditions</MuiLink>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
        <MuiLink href="#contact" underline="hover">Contact</MuiLink>
      </Stack>

      {/* GDPR Sections (same as before) */}
      {/* ... keep all the existing GDPR cards ... */}

      {/* Terms & Conditions */}
      <Card id="terms" sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <DescriptionIcon />
            <Typography variant="h6">Terms & Conditions</Typography>
          </Stack>
          <Typography variant="body2" sx={{ mb: 2 }}>
            By using our services, you agree to the following Terms & Conditions. Please read them carefully.
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
              <ListItemText primary="Eligibility" secondary="You must be of legal age to use this service and capable of entering into a contract." />
            </ListItem>
            <ListItem>
              <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
              <ListItemText primary="Account responsibility" secondary="You are responsible for keeping your login credentials secure and for activities on your account." />
            </ListItem>
            <ListItem>
              <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
              <ListItemText primary="Health data" secondary="This service is not a medical device. Data and insights are informational only and do not replace professional medical advice." />
            </ListItem>
            <ListItem>
              <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
              <ListItemText primary="Integrations" secondary="By connecting to FreeStyle Libre, Dexcom, or Medtronic, you authorize us to access your data from these services." />
            </ListItem>
            <ListItem>
              <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
              <ListItemText primary="Acceptable use" secondary="You agree not to misuse the service, attempt unauthorized access, or use data in violation of applicable law." />
            </ListItem>
            <ListItem>
              <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
              <ListItemText primary="Termination" secondary="We may suspend or terminate accounts for breach of these Terms or unlawful use." />
            </ListItem>
            <ListItem>
              <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
              <ListItemText primary="Limitation of liability" secondary="Service is provided 'as is'. We disclaim liability except as required by law." />
            </ListItem>
            <ListItem>
              <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
              <ListItemText primary="Governing law" secondary="These Terms are governed by the laws of JURISDICTION. Disputes will be subject to the exclusive jurisdiction of the courts in JURISDICTION." />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Terms & Conditions */}
      <Card id="terms" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Terms & Conditions</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            These Terms & Conditions ("Terms") govern your use of the <strong>COMPANY_NAME</strong> application and services. By creating an account or using the service, you agree to these Terms.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>1) Eligibility & Account</Typography>
          <Typography variant="body2">
            You must be legally capable to enter a contract in your jurisdiction. You are responsible for safeguarding your login credentials. Notify us immediately of any unauthorized use.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>2) Integrations</Typography>
          <Typography variant="body2">
            When you link FreeStyle Libre, Dexcom, or Medtronic, you authorize us to retrieve data from their services on your behalf, subject to their own terms and privacy notices. We may suspend integrations that pose security, legal, or reliability risks.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>3) Health Information — No Medical Advice</Typography>
          <Typography variant="body2">
            The app provides data display and insights only. It is <strong>not</strong> a medical device and does not provide medical advice. Always follow your healthcare professional’s guidance. In emergencies, call local emergency services.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>4) Acceptable Use</Typography>
          <Typography variant="body2">
            You agree not to misuse the service, including: violating laws; infringing IP or privacy; reverse engineering; uploading malware; attempting to access accounts or data without authorization; or overloading the service.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>5) Subscriptions & Fees</Typography>
          <Typography variant="body2">
            If applicable, fees, billing cycles, trials, and renewal terms will be shown at checkout. Taxes may apply. You can cancel at any time as described at <strong>BILLING_PORTAL_URL</strong>.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>6) Intellectual Property</Typography>
          <Typography variant="body2">
            The service and all related IP are owned by <strong>COMPANY_NAME</strong> or its licensors. You receive a limited, revocable, non-transferable license to use the app in accordance with these Terms.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>7) User Content</Typography>
          <Typography variant="body2">
            You retain ownership of your content. You grant us a limited license to process it solely to operate and improve the service, as described in the Privacy/GDPR section.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>8) Service Changes</Typography>
          <Typography variant="body2">
            We may modify, suspend, or discontinue features with reasonable notice where practicable. If a change materially harms your paid use, you may terminate and request a pro‑rata refund (if applicable).
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>9) Warranties & Disclaimers</Typography>
          <Typography variant="body2">
            The service is provided "as is" and "as available" without warranties of any kind, to the maximum extent permitted by law.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>10) Liability</Typography>
          <Typography variant="body2">
            To the fullest extent permitted by law, <strong>COMPANY_NAME</strong> will not be liable for indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or goodwill. Our aggregate liability is limited to the greater of (a) the amount you paid in the 12 months before the claim, or (b) 50 EUR.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>11) Indemnity</Typography>
          <Typography variant="body2">
            You agree to defend and indemnify <strong>COMPANY_NAME</strong> from third‑party claims arising from your unlawful use of the service or violation of these Terms.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>12) Governing Law & Venue</Typography>
          <Typography variant="body2">
            These Terms are governed by the laws of <strong>GOVERNING_LAW_COUNTRY/STATE</strong>. Courts located in <strong>JURISDICTION_CITY/COUNTRY</strong> have exclusive jurisdiction, except where consumer law provides otherwise.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>13) Changes to These Terms</Typography>
          <Typography variant="body2">
            We may update these Terms from time to time. We will notify you in‑app or via email. Continued use after the effective date constitutes acceptance of the updated Terms.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>14) Contact</Typography>
          <Typography variant="body2">
            Questions about these Terms? Contact us at <MuiLink href="mailto:DPO_EMAIL">DPO_EMAIL</MuiLink>.
          </Typography>
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
