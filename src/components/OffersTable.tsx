import * as React from 'react';
import {useEffect, useState} from "react";
type Offer = {
    title: string;
    company: string;
    contractType: string;
    location: string;
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
        location: '',
        skills: '',
        startDate: '',
        endDate: '',
    });

    const offersPerPage = 50;

    useEffect(() => {
        fetch('https://r4xmz3t1dg.execute-api.eu-west-1.amazonaws.com/dev/get-all-offers')
            .then((res) => res.json())
            .then((data) => {
                const parsed: Offer[] = data.map((item: any) => ({
                    title: item.title?.S || '',
                    company: item.company?.S || '',
                    contractType: item.contractType?.S || '',
                    location: item.location?.S || '',
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
            const matchLocation = !filters.location || offer.location === filters.location;
            const matchSkills =
                !filters.skills ||
                offer.skills.some((skill) => skill.toLowerCase().includes(filters.skills.toLowerCase()));

            const offerDate = new Date(offer.createdAt);
            const startDate = filters.startDate ? new Date(filters.startDate) : null;
            const endDate = filters.endDate ? new Date(filters.endDate) : null;
            const matchDate =
                (!startDate || offerDate >= startDate) && (!endDate || offerDate <= endDate);

            return matchTitle && matchCompany && matchContract && matchLocation && matchSkills && matchDate;
        });
    };

    const filteredOffers = filterOffers(offers);
    const totalPages = Math.ceil(filteredOffers.length / offersPerPage);
    const currentOffers = filteredOffers.slice(
        (currentPage - 1) * offersPerPage,
        currentPage * offersPerPage
    );

    return (
        <div className="p-6 max-w-screen-xl mx-auto font-sans text-gray-800">
            <h2 className="text-3xl font-bold mb-6"> Offres Disponibles</h2>

            {/* Filtres */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 bg-white p-4 rounded-lg shadow">
                <input type="text" placeholder="Titre" value={filters.title} onChange={(e) => setFilters({ ...filters, title: e.target.value })} className="input" />
                <input type="text" placeholder="Entreprise" value={filters.company} onChange={(e) => setFilters({ ...filters, company: e.target.value })} className="input" />
                <select value={filters.contractType} onChange={(e) => setFilters({ ...filters, contractType: e.target.value })} className="input">
                    <option value="">Type de contrat</option>
                    <option value="Freelance">Freelance</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage">Stage</option>
                </select>
                <select value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} className="input">
                    <option value="">Localisation</option>
                    <option value="Remote">Remote</option>
                    <option value="Paris">Paris</option>
                    <option value="Lyon">Lyon</option>
                </select>
                <input type="text" placeholder="Compétences (ex: React)" value={filters.skills} onChange={(e) => setFilters({ ...filters, skills: e.target.value })} className="input" />
                <div className="flex gap-2">
                    <input type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} className="input w-full" />
                    <input type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} className="input w-full" />
                </div>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto bg-white rounded-lg shadow border">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                        {['Titre', 'Entreprise', 'Contrat', 'Localisation', 'Compétences', 'Date', 'Lien'].map((th) => (
                            <th key={th} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{th}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {currentOffers.map((offer, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3 font-semibold">{offer.title}</td>
                            <td className="px-4 py-3">{offer.company}</td>
                            <td className="px-4 py-3"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">{offer.contractType}</span></td>
                            <td className="px-4 py-3">{offer.location}</td>
                            <td className="px-4 py-3 truncate max-w-xs" title={offer.skills.join(', ')}>{offer.skills.slice(0, 5).join(', ')}{offer.skills.length > 5 && '...'}</td>
                            <td className="px-4 py-3">{new Date(offer.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-3"><a href={offer.applyLink} target="_blank" rel="noopener noreferrer" className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded">Postuler</a></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-4">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">Précédent</button>
                <span className="text-sm mt-2">Page {currentPage} / {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">Suivant</button>
            </div>
        </div>
    );
};

export default OffersTable;
