



//legen eine asyncrone Funktion an, da wir in der funktion mit dem..
//..befehl aiwait auf gewisse elemente warten müssen
async function getAllPokemon() {

    //holt alle Pokemon aus dem array
    //definiert eine variable für den link
    let allPkmUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1126&offset=0';

    //definiert eine Variable und der fetch() Befehl läd alle Daten von der url
    //das dauer seine zeit und damit die anderen funktionen erst ausgefürt werden..
    //..wenn es fertig geladen hat schreibt man await davor
    let allResponse = await fetch(allPkmUrl);

    //jetzt werden die geladenen Datein in ein Json gepackt 
    // dies dauer ebenfalls wieder und deshalb wieder await
    allPokemon = await allResponse.json();

    // in dem Json befinden sich alle url zu allen Pokemon 
    //wir  wollen aber nur 48 laden deswegen legen wir eine for-schleife an
    for (let i = 0; i < 48; i++) {
        //jz definieren wir eine Variable für alle urls
        let onePkmUrl = allPokemon['results'][i]['url']
        // jetzt rufen wir eine neue Funktion auf und..
        //..übergeben die variablen onePkmUrl und i
        //dies dauert ebensfall und deshalb arbeiten wir wieder mit await
        await getPokemon(onePkmUrl, i);
    }
}

//legen wieder eine asyncrone Funktion an, da wir in der funktion..
//..mit dem befehl aiwait auf gewisse elemente warten müssen
async function getPokemon(onePkmUrl, i) {

    //definiert eine Variable und der fetch() Befehl läd alle Daten von der url
    //das dauer seine zeit und damit die anderen funktionen erst ausgefürt werden.. 
    //..wenn es fertig geladen hat schreibt man await davor
    let response = await fetch(onePkmUrl);

    //jetzt werden die geladenen Datein in ein Json gepackt 
    // dies dauer ebenfalls wieder und deshalb wieder await
    Pokemon = await response.json();

    //Danach pushen wir die geladenen Jsons in das Array Pokemon
    PokemonJson.push(Pokemon);

    // um zu schauen ob alles geklappr hat lassen wir alle Infos.. 
    //..aus dem Array in der console ausspucken
    console.log(Pokemon);

    //jz können wir mit dem rendern der Pokemon beginnden in dem..
    //.wir die nächste funktion ausführen
    renderPokemon(i)
}
