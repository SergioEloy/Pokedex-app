const pokemonCard = document.querySelector("pkm-card")
const pokemonName = document.querySelector("name")
const searchInput = document.querySelector(".search-input")
const resetButton = document.querySelector(".reset");
const container = document.getElementById("main")
const pokemonCounter = 12 //You can change this value to obtain that quantity of pokemon

//to construct the qty of cards accord to the pokemon counter by the id
const fetchPokemon = async () => {
    for (let i = 1; i <= pokemonCounter; i++) {
        await getPokemon(i)
    }}

    //to get the data by the pokemon id
function getPokemon(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;//url according the id
    fetch(url)
    .then(res => res.json())
    .then(data => {//how we manage the data
        const id = data.id;
        const number = data.id.toString().padStart(4, "0")
        const name = data.name;
        const attack = data.stats[1].base_stat;
        const defense = data.stats[2].base_stat;
        const hp = data.stats[0].base_stat;
        const speed = data.stats[5].base_stat;
        const types = data.types.map(type => type.type.name)

        const card = document.createElement("div");//we are creating the card in the HTML
        card.classList.add("pkm-card");
        //the cards will have the information that the api provided
        card.innerHTML = `
        <div class="pkm-nmbr">
          <span class="pkm-id">${number}</span>
        </div>
        <div class="pkm-sprite">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"
            alt="Pokemon Sprite"
            class="pkm-img"
          />
        </div>
        <div class="pkm-name">
          <a
            href="https://pokemon.fandom.com/wiki/${name}"
            target="_blank"
            class="name"
            >${name.toUpperCase()}</a
          >
        </div>
        <div class="pkm-types">
        ${types.map(type => `<span">${type}</span>`).join(', ').toUpperCase()}
        </div>
        <div class="stats">
            <span class="atk">Attack Value: ${attack}</span>
            <span class="spd">Speed Value: ${speed}</span>
            <span class="def">Defense Value: ${defense}</span>
            <span class="hp">HP: ${hp}</span>
        </div>
        `
        const pokemonContainer = container.appendChild(card)
    })
    .catch(error => {console.error(error, error.message);
    container.innerHTML = `<h1>Something went wrong! please refresh</h1>`;})

}

fetchPokemon()//we execute the fetch everytime we enter the page

//how the search listen to the user
searchInput.addEventListener("input", () => {
    const searchTxt = searchInput.value.toLowerCase();
    filterPkm(searchTxt);
})

//how the search works
function filterPkm(searchTxt) {
   const cards = document.querySelectorAll(".pkm-card")
   cards.forEach(card => {
    const pkmname = card.querySelector(".name").textContent.toLowerCase();
    if (pkmname.includes(searchTxt)){
        card.style.display = "flex"
    } else {
        card.style.display = "none";
    }
   })
}

//how the reset buttons works
resetButton.addEventListener('click', () => {
  searchInput.value = '';
  filterPkm('');
});