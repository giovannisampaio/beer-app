"use strict";
alert("connected");
$( document ).ready(function(){
    $(".dropdown-button").dropdown();
});

//Dummy database of beers
var beerDatabase = [
    {
        name: "Bunny Frank",
        style: "stout",
        origin: "germany"
    },
    {
        name: "Baily Blue",
        style: "lager",
        origin: "usa"
    },
    {
        name: "Pumpkin Hatter",
        style: "amber ale",
        origin: "usa"
    },
    {
        name: "Str8 Kickin",
        style: "ipa",
        origin: "usa"
    }
];
//text input field, drop down, results area respectively
const queryEl = document.getElementById('query');
const filterEl = document.getElementById('filter');
const resultsEl = document.getElementById('results');

//trimming the whitespace off the user input
const search = () => {
    const key = filterEl.value;
    const value = queryEl.value.trim();
//if user input is not an empty string : filter through the beer DB for matching character, append to results
    resultsEl.innerHTML = ! value ? '' : beerDatabase
        .filter(beer => beer[key].toLowerCase().indexOf(value.toLowerCase()) !== -1)
        .map(({name, style, origin}) => `<div>${name}, ${style} (${origin})</div>`)
        .reduce((html, template) => html + template, '')
}

queryEl.addEventListener('input', search, false);
filterEl.addEventListener('input', search, false);