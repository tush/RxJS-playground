import { defer, of } from "rxjs";

const pokemon = ["Squirtle", "Charmander", "Bulbasaur", "Pikachu"];

function getRandomPokemon() {
  return pokemon[Math.floor(Math.random() * 3)];
}

// Each subscriber to this Observable will receive the same value, because the getRandomPokemon function is executed once, when the Observable is created
const randomPokemon$ = of(getRandomPokemon());

// Each subscriber to this Observable will receive a random Pokemon because the getRandomPokemon function is executed with each subscription
const randomPokemonForReal$ = defer(() => of(getRandomPokemon()));

// Each time we subscribe we'll receive the same value, because we're subscribing to the same Observable
randomPokemon$.subscribe(console.log);
// Output: Charmander
randomPokemon$.subscribe(console.log);
// Output: Charmander
randomPokemon$.subscribe(console.log);
// Output: Charmander

// Each time we subscribe we'll receive different values, because we're subscribing to different Observables
randomPokemonForReal$.subscribe(console.log);
// Output: Charmander
randomPokemonForReal$.subscribe(console.log);
// Output: Squirtle
randomPokemonForReal$.subscribe(console.log);
// Output: Pikachu
