import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuContent from './MenuContent';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function SideMenu() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', md: 'block' },
            }}
        >
            <Box sx={{ p: 2, fontWeight: 'bold', fontSize: '1.1rem' }}>
                360Kopilot
            </Box>
            <Divider />
            <Box
                sx={{
                    overflow: 'auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <MenuContent />
            </Box>
        </Drawer>
    );
}
