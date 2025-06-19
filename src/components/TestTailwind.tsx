import React from 'react';

export default function TestTailwind() {
    return (
        <div className="min-h-screen bg-red-600 text-white flex flex-col items-center justify-center p-8">

            <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
                ✅ TAILWIND FONCTIONNE PARFAITEMENT
            </h1>
            <p className="text-lg text-gray-700 mb-6">
                Ceci est une page test indépendante pour valider ton setup Tailwind.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {['Rapide', 'Stylé', 'Modulaire'].map((el, i) => (
                    <div key={i}
                         className="bg-white p-6 rounded-lg shadow hover:shadow-lg border border-gray-200 text-center">
                        <h2 className="text-xl font-bold text-indigo-500 mb-2">{el}</h2>
                        <p className="text-gray-500 text-sm">Tout fonctionne, tu peux respirer ✨</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
