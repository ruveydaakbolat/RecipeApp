import { categories } from "./scripts/constants.js";
import { ele, renderBasketItems, renderLoader, renderResults } from "./scripts/ui.js";
import { Search } from "./scripts/search.js";
import { Recipe } from "./scripts/recipe.js";
import { v4 } from "https://jspm.dev//uuid";


const search = new Search();
const recipe = new Recipe();

document.addEventListener("DOMContentLoaded", () => {
  const index = Math.floor(Math.random() * categories.length);
  getResults(categories[index]);
});

ele.recipeArea.addEventListener("click", handleClick);

ele.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  getResults(query);
});

window.addEventListener('load', getRecipe);
window.addEventListener('hashchange', getRecipe);

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

async function getRecipe(e) {
  const id = location.hash.slice(1);
  if(id) {
    renderLoader(ele.recipeArea);

    try {
      // tarif bilgilerini alır
      await recipe.getRecipe(id);

      // ekrana tarif bilgilerini bas
      recipe.renderRecipe(recipe.info);

      // tarif alanını scroll' la
      ele.recipeArea.scrollIntoView({ behavior: 'smooth' });

    } catch {
      Toastify({
        text: "Ürün detayları alınamadı.",
        duration: 3000,
        close: true,
        gravity: "bottom",
        stopOnFocus: true,
        style: {
          background: 'red',
          textShadow: "0 0 30px black",
        },
      }).showToast();
    }
  }
}

let basket = JSON.parse(localStorage.getItem("BASKET")) || [];

document.addEventListener("DOMContentLoaded", () => renderBasketItems(basket));

function handleClick(e) {
  if(e.target.id === "like-btn") {
    recipe.controlLike();
  }

  if(e.target.id === "add-to-cart") {
    recipe.ingredients.forEach((title) => {
      const newItem = {
        id: v4(),
        title,
      };

      basket.push(newItem);

    });
    localStorage.setItem('BASKET', JSON.stringify(basket));

    renderBasketItems(basket);
  }
}

ele.clear.addEventListener("click", () => {
  const res = confirm("Sepet temizlenecek emin misiniz?");

  if(res){
    localStorage.removeItem("BASKET");

    basket = [];

    ele.basket_list.innerHTML = '';
  }
});

ele.basket_list.addEventListener("click",(e) => {
  if(e.target.id === "delete-item") {
    const parent = e.target.parentElement;

    const delete_id = parent.dataset.id;

    basket = basket.filter((i) => i.id !== delete_id);
    localStorage.setItem('BASKET', JSON.stringify(basket));

    parent.remove();
  }
})