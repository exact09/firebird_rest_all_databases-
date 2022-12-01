const fs = require("fs");

var completed_file = (module.exports = function (router, Firebird, options) {
  router.get("/api/:tabela", function (req, res) {
    let tabela = req.params.tabela;
    module.exports = { tabela };
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

  router.get("/api/:tabela/:id", function (req, res) {
    //fillimi i endpoint per shpallje ne web server '/'-> emri i funksionit me posht
    let tabela = req.params.tabela;
    let id = req.params.id;
    module.exports = { tabela, id };
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

  //behet update ose edit tabela -- e preferueshem id ne URI

  router.put("/api/:tabela/:id", function (req, res) {
    console.log("put commanda");
    let tabela = req.params.tabela;
    let id = req.params.id;
    //console.log(id);
    //nxjerja e fushave--------------

    module.exports = { tabela, id };
    const { query_update, item_field_get } = require("../utils/search");
    //item_field_get;
    for (let key in item_field_get) {
      let value = item_field_get[key] + ";"; // get the value by key
      console.log(value);
      // fushat = value;
    }
    //-----------------------------
    //console.log("item  field", item_field_get);
    Firebird.attach(options, function (err, db) {
      if (err) throw err;
      // db = DATABASE
      db.query(query_update + ` where id=${id}`, function (err, result) {
        res.json(result);
        db.detach();
        console.log(query_update + ` where id=${id}`);
      });
    });
  });
  //insert shenime te reja ne tabele
  router.post("/post/:tabela", function (req, res) {
    //Kjo Funksionon OK  fillimi i endpoint per shpallje ne web server '/vitet'-> emri i funksionit me posht
    let tabela = req.params.tabela;
    module.exports = { tabela };
    const { query_insert_noId, rta2 } = require("../utils/search");
    rta2;
    console.log(rta2, query_insert_noId);
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
});
fs.writeFile(
  "./api-routes/routes_generated.js",
  JSON.stringify(completed_file),
  function (err) {
    if (err) throw err;
  }
);
