const url = require('url');
const fs = require('fs');
const chalk = require('chalk');
const Olx = require('./scrapper/Olx');
const Allegro = require('./scrapper/Allegro');
const { validate } = require('./utils/helpers');

/* exports.offersRequest = async (req, res) => {
  const allegro = new Allegro();
  const olx = new Olx();

  //temporary disabled use mock data instead
  const reqUrl = url.parse(req.url, true);
  const query = reqUrl.query.q;

  let results = [];

  try {
    switch (query) {
      default:
        await olx.initialize();
        await allegro.initialize();
        results = [...olx.returnAllResults(), ...allegro.returnAllResults()];
        break;
      case 'olx':
        await olx.initialize();
        results = olx.returnAllResults();
        break;
      case 'allegro':
        await allegro.initialize();
        results = allegro.returnAllResults();
        break;
    }

    results = validate(results);
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(results));

    console.log(
      chalk`Status: {green 200} \nTotal results: {green ${results.length}}`
    );
  } catch (err) {
    console.log(chalk`There was an {red error}: \n{red ${err}}`);
    res.writeHead(500, { 'Content-type': 'text/plain' });
    res.end('Something went wrong...');
  }
}; */

exports.offersRequest = async (req, res) => {
  const results = fs.readFileSync(`${__dirname}/mockData.json`, 'utf-8');
 /*  const allegro = new Allegro();
  const olx = new Olx();

  //temporary disabled use mock data instead
  const reqUrl = url.parse(req.url, true);
  const query = reqUrl.query.q;

  let results = []; */

  try {
    /* switch (query) {
      default:
        await olx.initialize();
        await allegro.initialize();
        results = [...olx.returnAllResults(), ...allegro.returnAllResults()];
        break;
      case 'olx':
        await olx.initialize();
        results = olx.returnAllResults();
        break;
      case 'allegro':
        await allegro.initialize();
        results = allegro.returnAllResults();
        break;
    } */

    //res.header("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { 'Content-type': 'application/json',  "Access-Control-Allow-Origin": '*'});
    res.end(results);

    console.log(
      chalk`Status: {green 200} \nTotal results: {green ${results.length}}`
    );
  } catch (err) {
    console.log(chalk`There was an {red error}: \n{red ${err}}`);
    res.writeHead(500, { 'Content-type': 'text/plain' });
    res.end('Something went wrong...');
  }
}; 

exports.invalidRequest = res => {
  res.writeHead(404, { 'Content-type': 'text/plain' });
  res.end('Invalid request');
};
