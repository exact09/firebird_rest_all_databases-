const { json } = require("body-parser");
const request = require("request");

module.exports = function (router, Firebird, options) {
  //

  //

  router.get("/api/:tabela", function (req, res) {
    let tabela = req.params.tabela;
    // module.exports = { tabela };
    Firebird.attach(options, function (err, db) {
      if (err) throw err;
      db.query(`SELECT * FROM ${tabela}`, function (err, result) {
        res.json(result);
        db.detach();
        console.log("pa id", tabela);
        return tabela;
      });
    });
  });
  // console.log("/api/:tabela");

  router.get("/api/:tabela/:id", function (req, res) {
    //fillimi i endpoint per shpallje ne web server '/'-> emri i funksionit me posht
    let tabela = req.params.tabela;
    let id = req.params.id;
    // module.exports = { tabela, id };
    Firebird.attach(options, function (err, db) {
      if (err) throw err;
      db.query(
        `SELECT * FROM ${tabela} where id=${Firebird.escape(id)}`,
        function (err, result) {
          res.json(result);
          db.detach();
          console.log("me id");
        }
      );
    });
  });
  //console.log("/api/:tabela/:id");
  //behet update ose edit tabela -- e preferueshem id ne URI

  router.put("/api/:tabela/:id", function (req, res) {
    console.log("put commanda");

    let tabela = req.params.tabela;
    let id = req.params.id;
    module.exports = { tabela, id };
    //const fushat_let = require("../utils/variables.js");

    //const item_field_get = require("../utils/variables.js");
    item_field_get = require("../utils/variables");

    console.log("values= ", item_field_get);
    const query_update = require("../utils/variables.js");
    console.log("query e importume ", query_update);

    console.log("item  field perfundon");
    Firebird.attach(options, function (err, db) {
      if (err) throw err;
      // db = DATABASE
      db.query(query_update + ` where id=${id}`, function (err, result) {
        res.json(result);
        db.detach();
      });
    });
  });

  //insert shenime te reja ne tabele
  router.post("/post/:tabela", function (req, res) {
    //Kjo Funksionon OK  fillimi i endpoint per shpallje ne web server '/vitet'-> emri i funksionit me posht
    let tabela = req.params.tabela;
    module.exports = { tabela };
    const query_insert_noId = require("../utils/variables");
    const request_body_routes = require("../utils/variables");
    request_body_routes;

    Firebird.attach(options, function (err, db) {
      if (err) throw err;
      db.query(
        query_insert_noId,
        //`INSERT INTO ${Firebird.escape(tabela)} (EMRI, MBIEMRI, PRINDI, MOB, E_MAIL, VENDBANIMI, ADRESA) VALUES (?, ?, ?, ?, ?, ?) RETURNING ID`,[emri, mbiemri, prindi, mob, e_mail, vendbanimi, adresa],
        function (err, result) {
          // IMPORTANT: close the connection
          res.json(result);
          db.detach();
        }
      );
    });
  });
};
