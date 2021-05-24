const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", async (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  // console.log(randomQuote);
  res.send({ quote: randomQuote });
});

app.get("/api/quotes", (req, res, next) => {
  // check if user did specify an author name

  const filterQuotes = quotes.filter((author) => {
    if (author.person == req.query.person) {
      return author.person;
    }
  });
  if (req.query.person) {
    res.send({ quotes: filterQuotes });
  } else {
    res.send({ quotes: quotes });
  }
});

app.post("/api/quotes", (req, res, next) => {
  const person = req.query.person;
  const quote = req.query.quote;
  // check if both properties, person and quote, exist in query
  if (quote && person) {
    quotes.push({ quote: quote, person: person });
    res.send({ quote: { quote, person } });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
