
const moviesUrl = "https://llsfsa.onrender.com/movies";

// Fonction pour créer une affiche de film
function createMoviePoster(movie) {
  // Créer un élément div pour contenir l'affiche de film
  const poster = document.createElement("div");
  poster.classList.add("film-item");

  // Ajouter l'image de l'affiche de film
  const image = document.createElement("img");
  image.src = movie.image_url;
  image.alt = movie.title;
  poster.appendChild(image);

  // Ajouter le titre du film
  const title = document.createElement("h2");
  title.textContent = movie.title;
  title.classList.add("film-title");
  poster.appendChild(title);

  // Ajouter la date de sortie du film
  const releaseDate = document.createElement("p");
  releaseDate.textContent = `Date de sortie : ${movie.release_date}`;
  releaseDate.classList.add("film-description");
  poster.appendChild(releaseDate);

  // Ajouter la liste des plateformes de distribution
  const distribution = document.createElement("ul");
  if (movie.netflix) {
    const netflix = document.createElement("li");
    netflix.textContent = "Disponible sur Netflix";
    distribution.appendChild(netflix);
  }
  if (movie.amazon) {
    const amazon = document.createElement("li");
    amazon.textContent = "Disponible sur Amazon";
    distribution.appendChild(amazon);
  }
  if (movie.download) {
    const download = document.createElement("li");
    download.textContent = "Disponible en téléchargement";
    distribution.appendChild(download);
  }
  poster.appendChild(distribution);

  // Retourner l'élément div complet
  return poster;
}

// Fonction pour créer des affiches de film pour chaque film de l'API
function createMoviePosters(movies) {
  // Sélectionner l'élément HTML où les affiches seront affichées
  const posterContainer = document.getElementById("ulul");

  // Créer une affiche de film pour chaque film de l'API et l'ajouter au conteneur
  movies.forEach((movie) => {
    const poster = createMoviePoster(movie);
    posterContainer.appendChild(poster);
  });
}

// Appeler l'API pour récupérer la liste des films et créer des affiches pour chaque film
fetch(moviesUrl)
  .then((response) => response.json())
  .then((movies) => createMoviePosters(movies))
  .catch((error) => console.error(error));

// title.className = "text title";
