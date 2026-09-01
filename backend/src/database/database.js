const Database = require("better-sqlite3");

const db = new Database("catalogo.db");

module.exports = db;