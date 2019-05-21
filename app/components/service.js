import Pokemon from "../models/pokemon.js";

let _pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Micaiah-S/pokemon'
})

let _state = {
  apiPokemon: [],
  activePokemon: {},
  myPokemon: []
}

let _subscribers = {
  apiPokemon: [],
  activePokemon: [],
  myPokemon: []
}



function _setSate(propName, Data) {
  _state[propName] = Data
  _subscribers[propName].forEach(fn => fn())
}


export default class PokemonService {

  addSubscribers(propName, fn) {
    _subscribers[propName].push(fn)///////////////////////
  }
  // .map(p => new Pokemon(p))// added the .map method
  get ApiPokemon() {
    return _state.apiPokemon
  }

  get MyPokemon() {
    return _state.myPokemon.map(p => new Pokemon(p))
  }

  get ActivePokemon() {
    return new Pokemon(_state.activePokemon)
  }

  getApiPokemon(name) {
    name = name || ''
    _pokeApi.get(name)
      .then(response => {
        let pokemonData = response.data
        if (!name) {
          _setSate('apiPokemon', pokemonData.results)
        } else {
          _setSate('activePokemon', new Pokemon(pokemonData))
        }
      })
  }

  getMyPokemon() {
    _sandbox.get()
      .then(response => {
        let pokemon = response.data.data.map(p => new Pokemon(p))
        _setSate('myPokemon', pokemon)
      })
      .catch(err => {
        console.error(err)
      })
  }



  addPokemon() {
    _sandbox.post('', _state.activePokemon)
      .then(response => {
        this.getMyPokemon()
      })
      .catch(err => {
        console.error(err)
      })
  }

  removePokemon(id) {
    _sandbox.delete(id)
      .then(response => {
        this.getMyPokemon()
      })
  }

}













