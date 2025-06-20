import React, { useEffect, useState } from 'react';
import SideMenu from './SideMenu';

type Devis = {
    title: string;
    url: string;
    email: string;
    requestId: string;
    createdAt: string;
};

const SavedDevisTable: React.FC = () => {
    const [devisList, setDevisList] = useState<Devis[]>([]);
    const [loadingPdf, setLoadingPdf] = useState<string | null>(null);
    const [pdfUrls, setPdfUrls] = useState<{ [requestId: string]: string }>({});

    useEffect(() => {
        fetch('http://localhost:3001/get-devis')
            .then(res => res.json())
            .then(data => {
                setDevisList(data);
            })
            .catch(err => console.error('Erreur chargement devis:', err));
    }, []);

    const handleFetchPdf = async (requestId: string) => {
        setLoadingPdf(requestId);
        try {
            const res = await fetch(`https://r4xmz3t1dg.execute-api.eu-west-1.amazonaws.com/dev/generate-devis?requestId=${requestId}`);
            const data = await res.json();
            if (data.pdfUrl) {
                setPdfUrls(prev => ({ ...prev, [requestId]: data.pdfUrl }));
                window.open(data.pdfUrl, '_blank');
            } else {
                alert('❌ PDF non disponible.');
            }
        } catch (err) {
            console.error(err);
            alert('❌ Erreur lors de la récupération du PDF.');
        } finally {
            setLoadingPdf(null);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideMenu />

            <div className="flex-grow p-8">
                <div className="max-w-screen-lg mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2"> Vos devis sauvegardés</h1>
                        <p className="text-gray-500">Consultez vos devis générés automatiquement à partir des offres</p>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-lg shadow border">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left">Titre</th>
                                <th className="px-4 py-3 text-left">Lien</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">PDF</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {devisList.map((devis, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{devis.title}</td>
                                    <td className="px-4 py-3">
                                        <a
                                            href={devis.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline text-xs"
                                        >
                                            Voir Annonce
                                        </a>
                                    </td>
                                    <td className="px-4 py-3">{devis.email}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
                                            onClick={() => handleFetchPdf(devis.requestId)}
                                            disabled={loadingPdf === devis.requestId}
                                        >
                                            {loadingPdf === devis.requestId ? 'Chargement...' : 'Voir PDF'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedDevisTable;
