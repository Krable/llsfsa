const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const pg = require("pg");

// Configuration de la base de données
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "moviesdb",
  password: "password",
  port: 5432,
});

// Endpoint pour récupérer tous les films
app.get("/movies", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM movies");
    const movies = result.rows;
    res.json(movies);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(filePath);
});

// Démarrage du serveur
app.listen(port, () => {
  console.log("Server is listening on port 3000");
});
