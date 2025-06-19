import React, { useEffect, useState } from 'react';

const OffersTable1 = () => {
    const [offers, setOffers] = useState([]);
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
            .then(response => response.json())
            .then(data => {
                const parsed = data.map(item => ({
                    title: item.title?.S,
                    company: item.company?.S,
                    contractType: item.contractType?.S,
                    location: item.location?.S,
                    createdAt: item.createdAt?.S,
                    skills: item.skills?.L ? item.skills.L.map(skill => skill.S) : [],
                    applyLink: item.applyLink?.S
                }));
                setOffers(parsed);
            })
            .catch(error => console.error('Erreur de chargement des offres:', error));
    }, []);

    const filterOffers = (data) => {
        return data.filter(offer => {
            const matchTitle = offer.title?.toLowerCase().includes(filters.title.toLowerCase());
            const matchCompany = offer.company?.toLowerCase().includes(filters.company.toLowerCase());
            const matchContract = !filters.contractType || offer.contractType === filters.contractType;
            const matchLocation = !filters.location || offer.location === filters.location;
            const matchSkills = !filters.skills || offer.skills.some(skill =>
                skill.toLowerCase().includes(filters.skills.toLowerCase())
            );

            const offerDate = new Date(offer.createdAt);
            const startDate = filters.startDate ? new Date(filters.startDate) : null;
            const endDate = filters.endDate ? new Date(filters.endDate) : null;

            const matchDate =
                (!startDate || offerDate >= startDate) &&
                (!endDate || offerDate <= endDate);

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
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Liste des Offres</h2>

            {/* Filtres */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="Titre"
                    className="border px-3 py-2 rounded"
                    value={filters.title}
                    onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Entreprise"
                    className="border px-3 py-2 rounded"
                    value={filters.company}
                    onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                />
                <select
                    className="border px-3 py-2 rounded"
                    value={filters.contractType}
                    onChange={(e) => setFilters({ ...filters, contractType: e.target.value })}
                >
                    <option value="">Type de contrat</option>
                    <option value="Freelance">Freelance</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage">Stage</option>
                </select>
                <select
                    className="border px-3 py-2 rounded"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                >
                    <option value="">Localisation</option>
                    <option value="Remote">Remote</option>
                    <option value="Paris">Paris</option>
                    <option value="Lyon">Lyon</option>
                    {/* Ajoute d'autres si tu veux */}
                </select>
                <input
                    type="text"
                    placeholder="Compétences (ex: React)"
                    className="border px-3 py-2 rounded"
                    value={filters.skills}
                    onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
                />
                <div className="flex gap-2">
                    <input
                        type="date"
                        className="border px-2 py-2 rounded w-full"
                        value={filters.startDate}
                        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                    />
                    <input
                        type="date"
                        className="border px-2 py-2 rounded w-full"
                        value={filters.endDate}
                        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                    />
                </div>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
                <table className="border border-red-500">

                    <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Titre</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Entreprise
                            fdp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contrat</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Localisation</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Compétences</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Lien</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {currentOffers.map((offer, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition duration-150">
                            <td className="px-6 py-4 font-medium text-gray-800">{offer.title}</td>
                            <td className="px-6 py-4 text-gray-700">{offer.company}</td>
                            <td className="px-6 py-4">
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              {offer.contractType}
            </span>
                            </td>
                            <td className="px-6 py-4 text-gray-700">{offer.location}</td>
                            <td className="px-6 py-4 text-gray-600 max-w-md truncate" title={offer.skills.join(', ')}>
                                {offer.skills.slice(0, 6).join(', ')}{offer.skills.length > 6 && '...'}
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                                {new Date(offer.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                <a
                                    href={offer.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-md"
                                >
                                    Postuler
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center gap-2">
                <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    Précédent
                </button>
                <span className="px-4 py-1">Page {currentPage} / {totalPages}</span>
                <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default OffersTable1;
