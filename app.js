const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

// Connexion à la base de données MariaDB
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ma_base_de_donnees'
});

// Route GET pour récupérer tous les films de la base de données
app.get('/films', (req, res) => {
  const query = 'SELECT * FROM films';
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  });
});

// Route GET pour récupérer un film en particulier par son ID
app.get('/films/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM films WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else if (results.length === 0) {
      res.status(404).send('Film not found');
    } else {
      res.send(results[0]);
    }
  });
});

// Route POST pour ajouter un nouveau film à la base de données
app.post('/films', (req, res) => {
  const film = req.body;
  const query = 'INSERT INTO films (nom, date, image, netflix, amazon) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [film.nom, film.date, film.image, film.netflix, film.amazon], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      film.id = result.insertId;
      res.status(201).send(film);
    }
  });
});

// Route PUT pour mettre à jour un film existant dans la base de données
app.put('/films/:id', (req, res) => {
  const id = req.params.id;
  const film = req.body;
  const query = 'UPDATE films SET nom = ?, date = ?, image = ?, netflix = ?, amazon = ? WHERE id = ?';
  connection.query(query, [film.nom, film.date, film.image, film.netflix, film.amazon, id], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else if (result.affectedRows === 0) {
      res.status(404).send('Film not found');
    } else {
      film.id = id;
      res.send(film);
    }
  });
});

// Route DELETE pour supprimer un film de la base de données
app.delete('/films/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM films WHERE id = ?';
  connection.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else if (result.affectedRows === 0) {
      res.status(404).send('Film not found');
    } else {
      res.status(204).send();
    }
  });
});

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
