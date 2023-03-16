const LocalStrategy = require("passport-local").Strategy;
const pg = require("pg");

const pool = new pg.Pool({
  user: "llsfsa_user",
  host: "dpg-cg4vouceoogtrlv5l9l0-a",
  database: "llsfsa",
  password: "dbItIvpt4oSbR8UcD9qppAfTfVX10R27",
  port: 5432,
});

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    // Requête SQL pour récupérer l'utilisateur avec l'adresse email fournie
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rows.length > 0) {
          const user = results.rows[0];

          // Vérification du mot de passe
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }

            if (isMatch) {
              // L'utilisateur est authentifié
              return done(null, user);
            } else {
              // Mot de passe incorrect
              return done(null, false, { message: "Mot de passe incorrect" });
            }
          });
        } else {
          // Adresse email non trouvée dans la base de données
          return done(null, false, { message: "Adresse email non trouvée" });
        }
      }
    );
  };

  function inscription(req, email, password, done) {
    pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (err, result) => {
        if (err) {
          return done(err);
        }
        if (result.rows.length > 0) {
          return done(
            null,
            false,
            req.flash("signupMessage", "That email is already taken.")
          );
        } else {
          const saltRounds = 10;
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              return done(err);
            }
            const newUser = {
              email: email,
              password: hash,
            };
            pool.query(
              "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
              [newUser.email, newUser.password],
              (err, result) => {
                if (err) {
                  return done(err);
                }
                newUser.id = result.rows[0].id;
                return done(null, newUser);
              }
            );
          });
        }
      }
    );
  }
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      inscription
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    // Requête SQL pour récupérer l'utilisateur avec l'identifiant fourni
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
      if (err) {
        throw err;
      }

      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;
