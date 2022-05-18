
let FirstPokemonNames = ['bulbasaur', 'ivysaur' , 'venusaur', 'charmander', 'charmeleon', 'Charizard' , 'squirtle' , 'Wartortle' , 'Blastoise' ,
'caterpie', 'metapod', 'butterfree', 'weedle', 'kakuna', 'Beedrill', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'Raricate',  ];

let allPokemon;
let Pokemon;

async function getAllPokemon(){
    
        let allPkmUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
        let allResponse = await fetch(allPkmUrl);
        allPokemon = await allResponse.json();
        console.log(allPokemon);
        
        for( let i = 0; i< 25; i++){
            let onePkmUrl = allPokemon ['results'] [i] ['url']
            getPokemon(onePkmUrl, i);

        }
        
    }

    async function getPokemon(onePkmUrl, x){
        let url = onePkmUrl;
        let response = await fetch(url);
        Pokemon = await response.json();
        console.log(Pokemon);
        loadAllPokemon(x)
    }

function loadAllPokemon(x){
    	
    let PokemonImages = Pokemon['sprites'][x]['other']['official-artwork']['front_default'];
    document.getElementById('all-pokemon').src += PokemonImages;


}


function pokemonInfo(){
    let PokemonImage = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemon-name').innerHTML = currentPokemon['name'];
    document.getElementById('pokemon-image').src += PokemonImage;
    document.getElementById('first-pkm-type').innerHTML = `<b>${currentPokemon['types'][0]['type']['name']}</b>`;
    document.getElementById('pkm-weight').innerHTML = `${currentPokemon['weight']} KG`;
    document.getElementById('pkm-height').innerHTML = `${currentPokemon['height']} M`;
    PokemonHPStat();
}

function PokemonHPStat(){
    let pkmHP =  currentPokemon['stats'][0]['base_stat'];
    document.getElementById('hp-progress-bar').style = `width: ${pkmHP}px`;
    document.getElementById('hp-progress-bar').innerHTML = `<b>${pkmHP}</b>`;
    PokemonATKStat();
    PokemonDEFStat();
    PokemonSPDStat();
    PokemonEXPStat();
}

function PokemonATKStat(){
    let pkmATK =  currentPokemon['stats'][1]['base_stat'];
    document.getElementById('atk-progress-bar').style = `width: ${pkmATK}px`;
    document.getElementById('atk-progress-bar').innerHTML = `<b>${pkmATK}</b>`;
}

function PokemonDEFStat(){
    let pkmDEF =  currentPokemon['stats'][2]['base_stat'];
    document.getElementById('def-progress-bar').style = `width: ${pkmDEF}px`;
    document.getElementById('def-progress-bar').innerHTML = `<b>${pkmDEF}</b>`;
}

function PokemonSPDStat(){
    let pkmSPD =  currentPokemon['stats'][5]['base_stat'];
    document.getElementById('spd-progress-bar').style = `width: ${pkmSPD}px`;
    document.getElementById('spd-progress-bar').innerHTML = `<b>${pkmSPD}</b>`;
}

function PokemonEXPStat(){
    let pkmEXP =  currentPokemon['base_experience'];
    let pkmEXPProgress = pkmEXP / 2;
    document.getElementById('exp-progress-bar').style = `width: ${pkmEXPProgress}px`;
    document.getElementById('exp-progress-bar').innerHTML = `<b>${pkmEXP}</b>`;
}


