import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppAppBar from "./components/AppAppAppBar";
import SideMenu from './components/SideMenu';
import OffersTable from './components/OffersTable';
import Footer from './components/Footer';
import AppTheme from './theme/AppTheme'; // garde ceci si AppTheme.tsx existe bien

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />

                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                    })}
                >
                    <Stack spacing={2} sx={{ mx: 3, mt: { xs: 8, md: 0 }, flexGrow: 1 }}>
                        <OffersTable />
                    </Stack>
                    <Footer />
                </Box>
            </Box>
        </AppTheme>
    );
}
