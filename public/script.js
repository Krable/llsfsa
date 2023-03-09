// const form = document.querySelector("form");
// const imagePathInput = document.querySelector("#imagePathInput");
// const imageNameInput = document.querySelector("#nameInput");
// const imageDateInput = document.querySelector("#dateInput");
// const saveButton = document.querySelector("#saveButton");
// const gallery = document.querySelector("#gallery");
// const noGallery = document.querySelector("#noGallery");

// // Fonction pour enregistrer une image dans le local storage
// saveButton.addEventListener("click", saveImage);
// function saveImage(event) {
//   event.preventDefault();

//   // Récupération des valeurs des champs de formulaire
//   const imagePath = imagePathInput.value;
//   const imageName = imageNameInput.value;
//   const imageDate = imageDateInput.value;

//   // Création de l'objet représentant l'image
//   const image = { path: imagePath, name: imageName, date: imageDate };

//   // Récupération des images déjà enregistrées
//   const images = JSON.parse(localStorage.getItem("images")) || [];

//   // Ajout de la nouvelle image
//   images.push(image);

//   // Sauvegarde des images dans le local storage
//   localStorage.setItem("images", JSON.stringify(images));

//   // Affichage de la galerie avec la nouvelle image
//   displayGallery();
// }

// // Fonction pour afficher la galerie d'images
// function displayGallery() {
//   // Récupération des images enregistrées dans le local storage
//   const images = JSON.parse(localStorage.getItem("images")) || [];

//   // Si aucune image n'est enregistrée, afficher un message
//   if (images.length === 0) {
//     gallery.style.display = "none";
//     noGallery.style.display = "block";
//     return;
//   }

//   // Sinon, afficher la galerie
//   gallery.style.display = "flex";
//   noGallery.style.display = "none";

//   gallery.innerHTML = "";
//   images.forEach((image) => {
//     const galleryItem = document.createElement("div");
//     galleryItem.classList.add("gallery-item");

//     const img = document.createElement("img");
//     img.src = image.path;
//     img.alt = image.name;

//     const title = document.createElement("h3");
//     title.textContent = image.name;

//     const date = document.createElement("p");
//     date.textContent = image.date;

//     const bt = document.createElement("button");
//     bt.classList.add("delete-button");
//     bt.addEventListener("click", () => {
//       const index = images.findIndex((image) => image.src === img.src);
//       if (index > -1) {
//         images.splice(index, 1);
//         localStorage.setItem("galleryImages", JSON.stringify(images));
//         img.parentNode.removeChild(img);
//       }
//     });

//     const galleryItemInfo = document.createElement("div");
//     galleryItemInfo.classList.add("gallery-item-info");
//     galleryItemInfo.appendChild(title);
//     galleryItemInfo.appendChild(date);
//     galleryItemInfo.appendChild(bt);

//     galleryItem.appendChild(img);
//     galleryItem.appendChild(galleryItemInfo);

//     gallery.appendChild(galleryItem);

//     img.addEventListener("click", () => {
//       displayImage(image);
//     });
//   });
// }

// const toggleButton = document.querySelector("#toggle-theme");

// toggleButton.addEventListener("click", () => {
//   form.classList.toggle("retracted");
// });

// form.classList.add("retracted");

// window.addEventListener("load", displayGallery);

// boxSuggestionFs.addEventListener("mouseover", (e) => {
//   rere.style.display = "flex";
// });

// boxSuggestionFs.addEventListener("mouseout", (e) => {
//   rere.style.display = "none";
// });

// Ouvir le container d'ajout de suggestion

const containerAddSuggestion = document.getElementById(
  "container_add_suggestion"
);
const btnOpenAddSuggestion = document.getElementById("btn_open_add_suggestion");
const btnQuit = document.getElementById("btn_quit");

btnOpenAddSuggestion.addEventListener("click", (e) => {
  containerAddSuggestion.style.display = "block";
});

btnQuit.addEventListener("click", (e) => {
  containerAddSuggestion.style.display = "none";
});

// REMPLIR, ENVOYER ET AJOUTER AU DISPLAY

const inptTitle = document.getElementById("inpt_title");
const inptDate = document.getElementById("inpt_date");
const inptTime = document.getElementById("inpt_time");

const plateformeNetflix = document.getElementById("plateforme_netflix");
const plateformeApv = document.getElementById("plateforme_apv");
const plateformeDowlaod = document.getElementById("plateforme_dowlaod");

const inptUrlNetflix = document.getElementById("inpt_url_netflix");
const inptUrlApv = document.getElementById("inpt_url_apv");
const inptUrlCritic = document.getElementById("inpt_url_critic");
const inptUrlImage = document.getElementById("inpt_url_image");
const inptSubmit = document.getElementById("inpt_submit");

function addSuggestionToDisplay() {
  const ulul = document.getElementById("ulul");
  const containerLiDisplay = document.createElement("li");

  const boxDisplay = document.createElement("div");
  boxDisplay.classList.add("box_display");

  const image = document.createElement("div");
  image.classList.add("image");

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.classList.add("flex");

  const title = document.createElement("div");
  title.classList.add("text");
  title.classList.add("title");
  title.innerHTML = inptTitle.value;

  const date = document.createElement("div");
  date.classList.add("text");
  date.classList.add("date_time");
  const pDate = document.createElement("p");
  const spanDate = document.createElement("span");
  spanDate.innerHTML = inptDate.value;
  const spanTime = document.createElement("span");
  spanTime.style.marginLeft = "10px";
  spanTime.innerHTML = inptTime.value;

  const plateforme = document.createElement("div");
  plateforme.classList.add("text");
  const ulPlateforme = document.createElement("ul");
  ulPlateforme.classList.add("flex");
  ulPlateforme.classList.add("plateformeUl");

  if (plateformeNetflix.checked) {
    const liNetflix = document.createElement("li");
    liNetflix.className = "netflix plateformeUlLi";
    ulPlateforme.appendChild(liNetflix);

    liNetflix.addEventListener("click", (e) => {
      window.open(inptUrlNetflix.value);
    });
  }
  if (plateformeApv.checked) {
    const liAmazon = document.createElement("li");
    liAmazon.className = "amazon plateformeUlLi";
    ulPlateforme.appendChild(liAmazon);

    liAmazon.addEventListener("click", (e) => {
      window.open(plateformeApv.value);
    });
  } else if (plateformeDowlaod.checked) {
    const liDownload = document.createElement("li");
    liDownload.className = "downlaod plateformeUlLi";
    ulPlateforme.appendChild(liDownload);
  }

  plateforme.appendChild(ulPlateforme);

  pDate.appendChild(spanDate);
  pDate.appendChild(spanTime);

  date.appendChild(pDate);

  overlay.appendChild(title);
  overlay.appendChild(date);
  overlay.appendChild(plateforme);

  boxDisplay.appendChild(image);
  boxDisplay.appendChild(overlay);

  containerLiDisplay.appendChild(boxDisplay);
  ulul.appendChild(containerLiDisplay);
}

inptSubmit.addEventListener("click", (e) => {
  if (
    inptTitle.value === "" ||
    inptDate.value === "" ||
    inptTime.value === "" ||
    inptUrlImage.value === ""
  ) {
  } else {
    addSuggestionToDisplay();
    containerAddSuggestion.style.display = "none";
  }
});

// title.className = "text title";