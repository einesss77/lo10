import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Features from "./Features";
import AppAppBar from "./AppAppAppBar";
import Highlights from "./Highlights";
import FAQ from "./FAQ";
import Footer from "./Footer";
import SideMenu from "./SideMenu";


const StyledBox = styled('div')(({ theme }) => ({
    alignSelf: 'center',
    width: '100%',
    height: 400,
    marginTop: theme.spacing(8),
    borderRadius: (theme.vars || theme).shape.borderRadius,
    outline: '6px solid',
    outlineColor: 'hsla(220, 25%, 80%, 0.2)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.grey[200],
    boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
    backgroundImage: `url(https://mui.com/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
    backgroundSize: 'cover',
    [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(10),
        height: 700,
    },
    ...theme.applyStyles?.('dark', {
        boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
        backgroundImage: `url(https://mui.com/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
        outlineColor: 'hsla(220, 20%, 42%, 0.1)',
        borderColor: (theme.vars || theme).palette.grey[700],
    }),
}));

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <Box
            id="hero"
            sx={(theme) => ({
                width: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundImage:
                    'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
                ...theme.applyStyles?.('dark', {
                    backgroundImage:
                        'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
                }),
            })}
        >

            <AppAppBar/>
            <AppAppBar />
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 16, sm: 24 },
                    pb: { xs: 12, sm: 16 },
                }}
            >
                <Stack
                    spacing={4}
                    useFlexGap
                    sx={{
                        alignItems: 'center',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                            fontWeight: 800,
                            lineHeight: 1.2,
                        }}
                    >
                        Découvrez{' '}
                        <Box
                            component="span"
                            sx={{
                                color: 'primary.main',
                                backgroundImage: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Opportunity
                        </Box>
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: '1.2rem', sm: '1.4rem' },
                            color: 'text.secondary',
                            maxWidth: '700px',
                            textAlign: 'center',
                            fontWeight: 300,
                            lineHeight: 1.7,
                        }}
                    >
                        Rédigez vos <Box component="span" fontWeight="bold">propositions commerciales</Box> et techniques avec style, <Box component="span" fontWeight="bold">simplicité</Box> et intelligence. L’IA au service de votre <Box component="span" fontWeight="bold">efficacité</Box>.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/content")}
                        sx={{
                            px: 6,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                        }}
                    >
                        Commencer
                    </Button>
                </Stack>
                <StyledBox id="image" />
            </Container>
            <div className="bg-red-600 text-white text-xl font-bold p-4 rounded mb-6 shadow-xl">
                ✅ TAILWIND FONCTIONNE
            </div>

            <Highlights/>
            <FAQ/>
            <Footer/>
        </Box>

    );
}
