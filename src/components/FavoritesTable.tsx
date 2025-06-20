import React, { useEffect, useState } from 'react';
import SideMenu from './SideMenu';

type FavoriteOffer = {
    title: string;
    company: string;
    contractType: string;
    applyLink: string;
    createdAt: string;
};

const FavoritesTable: React.FC = () => {
    const [favorites, setFavorites] = useState<FavoriteOffer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/get-favorites')
            .then((res) => res.json())
            .then((data) => {
                setFavorites(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Erreur chargement favoris:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideMenu />

            <div className="flex-grow p-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2"> Vos offres en favoris</h1>
                        <p className="text-gray-500">Toutes les offres que vous avez mises de côté</p>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-600">Chargement...</p>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow border">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                <tr>
                                    {['Titre', 'Entreprise', 'Contrat', 'Date', 'Lien'].map((th) => (
                                        <th
                                            key={th}
                                            className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                                        >
                                            {th}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                {favorites.map((offer, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 font-semibold">{offer.title}</td>
                                        <td className="px-4 py-3">{offer.company}</td>
                                        <td className="px-4 py-3">{offer.contractType}</td>
                                        <td className="px-4 py-3">
                                            {new Date(offer.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <a
                                                href={offer.applyLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                                            >
                                                Lien
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavoritesTable;
