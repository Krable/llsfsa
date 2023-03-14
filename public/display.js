const moviesUrl = "https://llsfsa.onrender.com/movies";
const containerDisplay = document.getElementById("container_display");

// Fonction pour créer une affiche de film
function createMoviePoster(movie) {
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
  secondTitle.textContent = movie.name2;

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
    ulLiReview.addEventListener("click", () => {
      window.open(movie.allocine_url);
    });
    ulReview.appendChild(ulLiReview);
  }

  // FORBIDEN

  const boxForbiden = document.createElement("div");
  boxForbiden.classList.add("box_forbiden");
  const boxForbidenImage = document.createElement("img");
  boxForbidenImage.classList.add("paddingHidden");
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
function createMoviePosters(movies) {
  // Sélectionner l'élément HTML où les affiches seront affichées
  const posterContainer = document.getElementById("container_dipslay_main");

  // Créer une affiche de film pour chaque film de l'API et l'ajoute au conteneur
  movies.forEach((movie) => {
    const poster = createMoviePoster(movie);
    posterContainer.appendChild(poster);
  });

  // SHEARCH BAR

  const inptSearch = document.getElementById("inpt_search");

  const allBoxDisplay = document.querySelectorAll(".box_display");

  inptSearch.addEventListener("keyup", (e) => {
    let recupValue = e.target.value.toLowerCase();

    allBoxDisplay.forEach((uneBox) => {
      const firstTitle = uneBox
        .querySelector(".first_title")
        .innerHTML.toLowerCase();
      if (!firstTitle.includes(recupValue)) {
        uneBox.classList.add("hiddenBoxDisplay");
      } else {
        uneBox.classList.remove("hiddenBoxDisplay");
      }
    });
  });
}

// Appeler l'API pour récupérer la liste des films et créer des affiches pour chaque film
fetch(moviesUrl)
  .then((response) => response.json())
  .then((movies) => createMoviePosters(movies))
  .catch((error) => console.error(error));

//
//
//
//
//
//
//
//
//
//
//
//
// FILTERS

let x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
      create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
          and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
    except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
  then close all select boxes: */
document.addEventListener("click", closeAllSelect);
