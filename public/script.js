
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
  img.alt = movie.title;
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

 let d = new Date(movie.release_date)
 let year = d.getFullYear();
let hour = d.getHours();
 
const date = document.createElement("div");
date.classList.add("text");
date.classList.add("date_time");
const pDate = document.createElement("p");
const spanDate = document.createElement("span");
spanDate.setAttribute("id", "spanDate");
spanDate.textContent = year;
const spanTime = document.createElement("span");
spanTime.setAttribute("id", "spanTime");
spanTime.textContent = hour;
pDate.appendChild(document.createTextNode("("));
pDate.appendChild(spanDate);
pDate.appendChild(document.createTextNode(") - "));
pDate.appendChild(spanTime);
pDate.appendChild(document.createTextNode("min"));
date.appendChild(pDate);

  const plateforme = document.createElement("div");
plateforme.classList.add("text");
  const ulPlateforme = document.createElement("ul");
ulPlateforme.classList.add("flex");
ulPlateforme.classList.add("plateformeUl");
  
  if (movie.netflix) {
    const netflix = document.createElement("li");
    netflix.classList.add("plateformeUlLi");
    netflix.classList.add("netflix");
    ulPlateforme.appendChild(netflix);
  }
  if (movie.amazon) {
    const amazon = document.createElement("li");
    amazon.classList.add("plateformeUlLi");
    amazon.classList.add("amazon");
    ulPlateforme.appendChild(amazon);
  }
  if (movie.download) {
    const download = document.createElement("li");
    download.classList.add("plateformeUlLi");
    download.classList.add("download");
    ulPlateforme.appendChild(download);
  }
  
plateforme.appendChild(ulPlateforme);
  

const liNetflix = document.createElement("li");
liNetflix.classList.add("plateformeUlLi");
liNetflix.classList.add("netflix");
ulPlateforme.appendChild(liNetflix);


const review = document.createElement("div");
review.classList.add("text");
const ulReview = document.createElement("ul");
ulReview.classList.add("flex");
const liAllocine = document.createElement("li");
liAllocine.classList.add("Allocine");
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
