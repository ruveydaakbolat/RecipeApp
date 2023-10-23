import { categories } from "./scripts/constants.js";
import { ele } from "./scripts/ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const index = Math.floor(Math.random() * categories.length);
  getResults(categories[index]);
});

ele.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  getResults(query);
});

function getResults(query) {
  if (!query) {
    Toastify({
      text: "Lütfen formu doldurun",
      duration: 3000,
      close: true,
      gravity: "bottom", 
      stopOnFocus: true, 
      style: {
        background: "linear-gradient(to right, #fbda61, #ff5acd)",
        textShadow: "0 0 30px black",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }
}
