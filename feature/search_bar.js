"use strict";

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

const queryEl = document.getElementById('query');
const filterEl = document.getElementById('filter');
const resultsEl = document.getElementById('results');

const search = () => {
    const key = filterEl.value;
    const value = queryEl.value.trim();

    resultsEl.innerHTML = ! value ? '' : beerDatabase
        .filter(beer => beer[key].toLowerCase().indexOf(value.toLowerCase()) !== -1)
        .map(({name, style, origin}) => `<div>${name}, ${style} (${origin})</div>`)
        .reduce((html, template) => html + template, '')
}

queryEl.addEventListener('input', search, false);
filterEl.addEventListener('input', search, false);