const fs = require("fs");
const { Module } = require("module");

const item_field_get_NOID = require("../utils/variables");

//-------------krijimi i ??
let pikepyetja = item_field_get_NOID
  .map((it) => {
    return "?";
  })
  .join();
//-----------------------

let query_fillim = `INSERT INTO $\{Firebird.escape(${tabela})} `;
let query_insert_noId =
  query_fillim +
  "(" +
  item_field_get_NOID +
  ")" +
  " VALUES (" +
  pikepyetja +
  ") returning ID," +
  "[" +
  item_field_get_NOID +
  "]";
//console.log(query_insert_noId);
//query per update
module.exports = { query_insert_noId };

var query_update_fushat = "";

var var_kot = "";
//----------------
var_kot = "";
for (let i = 0; i < item_field_get_NOID.length; i++) {
  let query_update1 = `SET ${item_field_get_NOID[i]}=$\{Firebird.escape(${item_field_get_NOID[i]})}`;
  if (var_kot === "") {
    var_kot = query_update1;
  } else {
    var_kot = var_kot + "," + query_update1;
  }

  query_update_fushat = var_kot;
}

console.log("fushat per update ", query_update_fushat);

let query_update = `UPDATE $\{Firebird.escape(${tabela})} ${query_update_fushat}`;

module.exports = query_update;
console.log("query update tek variablat ", query_update);
