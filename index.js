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






// AJAX


import { ajax } from "rxjs/ajax";
// We're going to use the ghibliapi, I'm a big fan

// Observable will emit the entire AjaxResponse object
const ghibliFilmsResponse$ = ajax("https://ghibliapi.herokuapp.com/films");

// Observable will only emit the response data
const ghibliFilm$ = ajax.getJSON("https://ghibliapi.herokuapp.com/films");

// What if we need custom headers? No problem!
const ghibliFilmWithHeaders$ = ajax({
  url: 'https://ghibliapi.herokuapp.com/films',
  method: 'GET',
  headers: {
    'Content-Type': 'json'
  },
  body: {
    message: "Custom message 'cause we're so cool"
  }
});



ghibliFilmsResponse$.subscribe(console.log);
// Output: AjaxResponse {xhr: {}, request: {}...}

ghibliFilm$.subscribe(films => console.log(films));
// Output: [Object, Object, Object...]

ghibliFilmWithHeaders$.subscribe(console.log);
// Output: AjaxResponse {xhr: {}, request: {}...}



// RANGE


import { range } from "rxjs";

// Observable will emit a sequence of numbers from 0 to 4 and complete
const number$ = range(5);

// Observable will emit a sequence of numbers from 1 to 5 and complete
const range$ = range(1, 5);

// Observable will emit a sequence of 10 numbers starting at 10 (from 10 to 19)
const moreNumber$ = range(10, 10);


// number$.subscribe(number => console.log(number));
// Output: 0, 1, 2, 3, 4

// range$.subscribe(console.log);
// Output: 1, 2, 3, 4, 5

// moreNumber$.subscribe(number => console.log(number));
// Output: 10, 11, 12, 13, 14, 15, 16, 17, 18, 19



// TIMER

import { timer } from "rxjs";

// Observable will emit one value (0) after 2s and complete
const onlyOneValue$ = timer(2000);

// Observable will wait 5s, then start emitting values every second
const number$ = timer(5000, 1000);


// onlyOneValue$.subscribe(console.log);
// Output: 0

// number$.subscribe(number => console.log(number));
// Output: 0, 1, 2, 3...



// INTERVAL

import { interval } from "rxjs";

// Observable will emit incremental numbers, one every second (1000ms)
const number$ = interval(1000);

// We didn't pass the interval size parameter, so default value is 0ms 
const superFastNumber$ = interval();



// number$.subscribe(console.log);
// Output: 0 1 2 3 4 5...

// Careful with this one, it will emit numbers very very quickly. Uncomment the following line to see it:
//superFastNumber$.subscribe(number => console.log(number));
// Output: O 1 2 3 4 5 6 7 8 9...



// fromEvent
import { fromEvent } from "rxjs";

// Creating an Observable from mouse clicks
const click$ = fromEvent(document, "click");

// Creating an Observable from pressed keys
const keyPressed$ = fromEvent(document, "keydown");

// Creating an Observable from scroll changes
const scroll$ = fromEvent(document, "scroll");

// Creating an Observable from copy action
const copie$ = fromEvent(document, "copy");



click$.subscribe(click => console.log(click));
// Output: MouseEvent {}

keyPressed$.subscribe(console.log);
// Output: KeyboardEvent {}

scroll$.subscribe(scroll => console.log(scroll));
// Output: UIEvent {}

copie$.subscribe(console.log);
// Output: ClipboardEvent {}




// from
import { from } from 'rxjs'; 

// Creating an Observable from a string
const letter$ = from("RxJS is cool");

// Creating an Observable from an array of strings
const fruit$ = from(["Strawberry", "Cherry", "Blackberry"]);

// Creating an Observable from a Map object
const pokemon$ = from(
  new Map([
    ["Squirtle", "Water"],
    ["Charmander", "Fire"],
    ["Bulbasur", "Grass"]
  ])
);

// Creating an Observable from a promise
const promise$ = from(
  Promise.resolve("I promise to start learning RxJS")
);

// Creating an Observable from a nodeList
const node$ = from(document.querySelectorAll("p"));



pokemon$.subscribe(pokemon => console.log(pokemon));
letter$.subscribe(letter => console.log(letter));
// Output: "R","x","J","S"," ","i","s"," ","c","o","o","l"

fruit$.subscribe(console.log);
// Output: "Strawberry", "Cherry", "Blackberry"

pokemon$.subscribe(console.log);
// Output: ["Squirtle", "Water"], ["Charmander", "Fire"], ["Bulbasur", "Grass"]

promise$.subscribe(promise => console.log(promise));
// Output "I promise to start learning RxJS"

node$.subscribe(node => console.log(node));
/* Output: 
HTMLParagraphElement {tagName: "p", innerHTML: "Chocolate"...}
HTMLParagraphElement {tagName: "p", innerHTML: "Vanilla"...}
HTMLParagraphElement {tagName: "p", innerHTML: "Coconut"...}
*/

