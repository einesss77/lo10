import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const mainListItems = [
    { text: 'Tableau de bord', icon: <HomeRoundedIcon /> },
    { text: 'Projets scrapés', icon: <AssignmentRoundedIcon /> },
    { text: 'Offres envoyées', icon: <SendRoundedIcon /> },
];

const secondaryListItems = [
    { text: 'Paramètres', icon: <SettingsRoundedIcon /> },
    { text: 'À propos', icon: <InfoRoundedIcon /> },
];

export default function MenuContent() {
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton selected={index === 0}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}
