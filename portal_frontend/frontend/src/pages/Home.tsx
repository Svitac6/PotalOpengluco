import logo from "../assets/logo.svg";
import { Button, useTheme } from "@mui/material";
import { Card, CardContent, CardHeader, Typography, Chip, Stack, Divider, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import TimelineIcon from "@mui/icons-material/Timeline";
import ShareIcon from "@mui/icons-material/Share";
import SecurityIcon from "@mui/icons-material/Security";
import AccessTimeIcon from "@mui/icons-material/AccessTime";


const Home: React.FC = () => {
  const featureItems = [
    { icon: <TimelineIcon sx={{ color: "#4ade80" }} />, text: "Real-time tracking" },
    { icon: <ShareIcon sx={{ color: "#60a5fa" }} />, text: "Share with healthcare providers" },
    { icon: <SecurityIcon sx={{ color: "#a78bfa" }} />, text: "Security & privacy guaranteed" },
  ];

  const sensors = [
    { label: "Freestyle Libre", color: "#f59e0b", available: true, icon: <CheckCircleIcon /> },
    { label: "Dexcom", color: "#22c55e", available: true, icon: <CheckCircleIcon /> },
    { label: "Medtronic", color: "#3b82f6", available: false, note: "Coming soon", icon: <AccessTimeIcon /> },
  ];



  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: `radial-gradient(1200px 900px at 10% -10%, rgba(99,102,241,0.25), transparent 60%),
                     radial-gradient(800px 700px at 90% 10%, rgba(236,72,153,0.25), transparent 60%),
                     linear-gradient(180deg, #0b0b10 0%, #12121a 100%)`,
        filter: theme.palette.mode === 'light' ? 'invert(1)' : 'none',
        overflow: "hidden",
      }}
    >
      <Box sx={{ filter: theme.palette.mode === 'light' ? 'invert(1)' : 'none' }} >
        {/* Barre en haut avec Login / Sign Up */}
        <Box
          sx={{
            position: 'absolute',
            top: theme => ({ xs: theme.spacing(2), md: theme.spacing(6) }),
            right: theme => ({ xs: theme.spacing(2), md: theme.spacing(8) }),
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: theme => theme.spacing(2),
            py: { xs: 2, md: 0 }
          }}
        >
          <Button
            variant="text"
            sx={{ textTransform: "none", fontSize: { xs: "0.95rem", md: "1rem" } }}
            href="/login"
          >
            Login
          </Button>

          <Button
            variant="contained"
            sx={{
              fontWeight: 600,
              textTransform: "none",
              px: { xs: 2, md: 3 },
              py: { xs: 1, md: 1.25 }
            }}
            href="/signup"
          >
            Sign Up
          </Button>
        </Box>


        <Box
          component="header"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            px: { xs: 3, sm: 5, md: '70px' },
            pt: { xs: 6, md: '70px' },
            pb: { xs: 6, md: 0 },
            height: { xs: 'auto', md: '100vh' },
            minHeight: { xs: '70vh', md: '100vh' },
            justifyContent: 'center',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'center', md: 'flex-end' },
              justifyContent: { xs: 'center', md: 'flex-start' },
              mb: { xs: 4, md: 10 },
              flexWrap: 'wrap'
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: { xs: 72, sm: 100, md: 144 },
                height: { xs: 72, sm: 100, md: 144 },
                objectFit: 'contain',
                filter: theme.palette.mode === 'light' ? 'invert(1)' : 'none'
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontWeight: 'bold',
                lineHeight: 1,
                fontSize: { xs: '3.5rem', sm: '5rem', md: '6rem' },
                letterSpacing: { xs: 0, md: '-0.02em' }
              }}
            >
              penGluco
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3.75rem' },
              lineHeight: { xs: 1.25, md: 1.1 },
              ml: { xs: 0, md: 3 },
              px: { xs: 1, md: 0 }
            }}
          >
            Your{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                whiteSpace: { xs: 'nowrap', sm: 'normal' },
              }}
            >
              glucose
            </Box>{' '}
            . Your{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(to right, #4ade80, #14b8a6, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                whiteSpace: { xs: 'nowrap', sm: 'normal' },
              }}
            >
              data
            </Box>{' '}
            . One{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(to right, #facc15, #f97316, #ef4444)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                whiteSpace: { xs: 'nowrap', sm: 'normal' },
              }}
            >
              platform
            </Box>
            .
          </Typography>
        </Box>

        <Box sx={{ pb: { xs: 10, md: 20 }, px: { xs: 2, sm: 4 } }}>
          <Card
            elevation={8}
            sx={{
              maxWidth: { xs: '100%', sm: 900, lg: 1500 },
              mx: "auto",
              p: { xs: 2.5, sm: 4, md: 5 },
              borderRadius: { xs: 3, md: 5 },
              background:
                "linear-gradient(145deg, rgba(58,123,213,0.12), rgba(0,210,255,0.06) 45%, rgba(167,139,250,0.08))",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
            }}
          >
            <CardHeader
              avatar={
                <DevicesOtherIcon
                  sx={{
                    borderRadius: "50%",
                    padding: 0.6,
                    fontSize: { xs: 36, md: 50 },
                  }}
                />
              }
              title="Connected to your sensors"
              subheader="Broad Compatibility"
              sx={{
                p: { xs: 2, md: 3 },
                '& .MuiCardHeader-title': {
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  fontWeight: 700,
                },
                '& .MuiCardHeader-subheader': {
                  fontSize: { xs: '0.9rem', md: '1rem' },
                }
              }}
            />

            <CardContent sx={{ pt: 0 }}>
              <Typography
                variant="h5"
                sx={{
                  mb: { xs: 1.5, md: 2 },
                  fontWeight: 700,
                  lineHeight: 1.4,
                  fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.35rem' },
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                Real-time tracking • Share with healthcare providers • Security & privacy guaranteed
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: { xs: 3, md: 4 },
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  lineHeight: 1.7,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                OpenGluco is a secure platform that gathers data from all your glucose sensors to give you a clear
                and complete view of your glucose levels — anytime, anywhere.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                divider={
                  <Divider
                    flexItem
                    orientation="vertical"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  />
                }
                sx={{ mb: 4, alignItems: { xs: 'flex-start', sm: 'center' } }}
              >
                {featureItems.map((item, i) => (
                  <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        background:
                          i === 0
                            ? "linear-gradient(135deg, #22c55e22, #22c55e11)"
                            : i === 1
                              ? "linear-gradient(135deg, #3b82f622, #3b82f611)"
                              : "linear-gradient(135deg, #a78bfa22, #a78bfa11)",
                        borderRadius: "50%",
                        p: 0.6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography sx={{ fontWeight: 500, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                      {item.text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1.5,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                Compatible sensors
              </Typography>

              <Stack
                direction="row"
                spacing={1.5}
                flexWrap="wrap"
                useFlexGap
                sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
              >
                {sensors.map((sensor, i) => (
                  <Chip
                    key={i}
                    icon={sensor.icon}
                    label={sensor.available ? sensor.label : `${sensor.label} (${sensor.note})`}
                    variant="outlined"
                    disabled={!sensor.available}
                    sx={{
                      color: sensor.color,
                      borderColor: sensor.color,
                      backgroundColor: sensor.available ? `${sensor.color}14` : `${sensor.color}0A`,
                      "& .MuiChip-icon": { color: sensor.color },
                      "&:hover": {
                        backgroundColor: sensor.available ? `${sensor.color}22` : `${sensor.color}0C`,
                        borderColor: sensor.color,
                      },
                    }}
                  />
                ))}


              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
