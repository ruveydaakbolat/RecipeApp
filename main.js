import { categories } from "./scripts/constants.js";
import { ele, renderLoader, renderResults } from "./scripts/ui.js";
import { Search } from "./scripts/search.js";

const search = new Search();

document.addEventListener("DOMContentLoaded", () => {
  const index = Math.floor(Math.random() * categories.length);
  getResults(categories[index]);
});

ele.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  getResults(query);
});

async function getResults(query) {
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
    }).showToast();

    return;
  }

  renderLoader(ele.result_list);

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  try {
    await search.fetchResults(query);

    renderResults(search.results.recipes);
  } catch (err) {
    Toastify({
      text: "Aradığınız kriterlere uygun ürün bulunamadı.",
      duration: 3000,
      close: true,
      gravity: "bottom",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #fbda61, #ff5acd)",
        textShadow: "0 0 30px black",
      },
    }).showToast();

    ele.result_list.innerHTML = "";
  }
}
