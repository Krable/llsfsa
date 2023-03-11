const moviesUrl = "https://llsfsa.onrender.com/movies";

// Fonction pour créer une affiche de film
function createMoviePoster(movie) {
  const containerLiDisplay = document.createElement("li");
  containerLiDisplay.setAttribute("id", "container_li_display");

  const boxDisplay = document.createElement("div");
  boxDisplay.classList.add("box_display");

  const image = document.createElement("div");
  image.classList.add("image");
  const img = document.createElement("img");
  img.src = movie.image_url;
  img.alt = movie.name;
  image.appendChild(img);

  const overlay = document.createElement("div");
  overlay.classList.add("flex");
  overlay.classList.add("overlay");

  const title = document.createElement("div");
  title.classList.add("text");
  title.classList.add("title");
  const pTitle = document.createElement("p");
  pTitle.textContent = movie.name;
  title.appendChild(pTitle);

  let d = new Date(movie.release_date);
  let year = d.getFullYear();

  const date = document.createElement("div");
  date.classList.add("text");
  date.classList.add("date_time");
  const pDate = document.createElement("p");
  const spanDate = document.createElement("span");
  spanDate.setAttribute("id", "spanDate");
  spanDate.textContent = year;
  const spanTime = document.createElement("span");
  spanTime.setAttribute("id", "spanTime");
  spanTime.textContent = movie.duree;
  pDate.appendChild(document.createTextNode("("));
  pDate.appendChild(spanDate);
  pDate.appendChild(document.createTextNode(") - "));
  pDate.appendChild(spanTime);
  date.appendChild(pDate);

  const plateforme = document.createElement("div");
  plateforme.classList.add("text");
  const ulPlateforme = document.createElement("ul");
  ulPlateforme.classList.add("flex");
  ulPlateforme.classList.add("plateformeUl");

  let download = true;

  if (movie.netflix_url) {
    const netflix = document.createElement("li");
    netflix.classList.add("plateformeUlLi");
    netflix.classList.add("netflix");
    netflix.addEventListener("click", () => {
      window.open(movie.netflix_url);
    });
    ulPlateforme.appendChild(netflix);
    download = true;
  }
  if (movie.amazon_url) {
    const amazon = document.createElement("li");
    amazon.classList.add("plateformeUlLi");
    amazon.classList.add("amazon");
    amazon.addEventListener("click", () => {
      window.open(movie.amazon_url);
    });
    ulPlateforme.appendChild(amazon);
    download = true;
  }
  if (download) {
    const download = document.createElement("li");
    download.classList.add("plateformeUlLi");
    download.classList.add("download");
    ulPlateforme.appendChild(download);
  }

  plateforme.appendChild(ulPlateforme);

  // ALLOCINE

  if (movie.allocine_url) {
    const review = document.createElement("div");
    review.classList.add("text");
    const ulReview = document.createElement("ul");
    ulReview.classList.add("flex");
    const allocine = document.createElement("li");
    allocine.classList.add("plateformeUlLi");
    allocine.classList.add("download");
    ulReview.appendChild(download);
  }

  ulReview.appendChild(liAllocine);
  review.appendChild(ulReview);

  overlay.appendChild(title);
  overlay.appendChild(date);
  overlay.appendChild(plateforme);
  overlay.appendChild(review);

  boxDisplay.appendChild(image);
  boxDisplay.appendChild(overlay);

  containerLiDisplay.appendChild(boxDisplay);
  return containerLiDisplay;
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
