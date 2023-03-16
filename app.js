const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const pg = require("pg");
// Configuration de la base de données
const pool = new pg.Pool({
  user: "llsfsa_user",
  host: "dpg-cg4vouceoogtrlv5l9l0-a",
  database: "llsfsa",
  password: "dbItIvpt4oSbR8UcD9qppAfTfVX10R27",
  port: 5432,
});
const bcrypt = require("bcrypt");
const passport = require("passport");
const initialize = require("./auth.js");
initialize(passport);

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup", { message: req.flash("signupMessage") });
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

app.use(express.static("public"));
// Endpoint pour récupérer tous les films
app.get("/movies", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM films");
    const movies = result.rows;
    res.json(movies);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.get("/createuser", (req, res) => {
  const createUser = async (username, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
        [username, hashedPassword]
      );
      const userId = result.rows[0].id;
      client.release();
      return userId;
    } catch (error) {
      console.error(error);
    }
  };
  createUser("krable", "123456");
  res.send("La table 'user' a été créée.");
});

// Démarrage du serveur
app.listen(port, () => {
  console.log("Server is listening on port 3000");
});
