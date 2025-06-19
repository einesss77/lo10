import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700 px-6 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                {/* Branding */}
                <div className="col-span-1 md:col-span-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Opportunity</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Votre allié pour <span className="font-medium">automatiser</span> la rédaction de vos
                        propositions <span className="font-medium">commerciales</span> et <span className="font-medium">techniques</span> avec l’IA.
                    </p>
                </div>

                {/* Navigation - Produit */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Produit</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="hover:underline">Fonctionnalités</a></li>
                        <li><a href="#" className="hover:underline">Témoignages</a></li>
                        <li><a href="#" className="hover:underline">Tarifs</a></li>
                    </ul>
                </div>

                {/* Navigation - Entreprise */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Entreprise</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="hover:underline">À propos</a></li>
                        <li><a href="#" className="hover:underline">Recrutement</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Navigation - Légal */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Légal</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="hover:underline">Mentions légales</a></li>
                        <li><a href="#" className="hover:underline">Confidentialité</a></li>
                        <li><a href="#" className="hover:underline">CGU</a></li>
                    </ul>
                </div>
            </div>

            {/* Base */}
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} <strong>Opportunity</strong>. Tous droits réservés.</p>
                <div className="flex space-x-4 mt-4 sm:mt-0">
                    <a href="#" aria-label="GitHub" className="hover:text-gray-700">
                        <i className="fab fa-github text-lg" />
                    </a>
                    <a href="#" aria-label="X" className="hover:text-gray-700">
                        <i className="fab fa-x-twitter text-lg" />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-gray-700">
                        <i className="fab fa-linkedin text-lg" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

