const fs = require("fs");
const { Module } = require("module");
const { tabela } = require("../api-routes/routat.js");
const { id } = require("../api-routes/routat.js");
//Variablat qe perdoren 1 here
var tabela_rregull = JSON.parse(
  fs.readFileSync("./config/table_field.json").toString()
);
exports.module = tabela_rregull;
let id_tabela = id;
exports.module = id_tabela;

let tabela_emri_kerkim = tabela || ""; // 👉️ ""
exports.module = tabela_emri_kerkim;

//fshirja e ID per update ne tabele
let forDeletion = "'let ID = request.body.ID'";
exports.module = forDeletion;

let forDeletionID = "'ID'";
exports.module = forDeletionID;

let tabela_kerkim = tabela_rregull.filter(
  (it) => it.TABLENAME.toUpperCase() === tabela_emri_kerkim.toUpperCase()
);
exports.module = tabela_kerkim;

let tabela_fushat = tabela_kerkim.map(function (item) {
  return item.FIELDNAME;
});
exports.module = tabela_fushat;

request_body_routes = tabela_kerkim.map(function (item) {
  return "let " + item.FIELDNAME + " = request.body." + item.FIELDNAME;
});

//module.exports = request_body_routes;

//console.log("Request body: ", request_body_routes);
let item_field_get = request_body_routes.filter(
  (it) => !forDeletion.includes(it)
);
module.exports = item_field_get;

let item_field_get_NOID = tabela_fushat.filter(
  (it) => !forDeletionID.includes(it)
);
module.exports = { item_field_get_NOID };
gjatesia_noid = item_field_get_NOID.length;

module.exports = gjatesia_noid;

let items_value = item_field_get.join(";\r\n") + ";";
//let items_value1 = process.env.items_value.split(",");

//console.log("items value: ", items_value);

//-------------krijimi i ??
let pikepyetja = item_field_get_NOID
  .map((it) => {
    return "?";
  })
  .join();
//-----------------------
module.exports = pikepyetja;

let fushat_ke_query = item_field_get_NOID
  .map((it) => {
    return `SET ${item_field_get_NOID}=$\{Firebird.escape(${item_field_get_NOID})}`;
  })
  .join();

console.log("fushat per update ", fushat_ke_query);
module.exports = fushat_ke_query;

//items_value = item_field_get;
//console.log("item Field Get variables.js ", items_value);
module.exports = items_value;
//------------------ fund variablat 1 here----------------
fs.writeFile(
  "./config/body_params_Let_Get.txt",
  JSON.stringify(item_field_get),
  function (err) {
    if (err) throw err;
  }
);
