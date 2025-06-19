import * as React from 'react';
import {useState} from "react";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const faqData = [
    {
        question: "Comment contacter l'équipe Opportunity en cas de besoin ?",
        answer: "Vous pouvez nous écrire à l'adresse contact@opportunity.ai ou utiliser le formulaire dans votre tableau de bord pour un support prioritaire."
    },
    {
        question: "Puis-je essayer Opportunity gratuitement ?",
        answer: "Oui, vous bénéficiez d'une période d’essai gratuite de 14 jours sans carte bancaire. Lancez-vous dès maintenant sans engagement."
    },
    {
        question: "Que faire si l'outil ne correspond pas à mes besoins ?",
        answer: "Vous pouvez résilier à tout moment depuis votre espace client. Aucun frais ne sera facturé si vous annulez avant la fin de l'essai."
    },
    {
        question: "Opportunity est-il adapté aux petites entreprises ?",
        answer: "Oui, notre solution est conçue pour s’adapter aux besoins des indépendants, TPE et PME avec des outils simples mais puissants."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setActiveIndex(prev => (prev === index ? null : index));
    };

    return (
        <div id="faq" className="bg-white text-gray-800 py-20 px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Foire aux questions</h2>
                <p className="text-gray-600 text-lg">
                    Voici les réponses aux questions fréquentes sur Opportunity.
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqData.map((item, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                        <button
                            className="w-full text-left px-6 py-4 font-medium text-lg focus:outline-none flex justify-between items-center"
                            onClick={() => toggle(index)}
                        >
                            <span>{item.question}</span>
                            <span className="text-blue-500 font-bold text-xl">{activeIndex === index ? "−" : "+"}</span>
                        </button>
                        {activeIndex === index && (
                            <div className="px-6 pb-4 text-gray-700 text-sm leading-relaxed">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}