const fs = require("fs");
const { Module } = require("module");
const { tabela } = require("../api-routes/routat.js");
const { id } = require("../api-routes/routat.js");
//let tabela = "scroll";
//let id = 0;
var lexo_tabelat_file = fs.readFileSync("./config/table_field.json").toString();
let tabela_rregull = JSON.parse(lexo_tabelat_file);

const tabela_emri_kerkim = tabela || ""; // 👉️ ""

const tabela_kerkim = tabela_rregull.filter(
  (it) => it.TABLENAME.toUpperCase() === tabela_emri_kerkim.toUpperCase()
);
// OK----console.log("tabela_Kerkim", tabela_kerkim);
//fshirja e ID per update ne tabele
let forDeletion = "'let ID = request.body.ID'";
let forDeletionID = "'ID'";
//------------------
var tabela_fushat = tabela_kerkim.map(function (item) {
  return item.FIELDNAME;
});
//--------------------------------------------
//OK---console.log("tabela_fushat", tabela_fushat);
//------------definimi  i fushave per update ne tabele ------------
var request_body_routes = tabela_kerkim.map(function (item) {
  return "let " + item.FIELDNAME + " = request.body." + item.FIELDNAME;
});
//OK--console.log("request_body_routes", request_body_routes);

let item_field_get = request_body_routes.filter(
  (it) => !forDeletion.includes(it)
);
//exports.item_field_get = ite;

let item_field_get_NOID = tabela_fushat.filter(
  (it) => !forDeletionID.includes(it)
);
//const fushat = item_field_get;
let items_value;
item_field_get.forEach(function (value) {
  value = value + ";";
  items_value = value;
  //console.log(value);
});
console.log("item Field Get variables.js ", item_field_get);
module.exports = item_field_get;

//Looks ok console.log("item_field_get", item_field_get);
//----------------------

let gjatesia_query = item_field_get_NOID.length;
//let query_fillim = "INSERT INTO ${Firebird.escape(tabela )}";
let query_fushat = item_field_get_NOID;
//-------------krijimi i ??
const pikepyetja = item_field_get_NOID
  .map((it) => {
    return "?";
  })
  .join();
//-----------------------

let query_values = pikepyetja;
let query_fillim = `INSERT INTO $\{Firebird.escape(${tabela})} `;
let query_insert_noId =
  query_fillim +
  "(" +
  query_fushat +
  ")" +
  " VALUES (" +
  query_values +
  ") returning ID," +
  "[" +
  query_fushat +
  "]";
//console.log(query_insert_noId);
//query per update
module.exports = { query_insert_noId };

var query_update_fushat = "";
var query_update1 = "";
var var_kot = "";
//-----------------
//-------------krijimi i ??

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

var fushat_let;
function fushat_get() {
  for (let key in item_field_get) {
    fushat_let = item_field_get[key] + ";"; // get the value by key
    item_field_get.push(fushat_let);
    // value = value + ";";
    //  console.log("fushat let", fushat_let);
    // fushat = value;
  }
  return fushat_let;
}
module.exports = fushat_let;
//module.exports = fushat_let;

//-----------------------

let query_update = `UPDATE $\{Firebird.escape(${tabela})} ${query_update_fushat}`;
// let query_update_fushat = fushat_per_update; //`SET ${query_fushat}$\{Firebird.escape(${query_fushat})}`;
let query_update_fund = `WHERE ID=$\{Firebird.escape(${id})}`;
//let query_update = query_update_fillim; // + query_update_fushat;
//console.log("query ke variables ", query_update);
module.exports = query_update;
console.log("query update tek variablat ", query_update);
//console.log("query update ", query_update);

//-----------------------------------------
//console.log(gjatesia_query, query_insert_noId);

//-------------shkruhet ne file tables.txt
fs.writeFile(
  "./config/body_params_Let_Get.txt",
  JSON.stringify(item_field_get),
  function (err) {
    if (err) throw err;
  }
);

//console.log("ids ", tabela_rregull);
