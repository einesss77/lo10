const Database = require('better-sqlite3');
const db = new Database('devis.db');

// Crée la table si elle n'existe pas déjà
db.prepare(`
  CREATE TABLE IF NOT EXISTS devis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    requestId TEXT NOT NULL,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    email TEXT NOT NULL,
    createdAt TEXT NOT NULL
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    contractType TEXT NOT NULL,
    applyLink TEXT NOT NULL,
    createdAt TEXT NOT NULL
  )
`).run();

module.exports = db;
