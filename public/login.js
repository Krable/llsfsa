const boxLogin = document.getElementById("box_login");
const inptId = document.getElementById("inpt_id");
const inptPassword = document.getElementById("inpt_password");
const messageError = document.getElementById("message_error");
const submitLogin = document.getElementById("submit_login");
const inptSubmit = document.getElementById("inpt_submit");

// CHECKBOX AUTOMATIC

const automaticConnection = document.getElementById("automatic_connection");

// CHECK INPUT LOGIN

inptSubmit.addEventListener("click", (e) => {
  if (inptId.value === "ll" && inptPassword.value === "123") {
    console.log("accept");
  } else {
    messageError.style.display = "flex";
    messageError.style.height = "6%";
    submitLogin.style.height = "14%";

    messageError.innerHTML = "Identifiant ou Mot de passe incorrect";
  }
});
