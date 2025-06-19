import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
    {
        icon: <SettingsSuggestRoundedIcon fontSize="large" />,
        title: 'Performance adaptable',
        description:
            'Notre outil s’adapte à vos processus pour vous offrir un gain de temps immédiat et une efficacité accrue.',
    },
    {
        icon: <ConstructionRoundedIcon fontSize="large" />,
        title: 'Pensé pour durer',
        description:
            'Un système robuste, fiable et évolutif, conçu pour accompagner votre croissance sur le long terme.',
    },
    {
        icon: <ThumbUpAltRoundedIcon fontSize="large" />,
        title: 'Expérience intuitive',
        description:
            'Une interface claire et simple, pensée pour une prise en main rapide par toutes les équipes.',
    },
    {
        icon: <AutoFixHighRoundedIcon fontSize="large" />,
        title: 'Fonctionnalités innovantes',
        description:
            'Des outils pensés pour répondre aux enjeux concrets des entreprises d’aujourd’hui.',
    },
    {
        icon: <SupportAgentRoundedIcon fontSize="large" />,
        title: 'Support réactif',
        description:
            'Une équipe à votre écoute pour vous accompagner à chaque étape de l’intégration et de l’usage.',
    },
    {
        icon: <QueryStatsRoundedIcon fontSize="large" />,
        title: 'Analyse et précision',
        description:
            'Une gestion fine des opportunités, avec un suivi précis et des indicateurs clairs pour piloter votre activité.',
    },
];

export default function Highlights() {
    return (
        <section className="bg-gray-900 text-white py-16 px-4" id="highlights">
            <div className="max-w-5xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                    Pourquoi choisir <span className="text-blue-400">Opportunity</span> ?
                </h2>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    Découvrez ce qui rend notre solution unique : <span className="text-white font-medium">souplesse, robustesse, simplicité, innovation</span>,
                    <span className="text-white font-medium"> accompagnement</span> et
                    <span className="text-white font-medium"> pilotage stratégique</span>.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out border border-gray-700"
                    >
                        <div className="mb-4 text-primary opacity-80">{item.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}