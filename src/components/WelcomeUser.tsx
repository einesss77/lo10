// src/pages/WelcomeUser.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const WelcomeUser = () => {
    const location = useLocation();
    const user = location.state?.user;

    if (!user) {
        return <p>Aucun utilisateur connecté.</p>;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Bienvenue, {user.name}</h1>
            <img src={user.picture} alt="profil" style={{ borderRadius: '50%', width: 100 }} />
            <p>{user.email}</p>
        </div>
    );
};

export default WelcomeUser;
