import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { useNavigate, useLocation } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OptionsMenu from './OptionsMenu';

import {
    FaHome,
    FaChartBar,
    FaFileAlt,
    FaHeart,
    FaTasks,
} from 'react-icons/fa';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: '#fff',
    },
}));

const menuItems = [
    { label: 'Dashboard', icon: <FaHome />, path: '/dashboard' },
    { label: 'Analytics', icon: <FaChartBar />, path: '/analytics' },
    { label: 'Devis envoyés', icon: <FaFileAlt />, path: '/devis' },
    { label: 'Favoris', icon: <FaHeart />, path: '/favorites' },
    { label: 'Kanban', icon: <FaTasks />, path: '/kanban' },
];

export default function SideMenu() {
    const user = JSON.parse(localStorage.getItem('googleUser') || 'null');
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Drawer variant="permanent">
            <Box>
                {/* Logo */}
                <Box sx={{p: 2, display: 'flex', justifyContent: 'center'}}>
                    <img
                        src="/src/img/PTN.png"
                        alt="PTN Logo"
                        style={{width: '80px', height: 'auto'}}
                    />
                </Box>

                <Divider/>

                {/* Navigation */}
                <List>
                {menuItems.map((item) => (
                        <ListItemButton
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            selected={location.pathname === item.path}
                            sx={{
                                py: 1,
                                px: 3,
                                '&.Mui-selected': {
                                    backgroundColor: '#f3f4f6',
                                    borderLeft: '4px solid #3b82f6',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: '#4b5563', minWidth: 32 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontSize: 14,
                                    color: '#374151',
                                    fontWeight: 500,
                                }}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Box>

            {/* Footer user info */}
            {user && (
                <Box sx={{ borderTop: '1px solid #e5e7eb', p: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar alt={user.name} src={user.picture} sx={{ width: 36, height: 36 }} />
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2" fontWeight={500}>
                                {user.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {user.email}
                            </Typography>
                        </Box>
                        <OptionsMenu />
                    </Stack>
                </Box>
            )}
        </Drawer>
    );
}
