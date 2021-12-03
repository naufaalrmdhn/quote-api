const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    const personsQuotes = quotes.filter(quote => quote.person === person);
    if (!person) {
        res.send({ "quotes": quotes });
    } else if (personsQuotes) {
        res.send({ "quotes": personsQuotes });
    } else {
        res.send({ "quotes": [] });
    }
})

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes)
    res.send({ "quote": randomQuote });
})

app.post('/api/quotes', (req, res, next) => {
    const quote = {
        quote: req.query.quote,
        person: req.query.person
    };
    if (!quote.quote || !quote.person) {
        res.status(400).send();
    } else {
        quotes.push(quote);
        res.status(201).send({ "quote": quote });
    }
})

app.listen(PORT, function(err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})