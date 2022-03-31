

const fetchPokemon = (input) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`;
    fetch(url).then((res) =>{
        if (res.status == "200"){
            return res.json();
        } else if(res.status == "404"){
            getSprite("../src/sprites/pngwing.com.png");
        }
    }).then((data) => {
        let pokeId = data.id;
        let pokeName = data.name;
        let pokeSprite = data.sprites.front_default;
        let pokeType = data.types[0].type.name;

        let pokeStats = data.stats.map(function(statsList) {
            //const base_stat = [stat.base_stat, stat.

            console.log(statsList);
            return statsList;
        });
         
        let pokeMoves = data.moves.map(function(moveList) {
            //const base_stat = [stat.base_stat, stat.

            console.log(moveList);
            return moveList;
        });

        getId(pokeId);
        getName(pokeName);
        getSprite(pokeSprite);
        getType(pokeType);
        getStats(pokeStats);
        getMoves(pokeMoves);

    })

    
}

const getName = (string) => {
    const pokeName = document.getElementById("pokeName");

    pokeName.innerText = capitalize(string);
}
const getId = (id) => {
    const pokeId = document.getElementById("pokeId");

    pokeId.innerText = "N.° " + id;
}
const getSprite = (url) => {
    const pokeSprite = document.getElementById("pokeSprite");

    pokeSprite.src = url;
}

const getType = (string) => {
    const pokeType = document.getElementById("pokeType");

    pokeType.innerText = "Type: " + capitalize(string);
}

const getStats = (statsList) => {
    let pokeStats = document.getElementById("pokeStats");
    let statsLines = "";
    statsList.forEach((stat) => {
        statName = stat.stat.name;
        baseStat = stat.base_stat.toString();
        effort = stat.effort.toString();
        
        statsLines += statName + ": " + baseStat + " " + effort + "\n";
    })

    pokeStats.innerText = statsLines;
}
const getMoves = (movesList) => {
    let pokeMoves = document.getElementById("pokeMoves");
    let movesLines = "";
    movesList.forEach((move) => {
        moveName = move.move.name;
        
        movesLines += moveName + "\n";
    })

    pokeMoves.innerText = movesLines;
}
const getPokemonInput = (() => {
    let pokeInput = document.getElementById("pokeInput");

    pokeInput = pokeInput.value.toLowerCase();
    return pokeInput;

})

const pressChangeButton = () => {
    let pokeInput = getPokemonInput();
    
    fetchPokemon(pokeInput);

}

const enterKeyTrigger = () => {
    const pokeInput = document.getElementById("pokeInput");
    pokeInput.addEventListener("keypress", function(event){
        if(event.key === 'Enter'){
            pressChangeButton();
        }

    })

    

    
}

const capitalize = (string) => {
    let wordLower = string.toLowerCase();

    const capitalizedWord = wordLower.charAt(0).toUpperCase() + wordLower.slice(1);

    return capitalizedWord
}