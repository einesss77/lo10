import React, { useEffect, useState } from 'react';

export default function FooterInCache() {
    const [html, setHtml] = useState('');

    useEffect(() => {
        fetch('https://d3teqlcmywg4bu.cloudfront.net/footer.html')
            .then((res) => res.text())
            .then((data) => setHtml(data))
            .catch((err) => console.error('Erreur chargement footer:', err));
    }, []);

    return (
        <div
            className="footer"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}