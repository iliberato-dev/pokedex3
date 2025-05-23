//VARIAVEIS GLOBAIS
const pokemonImage = document.querySelector(".pokemon__image");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

//CAPTURAR AS INFORMAÇÕES DA POKEAPI
const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;

    } else {
        console.log("error de conexão com a API");
    }
};

//RENDERIZAR POKEMON
const renderPokemon = async (pokemon) => {

    pokemonNumber.innerHTML = "🙄";
    pokemonName.innerHTML = "Loading...";
    pokemonImage.src = "https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700";

    setTimeout(() => { }, 4000);

    const data = await fetchPokemon(pokemon);

    //condição se tiver algo em data
    if (data) {
        console.log("conectado com a API");
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        input.value = "";
        searchPokemon = data.id;  

    } else {
        pokemonNumber.innerHTML = "X";
        pokemonName.innerHTML = "Not Found 😑";
        pokemonImage.src = "https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.gif";
    }


    console.log(data);
};


//Achar pokemon pelo input
form.addEventListener("submit", (event) => {
    event.preventDefault();

    renderPokemon(input.value);
});

//EVENTOS DOS BOTÕES
let searchPokemon = 1;

buttonPrev.addEventListener("click", () => {

    if (searchPokemon > 1) {

        searchPokemon--;

        renderPokemon(searchPokemon);
    }

});

buttonNext.addEventListener("click", () => {

    searchPokemon++;

    renderPokemon(searchPokemon);
});


renderPokemon(1);