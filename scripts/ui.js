export const ele = {
  form: document.querySelector("form"),
  result_list: document.querySelector("#results"),
};

export const renderLoader = (outlet) => {
  outlet.innerHTML = `
        <div class="wrapper">
            <div id="wifi-loader">
                <svg class="circle-outer" viewBox="0 0 86 86">
                    <circle class="back" cx="43" cy="43" r="40"></circle>
                    <circle class="front" cx="43" cy="43" r="40"></circle>
                    <circle class="new" cx="43" cy="43" r="40"></circle>
                </svg>
                <svg class="circle-middle" viewBox="0 0 60 60">
                    <circle class="back" cx="30" cy="30" r="27"></circle>
                    <circle class="front" cx="30" cy="30" r="27"></circle>
                </svg>
                <svg class="circle-inner" viewBox="0 0 34 34">
                    <circle class="back" cx="17" cy="17" r="14"></circle>
                    <circle class="front" cx="17" cy="17" r="14"></circle>
                </svg>
                <div class="text" data-text="Searching"></div>
            </div>
        </div>
    `;
};

export const renderResults = (results) => {
  console.log(results);
  ele.result_list.innerHTML = results.map(
    (data) => `
    <a href="#${data.recipe_id}" class="result-link">
        <img src="${data.image_url}">
        <div class="info">
            <h4>${data.title}</h4>
            <p>${data.publisher}</p>
        </div>
    </a>
    `
  );
};
