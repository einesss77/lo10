const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ======== ROUTES API ========

app.post('/save-devis', (req, res) => {
    const { requestId, title, url, email, createdAt } = req.body;

    if (!requestId || !title || !url || !email || !createdAt) {
        return res.status(400).json({ error: 'Champs manquants' });
    }

    try {
        const stmt = db.prepare(`
            INSERT INTO devis (requestId, title, url, email, createdAt)
            VALUES (?, ?, ?, ?, ?)
        `);
        stmt.run(requestId, title, url, email, createdAt);

        res.json({ message: 'Devis sauvegardé avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.get('/get-devis', (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM devis ORDER BY createdAt DESC').all();
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.post('/save-favorite', (req, res) => {
    const { title, company, contractType, applyLink, createdAt } = req.body;

    if (!title || !company || !contractType || !applyLink || !createdAt) {
        return res.status(400).json({ error: 'Champs manquants' });
    }

    try {
        const stmt = db.prepare(`
            INSERT INTO favorites (title, company, contractType, applyLink, createdAt)
            VALUES (?, ?, ?, ?, ?)
        `);
        stmt.run(title, company, contractType, applyLink, createdAt);

        res.json({ message: 'Offre ajoutée aux favoris !' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.get('/get-favorites', (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM favorites ORDER BY createdAt DESC').all();
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// ======== SERVIR LE FRONTEND REACT BUILDÉ ========

app.use(express.static(path.join(__dirname, 'public')));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// ======== LANCEMENT DU SERVEUR ========

app.listen(PORT, () => {
    console.log(`✅ Serveur backend lancé sur http://localhost:${PORT}`);
});
