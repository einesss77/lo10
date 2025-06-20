import * as React from 'react';
import { useEffect, useState } from 'react';

type Offer = {
    title: string;
    company: string;
    contractType: string;
    createdAt: string;
    skills: string[];
    applyLink: string;
};

const OffersTable: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        title: '',
        company: '',
        contractType: '',
        skills: '',
        startDate: '',
        endDate: '',
    });

    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState('');

    const offersPerPage = 50;

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
                }));
                setOffers(parsed);
            });
    }, []);

    const filterOffers = (data: Offer[]) => {
        return data.filter((offer) => {
            const matchTitle = offer.title.toLowerCase().includes(filters.title.toLowerCase());
            const matchCompany = offer.company.toLowerCase().includes(filters.company.toLowerCase());
            const matchContract = !filters.contractType || offer.contractType === filters.contractType;
            const matchSkills =
                !filters.skills ||
                offer.skills.some((skill) => skill.toLowerCase().includes(filters.skills.toLowerCase()));

            const offerDate = new Date(offer.createdAt);
            const startDate = filters.startDate ? new Date(filters.startDate) : null;
            const endDate = filters.endDate ? new Date(filters.endDate) : null;
            const matchDate =
                (!startDate || offerDate >= startDate) && (!endDate || offerDate <= endDate);

            return matchTitle && matchCompany && matchContract && matchSkills && matchDate;
        });
    };

    const handleAddToFavorites = async (offer: Offer) => {
        try {
            const res = await fetch('http://localhost:3001/save-favorite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: offer.title,
                    company: offer.company,
                    contractType: offer.contractType,
                    applyLink: offer.applyLink,
                    createdAt: offer.createdAt,
                }),
            });

            if (res.ok) {
                alert('✅ Offre ajoutée aux favoris');
            } else {
                alert('❌ Erreur lors de l’ajout aux favoris');
            }
        } catch (err) {
            console.error('Erreur:', err);
            alert('❌ Erreur réseau');
        }
    };


    const handleSend = async () => {
        if (!selectedOffer || !email) return;

        setSending(true);
        setMessage('');

        try {
            const res = await fetch('https://r4xmz3t1dg.execute-api.eu-west-1.amazonaws.com/dev/generate-devis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: selectedOffer.title,
                    email: email,
                    url: selectedOffer.applyLink,
                }),
            });

            const result = await res.json();

            if (res.ok && result.requestId) {
                // ➕ Sauvegarde dans la BDD locale
                await fetch('http://localhost:3001/save-devis', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        requestId: result.requestId,
                        title: selectedOffer.title,
                        url: selectedOffer.applyLink,
                        email: email,
                        createdAt: new Date().toISOString(),
                    }),
                });

                setMessage('✅ Devis envoyé et sauvegardé !');
                setEmail('');
                setSelectedOffer(null);
            } else {
                setMessage('❌ Erreur lors de l’envoi du devis.');
            }
        } catch (err) {
            console.error(err);
            setMessage('❌ Erreur réseau.');
        }

        setSending(false);
    };

    const filteredOffers = filterOffers(offers);
    const totalPages = Math.ceil(filteredOffers.length / offersPerPage);
    const currentOffers = filteredOffers.slice(
        (currentPage - 1) * offersPerPage,
        currentPage * offersPerPage
    );

    return (
        <div className="p-6 max-w-screen-xl mx-auto font-sans text-gray-800">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Tableau de bord Opportunity</h1>
                <p className="text-gray-600 mt-1">Suivez ici toutes les offres, devis générés et vos favoris en un clin
                    d'œil.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 bg-white p-4 rounded-lg shadow">
                <input type="text" placeholder="Titre" value={filters.title}
                       onChange={(e) => setFilters({...filters, title: e.target.value})} className="input" />
                <input type="text" placeholder="Entreprise" value={filters.company} onChange={(e) => setFilters({ ...filters, company: e.target.value })} className="input" />
                <select value={filters.contractType} onChange={(e) => setFilters({ ...filters, contractType: e.target.value })} className="input">
                    <option value="">Type de contrat</option>
                    <option value="Freelance">Freelance</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage">Stage</option>
                </select>
                <input type="text" placeholder="Compétences" value={filters.skills} onChange={(e) => setFilters({ ...filters, skills: e.target.value })} className="input" />
                <input type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} className="input" />
                <input type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} className="input" />
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow border">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                        {['Titre', 'Entreprise', 'Contrat', 'Compétences', 'Date', 'Lien', 'Devis'].map((th) => (
                            <th key={th} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{th}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {currentOffers.map((offer, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3 font-semibold">{offer.title}</td>
                            <td className="px-4 py-3">{offer.company}</td>
                            <td className="px-4 py-3">{offer.contractType}</td>
                            <td className="px-4 py-3 truncate max-w-xs">{offer.skills.join(', ')}</td>
                            <td className="px-4 py-3">{new Date(offer.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-3">
                                <a href={offer.applyLink} target="_blank" rel="noopener noreferrer"
                                   className="text-xs bg-indigo-600 text-white px-3 py-1 rounded">Lien</a>
                            </td>
                            <td className="px-4 py-3">
                                <button onClick={() => setSelectedOffer(offer)}
                                        className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600">Générer
                                    devis
                                </button>
                            </td>
                            <td className="px-4 py-3">
                                <button
                                    onClick={() => handleAddToFavorites(offer)}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                                >
                                    Ajouter
                                </button>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-center gap-4">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">Précédent</button>
                <span className="text-sm mt-2">Page {currentPage} / {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">Suivant</button>
            </div>

            {selectedOffer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Générer un devis</h3>
                        <p className="mb-2"><strong>Nom du projet :</strong> {selectedOffer.title}</p>
                        <p className="mb-2"><strong>Lien :</strong> <a href={selectedOffer.applyLink} className="text-blue-600 underline" target="_blank" rel="noreferrer">{selectedOffer.applyLink}</a></p>
                        <input
                            type="email"
                            placeholder="Votre adresse email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input w-full mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setSelectedOffer(null)} className="px-4 py-2 bg-gray-300 rounded">Annuler</button>
                            <button onClick={handleSend} disabled={sending} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                {sending ? 'Envoi...' : 'Envoyer'}
                            </button>
                        </div>
                        {message && <p className="mt-4 text-sm text-center">{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OffersTable;
