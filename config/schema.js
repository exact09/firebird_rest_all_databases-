//SQL Tregon krejt tabelat ne database
/*
var sql_trego_tabelat =
  "SELECT a.RDB$RELATION_NAME as tablename FROM RDB$RELATIONS a WHERE COALESCE(RDB$SYSTEM_FLAG, 0) = 0 AND RDB$RELATION_TYPE = 0 ";
*/
//tregon tabelat dhe fushat ne krejt tabelat
var sql_trego_tabelat_fushat =
  "select f.rdb$relation_name as tablename, f.rdb$field_name as fieldname from rdb$relation_fields f join rdb$relations r on f.rdb$relation_name = r.rdb$relation_name and r.rdb$view_blr is null and (r.rdb$system_flag is null or r.rdb$system_flag = 0) order by 1, f.rdb$field_position;";
const res = require("express/lib/response");

var fs = require("fs");
//const rearange = require("./rearange");

module.exports = function (router, Firebird, options) {
  router.get("/tabela", function (req, res) {
    console.log("Krijohen tabelat dhe fushat ne: ./config/table_field.json");
    //fillimi i endpoint per shpallje ne web server '/'-> emri i funksionit me posht
    Firebird.attach(options, function (err, db) {
      if (err) throw err;
      db.query(sql_trego_tabelat_fushat, function (err, result) {
        res.json(result);
        let tabela_rregull = JSON.parse(
          JSON.stringify(result).replace(/(\\)?"\s*|\s+"/g, ($0, $1) =>
            $1 ? $0 : '"'
          )
        );
        fs.writeFile(
          "./config/table_field.json",
          JSON.stringify(tabela_rregull),
          function (err) {
            if (err) throw err;
            // console.log("complete");
            {
              const rearange = require("./rearange");
              rearange.ids1;
            }
            // res.JSON(rearange.ids1);
          }
        );
        db.detach();
      });
    });
  });
};

/*
const fs = require('fs');
const fileName = './file.json';
const file = require(fileName);
    
file.key = "new value";
    
fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(file));
  console.log('writing to ' + fileName);
});
*/
