const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("GET request to /api/stock-prices", () => {
    test("Viewing one stock", (done) => {
      chai
        .request(server)
        .get("/api/stock-prices")
        .query({ stock: "MSFT" })
        .end((req, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.property(
            res.body,
            "stockData",
            "There should be a stockData property",
          );
          assert.property(
            res.body.stockData,
            "stock",
            "There should be a stock property",
          );
          assert.property(
            res.body.stockData,
            "price",
            "There should be a price property",
          );
          assert.property(
            res.body.stockData,
            "likes",
            "There should be a likes property",
          );
          assert.equal(res.body.stockData.stock, "MSFT");

          assert.isNumber(res.body.stockData.price);
          assert.isNumber(res.body.stockData.likes);
          //assert.equal(res.body.stockData.likes, 0)

          done();
        });
    });
    test("Viewing one stock and liking it", (done) => {
      chai
        .request(server)
        .get("/api/stock-prices")
        .query({ stock: "MSFT", like: true })
        .end((req, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.property(
            res.body,
            "stockData",
            "There should be a stockData property",
          );
          assert.property(
            res.body.stockData,
            "stock",
            "There should be a stock property",
          );
          assert.property(
            res.body.stockData,
            "price",
            "There should be a price property",
          );
          assert.property(
            res.body.stockData,
            "likes",
            "There should be a likes property",
          );
          assert.equal(res.body.stockData.stock, "MSFT");

          assert.isNumber(res.body.stockData.price);
          assert.isNumber(res.body.stockData.likes);
          assert.isAtLeast(res.body.stockData.likes, 1);

          done();
        });
    });
    test("Viewing one stock and liking it again", (done) => {
      chai
        .request(server)
        .get("/api/stock-prices")
        .query({ stock: "MSFT", like: true })
        .end((req, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.property(
            res.body,
            "stockData",
            "There should be a stockData property",
          );
          assert.property(
            res.body.stockData,
            "stock",
            "There should be a stock property",
          );
          assert.property(
            res.body.stockData,
            "price",
            "There should be a price property",
          );
          assert.property(
            res.body.stockData,
            "likes",
            "There should be a likes property",
          );
          assert.equal(res.body.stockData.stock, "MSFT");

          assert.isNumber(res.body.stockData.price);
          assert.isNumber(res.body.stockData.likes);
          assert.isAtLeast(res.body.stockData.likes, 1);

          done();
        });
    });
    test("Viewing two stocks", (done) => {
      chai
        .request(server)
        .get("/api/stock-prices")
        .query({ stock: ["MSFT", "GOOG"] })
        .end((req, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.property(
            res.body,
            "stockData",
            "There should be a stockData property",
          );
          assert.isArray(res.body.stockData, "stockData should be an array");

          assert.property(
            res.body.stockData[0],
            "stock",
            "There should be a stock property",
          );
          assert.property(
            res.body.stockData[0],
            "price",
            "There should be a price property",
          );
          assert.property(
            res.body.stockData[0],
            "rel_likes",
            "There should be a rel_likes property",
          );
          assert.equal(res.body.stockData[0].stock, "MSFT");

          assert.isNumber(res.body.stockData[0].price);
          assert.isNumber(res.body.stockData[0].rel_likes);

          assert.property(
            res.body.stockData[1],
            "stock",
            "There should be a stock property",
          );
          assert.property(
            res.body.stockData[1],
            "price",
            "There should be a price property",
          );
          assert.property(
            res.body.stockData[1],
            "rel_likes",
            "There should be a rel_likes property",
          );
          assert.equal(res.body.stockData[1].stock, "GOOG");

          assert.isNumber(res.body.stockData[1].price);
          assert.isNumber(res.body.stockData[1].rel_likes);

          done();
        });
    });
    test("Viewing two stocks and liking both", (done) => {
      chai
        .request(server)
        .get("/api/stock-prices")
        .query({ stock: ["MSFT", "GOOG"], like: true })
        .end((req, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, "response should be an object");
          assert.property(
            res.body,
            "stockData",
            "There should be a stockData property",
          );
          assert.isArray(res.body.stockData, "stockData should be an array");

          assert.property(
            res.body.stockData[0],
            "stock",
            "There should be a stock property",
          );
          assert.property(
            res.body.stockData[0],
            "price",
            "There should be a price property",
          );
          assert.property(
            res.body.stockData[0],
            "rel_likes",
            "There should be a rel_likes property",
          );
          assert.equal(res.body.stockData[0].stock, "MSFT");

          assert.isNumber(res.body.stockData[0].price);
          assert.isNumber(res.body.stockData[0].rel_likes);

          assert.property(
            res.body.stockData[1],
            "stock",
            "There should be a stock property",
          );
          assert.property(
            res.body.stockData[1],
            "price",
            "There should be a price property",
          );
          assert.property(
            res.body.stockData[1],
            "rel_likes",
            "There should be a rel_likes property",
          );
          assert.equal(res.body.stockData[1].stock, "GOOG");

          assert.isNumber(res.body.stockData[1].price);
          assert.isNumber(res.body.stockData[1].rel_likes);

          done();
        });
    });
  });
});
