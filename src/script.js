
let PokemonJson = [];

let allPokemon;
let Pokemon;
let PokemonImage;
async function getAllPokemon() {  //holt alle Pokemon aus dem array

    let allPkmUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1126&offset=0';
    let allResponse = await fetch(allPkmUrl);
    allPokemon = await allResponse.json();
    for (let i = 0; i < 48; i++) {
        let onePkmUrl = allPokemon['results'][i]['url']
        await getPokemon(onePkmUrl, i);
    }
}

async function getPokemon(onePkmUrl, i) {
    let response = await fetch(onePkmUrl);
    Pokemon = await response.json();
    PokemonJson.push(Pokemon);
    console.log(Pokemon);
    renderPokemon(i)
}

function renderPokemon(i) {
    document.getElementById('all-pokemon').innerHTML += /*html*/`   
    <div onclick="renderPokemonInfoBig(${i})">
        <div class="pokemon ${i}">
          <img class="all-pokemon-image" id="pokemon-images ${i}" src="">
        <div class="pokemon-short-info">
            <div class="pokemon-number " id="pokemon-number ${i}">
            </div>
            <div class="pokemon-names" id="pokemon-names ${i}">
            </div> 
            <div id="type${Pokemon['name']}" class="pokemon-types">
              
            </div>
         </div>
        </div>
    </div> 
    `;
    pokemonInfo(i);
    renderPokemonTypes();    
}

function renderPokemonTypes(){
    for(let i = 0; i< Pokemon['types'].length; i++){
        document.getElementById(`type${Pokemon['name']}`).innerHTML += `<span class="pkm-type-container ${Pokemon['types'][i]['type']['name']}" >${Pokemon['types'][i]['type']['name']}</span>` 
    }
}

function pokemonInfo(i) {
    for (let p = 0; p < PokemonJson.length; p++) {
        let PokemonImage = PokemonJson[p]['sprites']['other']['official-artwork']['front_default'];
        document.getElementById(`pokemon-names ${i}`).innerHTML = `<b> ${PokemonJson[p]['name']}</b>`;
        document.getElementById(`pokemon-images ${i}`).src = PokemonImage;
        document.getElementById(`pokemon-number ${i}`).innerHTML = `<b>#0${PokemonJson[p]['id']}</b>`;
       
    }
}

function renderPokemonInfoBig(i) {

    document.getElementById('pokemon-container').classList.remove('d-none');
    let PokemonImage = PokemonJson[i]['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('showPokedex').classList.add('d-none');
    document.getElementById(`pokemon-name`).innerHTML = PokemonJson[i]['name'];
    document.getElementById(`pokemon-image`).src = PokemonImage;
    document.getElementById('pkm-type').innerHTML = `<div class="type-onclicked-pkm-container" id="typeOnclickedpkm${PokemonJson[i]['name']}">
                                                    </div>`
    document.getElementById('pkm-weight').innerHTML = `${PokemonJson[i]['weight']} KG`;
    document.getElementById('pkm-height').innerHTML = `${PokemonJson[i]['height']} M`;
    PokemonHPStat(i);
    renderPokemonTypesForOnclickedPokemon(i)
}
//----------Diese funktion rendert den PokemonTypen vom ausgewähltem Pokemon------------------//
function renderPokemonTypesForOnclickedPokemon(i){
     for(let x = 0; x< Pokemon['types'].length; x++){
        document.getElementById(`typeOnclickedpkm${PokemonJson[i]['name']}`).innerHTML += `<span class="pkm-type-container ${PokemonJson[i]['types'][x]['type']['name']}" >${PokemonJson[i]['types'][x]['type']['name']}</span>` 
    }
}
//---------------Diese Functionen zeigen alle Base Stas des gewählten Pokemon an----------------//

function PokemonHPStat(i) {
    let pkmHP = PokemonJson[i]['stats'][0]['base_stat'];
    document.getElementById('hp-progress-bar').style = `width: ${pkmHP}px`;
    document.getElementById('hp-progress-bar').innerHTML = `<b>${pkmHP}</b>`;
    PokemonATKStat(i);
    PokemonDEFStat(i);
    PokemonSPDStat(i);
    PokemonEXPStat(i);
}

function PokemonATKStat(i) {
    let pkmATK = PokemonJson[i]['stats'][1]['base_stat'];
    document.getElementById('atk-progress-bar').style = `width: ${pkmATK}px`;
    document.getElementById('atk-progress-bar').innerHTML = `<b>${pkmATK}</b>`;
}

function PokemonDEFStat(i) {
    let pkmDEF = PokemonJson[i]['stats'][2]['base_stat'];
    document.getElementById('def-progress-bar').style = `width: ${pkmDEF}px`;
    document.getElementById('def-progress-bar').innerHTML = `<b>${pkmDEF}</b>`;
}

function PokemonSPDStat(i) {
    let pkmSPD = PokemonJson[i]['stats'][5]['base_stat'];
    document.getElementById('spd-progress-bar').style = `width: ${pkmSPD}px`;
    document.getElementById('spd-progress-bar').innerHTML = `<b>${pkmSPD}</b>`;
}

function PokemonEXPStat(i) {
    let pkmEXP = PokemonJson[i]['base_experience'];
    let pkmEXPProgress = pkmEXP / 2;
    document.getElementById('exp-progress-bar').style = `width: ${pkmEXPProgress}px`;
    document.getElementById('exp-progress-bar').innerHTML = `<b>${pkmEXP}</b>`;
}

function backToAllPkm() {
    document.getElementById('pokemon-container').classList.add('d-none');
    document.getElementById('showPokedex').classList.remove('d-none');

}

