const chalk = require("chalk");
const express = require('express');
const path = require('path');
const cors = require('cors');
const Olx = require('./scrapper/Olx');
const Allegro = require('./scrapper/Allegro');
const { validate } = require('./utils/helpers');

const publicFolder = path.join(__dirname, '..', 'frontend','build');

const app = express();

app.use(cors());
app.use(express.static(publicFolder));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicFolder, 'index.html'));
});

app.get('/offers', async (req, res) =>{
  console.log(`Request type: GET | path: /offers`);

  //Init scrappers
  const allegro = new Allegro();
  const olx = new Olx();

  let results = [];

  try {
    await olx.initialize();
    await allegro.initialize();
    results = [...olx.returnAllResults(), ...allegro.returnAllResults()];
    results = validate(results);
    console.log(
      chalk`Status: {green 200} \nTotal results: {green ${results.length}}`
    );

    //res.status(200).send(JSON.stringify(results));
    res.status(200).json(results);

  } catch(err) {
    console.log(chalk`There was an {red error}: \n{red ${err}}`);
    res.status(500).send('Something went wrong...')
  }

})

app.get('*', (req, res) => {
  res.status(404).send('Invalid request');
})

app.listen(8000, () =>{
  console.log(chalk`Server is running at port {blue 8000}`);
})