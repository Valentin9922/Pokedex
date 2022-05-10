
let currentPokemon;

async function loadPokemon(){
    
    let url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    let response = await fetch(url);
    currentPokemon = await  response.json();
    console.log('loaded Pokemon', currentPokemon);

    pokemonInfo();
}

function pokemonInfo(){
    let PokemonImage = currentPokemon['sprites']['front_default'];
    document.getElementById('pokemon-name').innerHTML = currentPokemon['name'];
    document.getElementById('pokemon-image').src = PokemonImage;
    document.getElementById('first-pkm-type').innerHTML = `<b>${currentPokemon['types'][0]['type']['name']}</b>`;
    document.getElementById('pkm-weight').innerHTML = `${currentPokemon['weight']} KG`;
    document.getElementById('pkm-height').innerHTML = `${currentPokemon['height']} M`;

}