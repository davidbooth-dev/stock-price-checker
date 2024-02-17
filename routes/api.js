"use strict";

const IP = require("ip");
const { saveStock } = require("../controllers/convertHandler");
//const Stock = require('../models/stock.model')

// For Testing
const generateIP = () => {
  return (
    Math.floor(Math.random() * 255) +
    1 +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255)
  );
};

const parseStockData = (data) => {
  const likes = data.length === 4 ? data.slice(0, 2) : data.slice(0, 1);
  const values = data.length === 4 ? data.slice(2) : data.slice(1);

  let stockData = values.map((stock) => ({
    stock: String(stock.symbol),
    price: Number(stock.latestPrice),
  }));

  if (data.length === 4) {
    stockData[0].rel_likes = Number(likes[0].likes) - Number(likes[1].likes);
    stockData[1].rel_likes = Number(likes[1].likes) - Number(likes[0].likes);
  } else {
    stockData = stockData[0];
    stockData.likes = Number(likes[0].likes);
  }

  return stockData;
};

module.exports = function (app) {
  app.route("/api/stock-prices").get(async (req, res) => {
    const stock = req.query.stock;
    const like = req.query.like === "true" ? true : false;
  
    let symbols = !Array.isArray(stock) ? [stock] : stock;

    const ip = IP.address();

    let promises = [];

    symbols.forEach((symbol) => promises.push(saveStock(symbol, ip, like)));

    symbols.forEach((symbol) => {
      let request = fetch(
        `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`,
      ).then((res) => res.json());
      promises.push(request);
    });

    Promise.all(promises).then((data) => {
      let stockData = parseStockData(data, like);
      res.status(200).json({ stockData: stockData });
    });
  });
};
