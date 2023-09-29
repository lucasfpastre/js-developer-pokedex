const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const returnButton = document.getElementById('returnButton');
const maxRecords = 151;
const limit = 10;
let offset = 0;
let pokedexData = '';

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onClick="openDetails(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemonToDetails(pokemon) {
    return `
        <section class="innerContent ${pokemon.type}">
            <div class="return">
                <button id="returnButton" type="button" onClick="returnPokedex()">
                    Back
                </button>
            </div>
            <div>
                <lo id="pokemonDetails">
                    <li class="selectedPokemon">
                        <spam class="number">#${pokemon.number}</spam>
                        <spam class="name">${pokemon.name}</spam>
                        <div class="detail">
                            ${pokemon.types.map((type) => `<spam class="detailsType ${type}">${type}</spam>`).join('')}
                        </div>
                        <div>
                            <lo>
                                <li>
                                    <spam class="description">Height</spam>
                                    <spam class="statValue">${pokemon.height}</spam>
                                </li>
                                <li>
                                    <spam class="description">Weight</spam>
                                    <spam class="statValue">${pokemon.weight}</spam>
                                </li>
                            </lo>
                        </div>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </li>
                </lo>
            </div>
    </section>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        pokedexData += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})

function returnPokedex() {
    pokemonList.innerHTML = pokedexData;
    loadMoreButton.style.visibility = 'visible'
}

function openDetails(number) {
    loadMoreButton.style.visibility = 'hidden'
    pokeApi.getDetail(number).then((pokemon = [])=> {
        const newHtml = convertPokemonToDetails(pokemon);
        pokemonList.innerHTML = newHtml;
    })
}