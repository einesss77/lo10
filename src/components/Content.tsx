import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { SitemarkIcon } from './CustomIcons';

const items = [
    {
        icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Opportunités sur mesure',
        description:
            'Opportunity te propose chaque jour des missions adaptées à ton profil freelance, pour booster ton activité sans perte de temps.',
    },
    {
        icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Pensé pour durer',
        description:
            'Un système fiable, maintenu à jour, qui centralise et filtre les offres pour que tu te concentres uniquement sur ce qui compte : signer des contrats.',
    },
    {
        icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Expérience fluide',
        description:
            'Une interface simple et intuitive, qui te permet de consulter, trier et postuler aux offres en quelques clics.',
    },
    {
        icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Fonctionnalités intelligentes',
        description:
            'Simplifie la rédaction de propositions commerciales, techniques et de devis grâce à une IA spécialisée.',
    },
];

export default function Content() {
    return (
        <Stack
            sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
        >
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <SitemarkIcon />
            </Box>
            {items.map((item, index) => (
                <Stack key={index} direction="row" sx={{ gap: 2 }}>
                    {item.icon}
                    <div>
                        <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                            {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item.description}
                        </Typography>
                    </div>
                </Stack>
            ))}
        </Stack>
    );
}
