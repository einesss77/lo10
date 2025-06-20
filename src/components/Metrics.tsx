import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { FaBriefcase, FaFileInvoice, FaHeart } from 'react-icons/fa';
import SideMenu from './SideMenu'; // ⚠️ adapte le chemin si nécessaire

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Offer = {
    title: string;
    company: string;
    contractType: string;
    createdAt: string;
    skills: string[];
    applyLink: string;
    source: string;
    category: string;
};

const DashboardWithMetrics = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [devisCount, setDevisCount] = useState(0);
    const [favoritesCount, setFavoritesCount] = useState(0);

    useEffect(() => {
        fetch('https://r4xmz3t1dg.execute-api.eu-west-1.amazonaws.com/dev/get-all-offers')
            .then((res) => res.json())
            .then((data) => {
                const parsed: Offer[] = data.map((item: any) => ({
                    title: item.title?.S || '',
                    company: item.company?.S || '',
                    contractType: item.contractType?.S || '',
                    createdAt: item.createdAt?.S || '',
                    skills: item.skills?.L?.map((s: any) => s.S) || [],
                    applyLink: item.applyLink?.S || '#',
                    source: item.source?.S || 'Inconnu',
                    category: item.category?.S || 'Autre',
                }));
                setOffers(parsed);
            });

        fetch('http://localhost:3001/get-devis')
            .then((res) => res.json())
            .then((data) => setDevisCount(data.length))
            .catch(() => setDevisCount(0));

        fetch('http://localhost:3001/get-favorites')
            .then((res) => res.json())
            .then((data) => setFavoritesCount(data.length))
            .catch(() => setFavoritesCount(0));
    }, []);

    const sourceData = offers.reduce((acc: Record<string, number>, o) => {
        acc[o.source] = (acc[o.source] || 0) + 1;
        return acc;
    }, {});

    const categoryData = offers.reduce((acc: Record<string, number>, o) => {
        acc[o.category] = (acc[o.category] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideMenu />

            <main className="flex-1 p-6 max-w-screen-xl mx-auto font-sans text-gray-800 space-y-12">

                {/* Titre et texte */}
                <div className="text-center mt-12">
                    <h2 className="text-2xl font-semibold text-gray-800">Analyse des opportunités</h2>
                    <p className="text-gray-500 mt-1">
                        Visualisez la répartition des offres par source et par catégorie
                    </p>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white shadow rounded p-5 text-center space-y-1">
                        <FaBriefcase className="text-2xl text-blue-600 mx-auto" />
                        <h3 className="text-sm text-gray-500">Total Offres</h3>
                        <p className="text-2xl font-bold text-blue-600">{offers.length}</p>
                    </div>
                    <div className="bg-white shadow rounded p-5 text-center space-y-1">
                        <FaFileInvoice className="text-2xl text-green-600 mx-auto" />
                        <h3 className="text-sm text-gray-500">Devis envoyés</h3>
                        <p className="text-2xl font-bold text-green-600">{devisCount}</p>
                    </div>
                    <div className="bg-white shadow rounded p-5 text-center space-y-1">
                        <FaHeart className="text-2xl text-pink-600 mx-auto" />
                        <h3 className="text-sm text-gray-500">Offres favorites</h3>
                        <p className="text-2xl font-bold text-pink-600">{favoritesCount}</p>
                    </div>
                </div>

                {/* Graphiques */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white shadow rounded p-6">
                        <h3 className="text-lg font-semibold mb-4">Offres par source</h3>
                        <Bar
                            data={{
                                labels: Object.keys(sourceData),
                                datasets: [{
                                    label: 'Nombre d\'offres',
                                    data: Object.values(sourceData),
                                    backgroundColor: '#3b82f6',
                                }],
                            }}
                            options={{
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: { beginAtZero: true },
                                    x: { ticks: { color: '#1f2937' } },
                                },
                            }}
                        />
                    </div>

                    <div className="bg-white shadow rounded p-6">
                        <h3 className="text-lg font-semibold mb-4">Offres par catégorie</h3>
                        <Bar
                            data={{
                                labels: Object.keys(categoryData),
                                datasets: [{
                                    label: 'Offres',
                                    data: Object.values(categoryData),
                                    backgroundColor: '#60a5fa',
                                }],
                            }}
                            options={{
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: { beginAtZero: true },
                                    x: { ticks: { color: '#1f2937' } },
                                },
                            }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardWithMetrics;
