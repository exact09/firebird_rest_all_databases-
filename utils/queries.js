const { Module } = require("module");
const { item_field_get_NOID } = require("./variables");
const pikepyetja = require("../utils/variables");
//const tabela_emri_kerkim = require("../utils/variables");
const id_tabela = require("../utils/variables");
const gjatesia_noid = require("../utils/variables");
const { tabela } = require("../api-routes/routat.js");
const fushat_ke_query = require("../utils/variables");

let tabela_emri_kerkim = tabela || ""; // 👉️ ""

let query_fillim = `INSERT INTO $\{Firebird.escape(${tabela_emri_kerkim})} `;
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
for (let i = 0; i < gjatesia_noid; i++) {
  let query_update1 = `SET ${item_field_get_NOID[i]}=$\{Firebird.escape(${item_field_get_NOID[i]})}`;
  if (var_kot === "") {
    var_kot = query_update1;
  } else {
    var_kot = var_kot + "," + query_update1;
  }

  query_update_fushat = var_kot;
}

let query_update =
  `UPDATE $\{Firebird.escape(${tabela_emri_kerkim})} ${query_update_fushat}` +
  fushat_ke_query;
// let query_update_fushat = fushat_per_update; //`SET ${query_fushat}$\{Firebird.escape(${query_fushat})}`;
let query_update_fund = `WHERE ID=$\{Firebird.escape(${id_tabela})}`;
//let query_update = query_update_fillim; // + query_update_fushat;
//console.log("query ke variables ", query_update);
module.exports = query_update;
console.log("query update tek variablat ", query_update);
