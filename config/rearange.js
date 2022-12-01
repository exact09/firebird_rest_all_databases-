"use strict";

const fs = require("fs");

const ids1 = fs.readFile("./config/table_field.json", (err, data) => {
  if (err) throw err;
  JSON.parse(data);
  let ids = JSON.parse(data);

  const result = Object.values(
    ids.reduce((acc, item) => {
      const tablename = item["TABLENAME"];
      if (!acc[tablename]) acc[tablename] = { tablename, FIELDNAME: [] };
      acc[tablename].FIELDNAME.push({ fieldname: item.FIELDNAME });
      return acc;
    }, {})
  );

  console.log(result);
  fs.writeFile("./config/tables.json", JSON.stringify(result), function (err) {
    if (err) throw err;
    // console.log("complete");
  });
});

module.exports = { ids1 };
