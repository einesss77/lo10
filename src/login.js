// src/Login.js
import React from "react";

const Login = () => {
    const handleLogin = async () => {
        try {
            const response = await fetch("https://gt0j9w7qg8.execute-api.eu-west-1.amazonaws.com/", {
                method: "GET"
                    });


            const data = await response.json();
            console.log("Réponse backend:", data);

            // Si le backend te renvoie un token ou redirige, gère ça ici
            // localStorage.setItem('token', data.token);
        } catch (err) {
            console.error("Erreur lors de la connexion:", err);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <button onClick={handleLogin}>Se connecter avec Google</button>
        </div>
    );
};

export default Login;
