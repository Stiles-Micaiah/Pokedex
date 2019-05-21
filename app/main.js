import PokemonController from "./components/controller.js";



class App {
  constructor() {
    this.controllers = {
      pokeController: new PokemonController()////////////////////
    }
  }
}



window['app'] = new App()//////////////