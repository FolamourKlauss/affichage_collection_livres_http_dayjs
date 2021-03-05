// Pour une présentation de notre séléction littéraire 
// nous utilisons un page web il nous faut donc la libraire http
// afin de créer notre serveur
const http = require('http');

//module dayjs pour jouer avec les dates
const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);
//Pour placer heure locale française
//const localeDate = require('dayjs/locale/fr');

//module pour mettre le temps actuel
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);


// Séléction de livres incontournables
const books = [
    {
        title: "The Fellowship of the Ring",
        language: "English",
        country: "United Kingdom",
        author: "J.R.R. Tolkien",
        date: "1954-07-29"
    },
    {
        title: "Prelude to foundation",
        language: "English",
        country: "United States",
        author: "Isaac Asimov",
        date: "1988-11-08"
    },
    {
        title: "Voyage au centre de la terre",
        language: "Français",
        country: "France",
        author: "Jules Verne",
        date: "1864-11-25"
    },
    {
        title: "La nuit des temps",
        language: "Français",
        country: "France",
        author: "René Barjavel",
        date: "1968-05-20"
    },
    {
        title: "Carrion Comfort",
        language: "English",
        country: "United States",
        author: "Dan Simmons",
        date: "1989-02-15"
    }
];



//Création tableau
let tabTile = '<tr><td>Titre</td>';
let tablanguage = '<tr><td>Langue</td>';
let tabCountry = '<tr><td>Pays</td>';
let tabAuthor = '<tr><td>Autheur</td>';
let tabDate = '<tr><td>Date</td>';
let tabAge = '<tr><td>Age</td>';
let endTab = '</tr>';

for (const bookObject of books) {
    //Formatage des dates avec Dayjs
    var formatedDate = dayjs(bookObject.date).format('dddd, MMMM Do YYYY');
    //Gestion de l'age des livres
    var a = dayjs()
    var str = a.to(bookObject.date);
    var age = str.split(' ');

    tabTile += `<td>${bookObject.title}</td>`;
    tablanguage += `<td>${bookObject.language}</td>`;
    tabCountry += `<td>${bookObject.country}</td>`;
    tabAuthor += `<td>${bookObject.author}</td>`;
    tabDate += `<td>${formatedDate}</td>`;
    tabAge += `<td>${dayjs().to(dayjs(bookObject.date), true)}</td>`;
};
tabTile = tabTile + endTab;
tablanguage = tablanguage  + endTab;
tabCountry = tabCountry + endTab;
tabAuthor = tabAuthor + endTab;
tabDate = tabDate + endTab;
tabAge = tabAge + endTab;

const content = `<table>${tabTile}${tablanguage}${tabCountry}${tabAuthor}${tabDate}${tabAge}</table>`;




// Création de notre serveur
const server = http.createServer((req, res) => {

    // On court-circuite l'appel automatique du navigateur au favicon.ico
    // sinon l'appel au script ce fera 2 fois et il ecrira "Hum, 50 alors ?" dedans
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }

    // On envoi les header de la réponse http
    // ici nous voulons une réponse de type text encodé en UTF-8
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    // On écrit l'entête de notre page html
    res.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title></head><body>');

    // Corps de la page
    res.write(`${content}`);

    // On écrit le pied de page de notre page html
    res.write('</body></html>');

    // On à fini d'envoyer nos informations au client
    res.end();
});

// Notre serveur sera sur le port 3000
server.listen(3000);