const moviesUrl = "https://llsfsa.onrender.com/movies";
const containerDisplay = document.getElementById("container_display");
const posterContainer = document.getElementById("container_dipslay_main");
const containerFilter = document.querySelector("#container_filters");
const getYearFromFilm = [];
const configuration = [];
const allCurrentDiv = [];
const allCustomSelected = [];
let currentSearch = [];
let allBoxDisplay = [];
let currentFilters = {
  name: "",
  platform: "3", // "3" est la valeur pour "Tous" dans le filtre de plateforme
  date: "Tous",
};
configuration.push({
  titles: ["Tous", "Amazon Prime Video", "Netflix", "Download"],
  values: [3, 2, 1, 0],
  fonctions: [searchPlatform],
});
configuration.push({
  titles: getYearFromFilm,
  values: [],
  fonctions: [searchYear],
});

// Fonction qui applique les filtres aux éléments d'affichage
function filterBoxes() {
  currentSearch.forEach((uneBox) => {
    const { name, platform, date } = uneBox.dataset;

    // Vérification de correspondance pour le filtre de nom
    const nameMatch =
      !currentFilters.name || name.toLowerCase().includes(currentFilters.name);

    // Vérification de correspondance pour le filtre de plateforme
    const isAllPlatforms = currentFilters.platform === "3";
    const platformMatch =
      !currentFilters.platform ||
      (isAllPlatforms ? true : platform === currentFilters.platform);

    // Vérification de correspondance pour le filtre de date
    const dateMatch =
      currentFilters.date === "Tous" || date === currentFilters.date;

    // Si les éléments correspondent aux filtres, les afficher, sinon les masquer
    const isMatch = !(nameMatch && platformMatch && dateMatch);
    console.log(dateMatch);
    uneBox.classList.toggle("hiddenBoxDisplay", isMatch);
  });
}
// Fonction qui met à jour les filtres et applique les filtres aux éléments d'affichage
function updateFilters(filterType, filterValue, textValue, currentDiv) {
  currentFilters[filterType] = filterValue;
  currentDiv.textContent = textValue;
  filterBoxes();
}
// Fonction qui gère la recherche par le titre du film
function searchName(e) {
  currentFilters.name = e.target.value.toLowerCase();
  currentSearch = Array.from(allBoxDisplay);
  filterBoxes();
}

// Fonction qui gère la recherche par plateforme
function searchPlatform(uneDiv, currentDiv) {
  updateFilters(
    "platform",
    uneDiv.dataset.value,
    uneDiv.textContent,
    currentDiv
  );
}
// Fonction qui gère la recherche par date par année
function searchYear(uneDiv, currentDiv) {
  updateFilters("date", uneDiv.dataset.value, uneDiv.textContent, currentDiv);
}
// Fonction permettant de fermer tous les menu du header quand on clique en dehors
function closeAll(e) {
  // Vérifie si la cible du clic n'est pas l'un des éléments du header
  if (!allCurrentDiv.includes(e.target)) {
    // Parcourt tous les éléments de sélection personnalisés et appelle leur méthode "close"
    allCustomSelected.forEach((unCS) => {
      unCS.close();
    });
  }
}
document.addEventListener("click", closeAll);

function initFilter() {
  // Récupération de tous les éléments avec la classe "box_display"
  allBoxDisplay = document.querySelectorAll(".box_display");
  // Définition des filtres de recherche par défaut
  currentSearch = allBoxDisplay;
}
function createFilter(uneConfiguration) {
  getYearFromFilm.sort((a, b) => b - a);
  getYearFromFilm.unshift("Tous");

  const boxFilter = document.createElement("div");
  boxFilter.classList.add("flex", "box_filters_main");

  const labelFilter = document.createElement("div");
  labelFilter.textContent = "Filtres:";
  labelFilter.style.color = "whitesmoke";
  boxFilter.appendChild(labelFilter);

  const inputSearch = document.createElement("input");
  inputSearch.id = "box_filters";
  inputSearch.type = "search";
  inputSearch.placeholder = "Rechercher...";
  inputSearch.addEventListener("keyup", searchName);
  boxFilter.appendChild(inputSearch);

  uneConfiguration.forEach((unConf) => {
    const uneSelectDiv = document.createElement("div");
    uneSelectDiv.classList.add("custom-select");

    const currentDiv = document.createElement("div");
    currentDiv.classList.add("select-selected");
    currentDiv.textContent = unConf.titles[0];
    allCurrentDiv.push(currentDiv);

    const otherDiv = document.createElement("div");
    otherDiv.className = "select-items select-hide";
    otherDiv.close = function () {
      otherDiv.classList.add("select-hide");
    };
    allCustomSelected.push(otherDiv);

    uneSelectDiv.addEventListener("click", (e) => {
      e.defaultPrevented;
      if (otherDiv.classList.contains("select-hide")) {
        otherDiv.classList.remove("select-hide");
      } else {
        otherDiv.close();
      }
    });

    let i = 0;
    unConf.titles.forEach((title) => {
      const divTitle = document.createElement("div");
      divTitle.textContent = title;
      if (unConf.values[i] !== undefined && unConf.values[i] !== null) {
        divTitle.dataset.value = unConf.values[i];
      } else {
        divTitle.dataset.value = title;
      }
      i++;

      unConf.fonctions.forEach((uneFonction) => {
        divTitle.addEventListener("click", (e) => {
          uneFonction(e.target, currentDiv);
        });
      });
      otherDiv.appendChild(divTitle);
    });

    uneSelectDiv.appendChild(currentDiv);
    uneSelectDiv.appendChild(otherDiv);
    boxFilter.appendChild(uneSelectDiv);
    containerFilter.appendChild(boxFilter);
  });
}
// Fonction pour créer une affiche de film
function createMoviePoster(movie) {
  const {
    name,
    name2,
    release_date,
    duree,
    netflix_url,
    amazon_url,
    allocine_url,
    age,
    image_url,
  } = movie;
  // BOX DISPLAY
  const boxDisplay = document.createElement("div");
  boxDisplay.classList.add("box_display");
  boxDisplay.dataset.name = name;
  // IMAGE POSTER
  const imagePoster = document.createElement("img");
  imagePoster.classList.add("image");
  imagePoster.src = image_url;
  imagePoster.alt = name;

  // OVERLAY
  const overlay = document.createElement("div");
  overlay.classList.add("flex", "overlay");

  // TEXT
  const text = document.createElement("div");
  text.classList.add("text");

  const firstTitle = document.createElement("p");
  firstTitle.classList.add("first_title");
  firstTitle.textContent = name;

  const secondTitle = document.createElement("p");
  secondTitle.classList.add("second_title");
  secondTitle.textContent = name2;

  let d = new Date(release_date);
  let year = d.getFullYear();

  const dateTime = document.createElement("p");
  dateTime.classList.add("date_time");
  const pDateTime = document.createElement("p");
  const spanDate = document.createElement("span");
  spanDate.classList.add("spanDate");
  if (!getYearFromFilm.includes(year)) {
    getYearFromFilm.push(year);
  }
  spanDate.textContent = year;
  boxDisplay.dataset.date = year;

  const spanTime = document.createElement("span");
  spanTime.classList.add("spanTime");
  spanTime.textContent = duree;
  pDateTime.appendChild(spanDate);
  pDateTime.appendChild(document.createTextNode(" - "));
  pDateTime.appendChild(spanTime);
  dateTime.appendChild(pDateTime);

  // PLATEFORMS

  const ulPlateforms = document.createElement("ul");
  ulPlateforms.classList.add("flex");
  ulPlateforms.classList.add("ul_plateforms");

  let download = 0;

  if (netflix_url) {
    const netflix = document.createElement("li");
    netflix.classList.add("ulLi_plateforms");
    netflix.classList.add("netflix");
    netflix.addEventListener("click", () => {
      window.open(netflix_url);
    });
    ulPlateforms.appendChild(netflix);
    download += 1;
  }
  if (amazon_url) {
    const amazon = document.createElement("li");
    amazon.classList.add("ulLi_plateforms");
    amazon.classList.add("amazon");
    amazon.addEventListener("click", () => {
      window.open(amazon_url);
    });
    ulPlateforms.appendChild(amazon);
    download += 2;
  }
  if (download === 0) {
    const downloadLi = document.createElement("li");
    downloadLi.classList.add("ulLi_plateforms");
    downloadLi.classList.add("download");
    ulPlateforms.appendChild(downloadLi);
  }
  boxDisplay.dataset.platform = download;

  // REVIEW

  const ulReview = document.createElement("ul");
  ulReview.classList.add("flex");
  ulReview.classList.add("ul_review");
  if (allocine_url) {
    const ulLiReview = document.createElement("li");
    ulLiReview.classList.add("flex");
    ulLiReview.classList.add("allocine");
    ulLiReview.addEventListener("click", () => {
      window.open(allocine_url);
    });
    ulReview.appendChild(ulLiReview);
  }

  // FORBIDEN

  const boxForbiden = document.createElement("div");
  boxForbiden.classList.add("box_forbiden");
  const boxForbidenImage = document.createElement("img");
  boxForbidenImage.classList.add("paddingHidden");
  let unAge = age;

  if (unAge >= 18) {
    boxForbidenImage.classList.add("forbiden18");
  } else if (unAge >= 16) {
    boxForbidenImage.classList.add("forbiden16");
  } else if (unAge >= 12) {
    boxForbidenImage.classList.add("forbiden12");
  } else {
    boxForbidenImage.classList.add("forbiden10");
  }

  // APPEND-CHILD

  boxDisplay.appendChild(imagePoster);
  boxDisplay.appendChild(overlay);

  overlay.appendChild(text);
  overlay.appendChild(boxForbiden);

  text.appendChild(firstTitle);
  text.appendChild(secondTitle);
  text.appendChild(dateTime);
  text.appendChild(ulPlateforms);
  text.appendChild(ulReview);

  boxForbiden.appendChild(boxForbidenImage);

  containerDisplay.appendChild(boxDisplay);
  return containerDisplay;
}
// Fonction pour créer des affiches de film pour chaque film de l'API
function initMoviePoster(movies) {
  // Sélectionner l'élément HTML où les affiches seront affichées

  // Créer une affiche de film pour chaque film de l'API et l'ajoute au conteneur
  movies.forEach((movie) => {
    const poster = createMoviePoster(movie);
    posterContainer.appendChild(poster);
  });

  // SHEARCH BAR
  initFilter();
  createFilter(configuration);
}
// Appeler l'API pour récupérer la liste des films et créer des affiches pour chaque film
fetch(moviesUrl)
  .then((response) => response.json())
  .then((movies) => initMoviePoster(movies))
  .catch((error) => console.error(error));
