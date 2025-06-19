import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.6),
    boxShadow: theme.shadows[1],
    padding: '8px 16px',
}));

export default function AppAppBar() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

    return (
        <AppBar position="fixed" enableColorOnDark sx={{ boxShadow: 0, bgcolor: 'transparent', mt: '24px' }}>
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    {/* Menu principal */}
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                            {['Fonctionnalités', 'Témoignages', 'Atouts', 'Tarifs', 'FAQ', 'Blog'].map((label) => (
                                <Button
                                    key={label}
                                    variant="text"
                                    color="inherit"
                                    size="small"
                                    sx={{ fontSize: '0.95rem', color: '#1976d2', fontWeight: 500 }}
                                >
                                    {label}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    {/* Bouton Commencer */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            variant="contained"
                            size="medium"
                            sx={{
                                textTransform: 'none',
                                fontWeight: '600',
                                borderRadius: '9999px',
                                px: 3,
                                fontSize: '1rem',
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#1565c0',
                                },
                            }}
                        >
                            Commencer gratuitement
                        </Button>
                    </Box>

                    {/* Menu mobile */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                {['Fonctionnalités', 'Témoignages', 'Atouts', 'Tarifs', 'FAQ', 'Blog'].map((label) => (
                                    <MenuItem key={label}>{label}</MenuItem>
                                ))}
                                <MenuItem sx={{ mt: 2 }}>
                                    <Button fullWidth variant="contained" sx={{ borderRadius: '9999px' }}>
                                        Commencer gratuitement
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
