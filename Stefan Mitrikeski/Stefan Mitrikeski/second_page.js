const myCards = document.getElementById("cards");
const nameSearchField = document.getElementById("nameSearchField");
const colorSearchField = document.getElementById("colorSearchField");
const submitBtn = document.getElementById("submitBtn");
const heroTypes = document.getElementById("hero");
const loader = document.getElementById("loader");
const userName = document.getElementById("username");
const colorDropDown = document.getElementById("color");
const ascending = document.getElementById("ascending");
const descending = document.getElementById("descending");

var select = "";

userName.innerText +=
  " " + localStorage.getItem("user").split("").slice(1, -1).join("");

const API_CARDS = "https://api.magicthegathering.io/v1/cards? ";

const API_TYPE = "https://api.magicthegathering.io/v1/types";

const store = [];
const types = [];

const reloadingFunction = () => {
  if (nameSearchField.value === "" && colorSearchField.value === "") {
    window.location.reload();
  }
};

const filterFunct = () => {
  const result = store.filter((item) => item.name === nameSearchField.value);
  return result;
};

const filterFunctColor = () => {
  const searched = colorSearchField.value;
  const res = store.filter((item) => {
    return item.colors[0] === colorSearchField.value;
  });
  return res;
};

colorSearchField.addEventListener("change", () => {
  const result = filterFunctColor();

  myCards.innerHTML = "";

  result.forEach((obj) => {
    return (myCards.innerHTML += `
    <div class="column">
      <div class="card">
        <figure class="image">
          <img src="${obj.imageUrl}" alt="">
        </figure>
        <p calss='title'>${obj.name}</p>
      </div>  
    </div>`);
  });
});

const dropDownValue = (dropDown) => {
  const selected = [...dropDown.options]
    .filter((option) => option.selected)
    .map((option) => option.value);
  select = selected[0];
  return select;
};

const typeFilterDropDown = () => {
  const searched = dropDownValue(heroTypes);
  const result = store.filter((item) => {
    return item.originalType === searched;
  });
  return result;
};

heroTypes.addEventListener("click", () => {
  const result = typeFilterDropDown();
  myCards.innerHTML = "";

  result.forEach((obj) => {
    return (myCards.innerHTML += `
        <div class="column">
          <div class="card">
            <figure class="image">
              <img src="${obj.imageUrl}" alt="">
            </figure>
            <p calss='title'>${obj.name}</p>
          </div>  
        </div>`);
  });
});

ascending.addEventListener("click", () => {
  const newStore = store.sort((a, b) =>
    a.name.length < b.name.length ? 1 : -1
  );

  myCards.innerHTML = "";
  myCards.innerHTML = newStore
    .map(
      (card) =>
        `<div class="column">
          <div class="card">
            <figure class="image">
              <img src="${card.imageUrl}" alt="">
            </figure>
            <p calss='title'>${card.name}</p>
          </div>
      </div>`
    )
    .join("");

  store.push(newStore);
});

descending.addEventListener("click", () => {
  const newStore = store.sort((a, b) =>
    a.name.length > b.name.length ? 1 : -1
  );

  myCards.innerHTML = "";
  myCards.innerHTML = newStore
    .map(
      (card) =>
        `<div class="column">
          <div class="card">
            <figure class="image">
              <img src="${card.imageUrl}" alt="">
            </figure>
            <p calss='title'>${card.name}</p>
          </div>
      </div>`
    )
    .join("");

  store.push(newStore);
});

const filterFunctColorDropDown = () => {
  const searched = dropDownValue(colorDropDown);
  const res = store.filter((item) => item.colors[0] === searched);
  return res;
};

colorDropDown.addEventListener("click", () => {
  const result = filterFunctColorDropDown();
  myCards.innerHTML = "";
  
  result.forEach((obj) => {
    return (myCards.innerHTML +=  `
    <div class="column">
      <div class="card">
        <figure class="image">
          <img src="${obj.imageUrl}" alt="">
        </figure>
        <p calss='title'>${obj.name}</p>
      </div>  
    </div>`);
  });
});


nameSearchField.addEventListener("change", () => {
  const result = filterFunct();
  console.log("resultat", result);

  reloadingFunction();
  myCards.innerHTML = "";

  myCards.innerHTML += `
    <div class="column">
      <div class="card">
        <figure class="image">
          <img src="${result[0].imageUrl}" alt="">
        </figure>
        <p calss='title'>${result[0].name}</p>
      </div>
    </div>`;
});

const fetchCards = async () => {
  const response = await fetch(
    API_CARDS +
      new URLSearchParams({
        name,
        random: false,
        pageSize: 100,
        language: "English",
      })
  );
  const json = await response.json();
  const result = json.cards.filter((element) => element.imageUrl != undefined);
  return result;
};

const typeFunction = async () => {
  const response = await fetch(API_TYPE);
  const json = await response.json();
  const hero = json.types.forEach((item) => {
    heroTypes.innerHTML += `<option value="${item}">${item}</option>`;
    types.push(item);
  });
};
typeFunction();

const cardsRenderer = async () => {
  const result = await fetchCards(API_CARDS);
  const cards = result.forEach((card) => {
    const { id, name, colors, imageUrl, text } = card;
    myCards.innerHTML += `
      <div class="column">
        <div class="card">
          <figure class="image">
            <img src="${imageUrl}" alt="">
          </figure>
          <p calss='title'>${name}</p>
          </div>
      </div>`;
    store.push(card);
  });
  loader.style.display = "none";
};

cardsRenderer();
