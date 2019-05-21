import PokemonService from "./service.js";


let _pokeService = new PokemonService()

function _drawApiPokemon() {
  let pokemon = _pokeService.ApiPokemon
  let template = ''
  for (let i = 0; i < pokemon.length; i++) {
    let poke = pokemon[i];
    template += poke.getTemplate
  }
  document.querySelector('#api-pokemon').innerHTML = template
}

function _drawActivePokemon() {
  document.querySelector('#active-pokemon').innerHTML = _pokeService.ActivePokemon.getTemplate()
}


function _drawMyPokemon() {
  let pokemon = _pokeService.MyPokemon
  let template = ''
  for (let i = 0; i < pokemon.length; i++) {
    let poke = pokemon[i];
    template += poke.getTemplate
  }
  document.querySelector('#my-pokemon').innerHTML = template
}



export default class PokemonController {
  constructor() {
    _pokeService.addSubscribers('apiPokemon', _drawApiPokemon)
    _pokeService.addSubscribers('activePokemon', _drawActivePokemon)//////////////////
    _pokeService.addSubscribers('myPokemon', _drawMyPokemon)


    _pokeService.getApiPokemon()
    _pokeService.getMyPokemon()
  }

  getDetails(name) {
    _pokeService.getApiPokemon(name)
  }

  addPokemon() {
_pokeService.addPokemon
  }
  removePokemon(id) {
    _pokeService.removePokemon(id)
  }
}