const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";

const div = document.querySelector(".pokemons");
const pageNumber = document.querySelector(".pages");
const searchBar = document.querySelector(".search");
const img = document.querySelector(".img");
const pokemonInfo = document.querySelector(".info");

const getPokemon = async function () {
  //get api
  const res = await fetch(pokemonListUrl);
  const data = await res.json();

  console.log(data);
  console.log(data.results.length);

  for (let i = data.results.length - 1; i > 0; i--) {
    //display page number
    const inicio = (data.results.length - 1) * 18;
    const fim = data.results.length * 18;

    const pages = `<div>${data.results.slice(inicio, fim)}</div>`;
    pageNumber.insertAdjacentHTML("afterbegin", pages);

    //get pictures
    const resPic = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`);
    const dataPic = await resPic.json();

    //console.log("data pic");
    //console.log(dataPic.types[0].type.name);

    //display on site
    const html = `
    <div class="box">
  <div class="type-${dataPic.types[0].type.name}">${data.results[i].name}</div>
  <img class="img" src="${
    dataPic.sprites.front_default
  }" width="100" height="100" value="${i + 1}">
  </div>
  `;

    div.insertAdjacentHTML("afterbegin", html);
  }
};

getPokemon();

searchBar.addEventListener("click", async function (e) {
  //get api
  const res = await fetch(pokemonListUrl);
  const data = await res.json();

  console.log(data);
  console.log(data.results.length);

  for (let i = 0; i > data.results.length - 148; i++) {
    //get pictures
    const resPic = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`);
    const dataPic = await resPic.json();

    //console.log(dataPic);

    //display on site
    const html = `
  <div>${e.value === data.results[i].name ? data.results[i].name : ""}</div>
  <img src="${
    e.value === data.results[i].name ? dataPic.sprites.front_default : ""
  }" width="100" height="100">
  `;

    div.insertAdjacentHTML("afterbegin", html);
  }
});

//get details pokemon
img.addEventListener("click", async function (e) {
  if (!e.value) return;

  console.log(e);

  const resPic = await fetch(`https://pokeapi.co/api/v2/pokemon/${e.value}/`);
  const dataPic = await resPic.json();

  const html = `
  <div class="type-${dataPic.types[0].type.name}">${data.results[0].name}</div>
  
  `;

  pokemonInfo.insertAdjacentHTML("afterbegin", html);
});
