const moviesUrl = "https://llsfsa.onrender.com/movies";

// Fonction pour créer une affiche de film
function createMoviePoster(movie) {
  //
  // BOX DISPLAY

  const boxDisplay = document.createElement("div");
  boxDisplay.classList.add("box_display");

  // IMAGE POSTER

  const imagePoster = document.createElement("img");
  imagePoster.classList.add("image");
  imagePoster.src = movie.image_url;
  imagePoster.alt = movie.name;

  // OVERLAY

  const overlay = document.createElement("div");
  overlay.classList.add("flex");
  overlay.classList.add("overlay");

  // TEXT

  const text = document.createElement("div");
  text.classList.add("text");

  const firstTitle = document.createElement("p");
  firstTitle.classList.add("first_title");
  firstTitle.textContent = movie.name;

  const secondTitle = document.createElement("p");
  secondTitle.classList.add("second_title");
  secondTitle.textContent = movie.second_title;

  let d = new Date(movie.release_date);
  let year = d.getFullYear();

  const dateTime = document.createElement("p");
  dateTime.classList.add("date_time");
  const pDateTime = document.createElement("p");
  const spanDate = document.createElement("span");
  spanDate.setAttribute("id", "spanDate");
  spanDate.textContent = year;
  const spanTime = document.createElement("span");
  spanTime.setAttribute("id", "spanTime");
  spanTime.textContent = movie.duree;
  pDateTime.appendChild(spanDate);
  pDateTime.appendChild(document.createTextNode(" - "));
  pDateTime.appendChild(spanTime);
  dateTime.appendChild(pDateTime);

  // PLATEFORMS

  const ulPlateforms = document.createElement("ul");
  ulPlateforms.classList.add("flex");
  ulPlateforms.classList.add("ul_plateforms");

  let download = true;

  if (movie.netflix_url) {
    const netflix = document.createElement("li");
    netflix.classList.add("ulLi_plateforms");
    netflix.classList.add("netflix");
    netflix.addEventListener("click", () => {
      window.open(movie.netflix_url);
    });
    ulPlateforms.appendChild(netflix);
    download = false;
  }
  if (movie.amazon_url) {
    const amazon = document.createElement("li");
    amazon.classList.add("ulLi_plateforms");
    amazon.classList.add("amazon");
    amazon.addEventListener("click", () => {
      window.open(movie.amazon_url);
    });
    ulPlateforms.appendChild(amazon);
    download = false;
  }
  if (download) {
    const downloadLi = document.createElement("li");
    downloadLi.classList.add("ulLi_plateforms");
    downloadLi.classList.add("download");
    ulPlateforms.appendChild(downloadLi);
  }

  // REVIEW

  const ulReview = document.createElement("ul");
  ulReview.classList.add("flex");
  ulReview.classList.add("ul_review");
  if (movie.allocine_url) {
    const ulLiReview = document.createElement("li");
    ulLiReview.classList.add("flex");
    ulLiReview.classList.add("allocine");
    ulReview.appendChild(ulLiReview);
  }

  // FORBIDEN V

  const boxForbiden = document.createElement("div");
  boxForbiden.classList.add("box_forbiden");
  const boxForbidenImage = document.createElement("img");
  let unAge = movie.age;

  if (unAge >= 18) {
    boxForbidenImage.classList.add("forbiden18");
  } else if (unAge >= 16) {
    boxForbidenImage.classList.add("forbiden16");
  } else if (unAge >= 12) {
    boxForbidenImage.classList.add("forbiden12");
  } else {
    boxForbidenImage.classList.add("forbiden10");
  }

  boxForbiden.appendChild(boxForbidenImage);

  /////////////////
  /////////////////
  /////////////////

  // V


  boxDisplay.appendChild(imagePoster);
  boxDisplay.appendChild(overlay);

  overlay.appendChild(text);
  overlay.appendChild(boxForbiden);

  text.appendChild(firstTitle);
  text.appendChild(secondTitle);
  text.appendChild(dateTime);
  text.appendChild(ulPlateforms);
  text.appendChild(ulReview);
}

// Fonction pour créer des affiches de film pour chaque film de l'API
function createMoviePosters(movies) {
  // Sélectionner l'élément HTML où les affiches seront affichées
  const posterContainer = document.getElementById("container_dipslay_main");

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
