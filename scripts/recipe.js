import { ele } from './ui.js';

export class Recipe {
    constructor() {
        this.likes = JSON.parse(localStorage.getItem("LIKES")) || []; 
        this.info = {};

        this.ingredients = [];

        this.renderLikes();
    }

    // api'den tarif bilgilerini alan method
    async getRecipe(id) {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);

        const data = await res.json();

        console.log(data)

        this.info = data.recipe;
        this.ingredients = data.recipe.ingredients;
    }

    createIngredient() {
        return this.ingredients.map(
            (i) => `
                <li>
                    <i class="bi bi-check-circle"></i>
                    <p>${i}</p>
                </li>
            `
        ).join(' ');
    }

    // tarif detaylarını ekrana basar
    renderRecipe(r) {
        ele.recipeArea.innerHTML = `
        <figure>
        <img src="${r.image_url}" alt="">
        <h1>${r.title}</h1>
        <p class="like-area">
          <i id="like-btn" class="bi ${this.isRecipeLiked() ? 'bi-heart-fill' : 'bi-heart'}"></i>
        </p>
      </figure>

      <div class="ingredients">
        <ul>
        ${this.createIngredient()}
        </ul>

        <button id="add-to-cart" class="CartBtn">
          <span class="IconContainer"> 
            <i class="bi bi-cart-fill"></i>
          </span>
          <p class="text">Sepete Ekle</p>
        </button>
      </div>

      <div class="directions">
        <h2>Nasıl Pişirilir?</h2>
        <p>
          Bu tarif dikkatlice <span>${r.publisher}</span> tarafından hazırlanmış ve test edilmiştir. Diğer detaylara onların websitesi üzerinden erişebilirsiniz.
        </p>
        <a href="${r.publisher_url}" target="_blank">Yönerge</a>
      </div>
        `;
    }

    isRecipeLiked() {
        return this.likes.find((i) => i.id === this.info.recipe_id);
    }

    controlLike() {
        const newObject = {
            id: this.info.recipe_id,
            img: this.info.image_url,
            title: this.info.title
        };

        if (this.isRecipeLiked()) {
            this.likes = this.likes.filter((i) => i.id !== newObject.id);
        } else {
            this.likes.push(newObject);
        }

        localStorage.setItem("LIKES", JSON.stringify(this.likes));

        // detay arayüzü'nü güncelle
        this.renderRecipe(this.info);

        this.renderLikes();
    }

    renderLikes() {
        ele.like_list.innerHTML = this.likes.map(
            (i) => `
                <a href="#${i.id}">
                    <img src="${i.img}" alt="">
                    <span>${i.title}</span>
                </a>
            `
        ).join(' ');
    }
}