//"use strict";

const fs = require("fs");
const fileName = __dirname + "/swagger_doc.json";

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
    //const fileName = "./swagger_output.json";
    const file = require(fileName);

    file.definitions = result;

    fs.writeFile(
      fileName,
      JSON.stringify(file, null, 2),
      function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(file));
        console.log("writing to " + fileName);
      }
    );
  });
});

module.exports = { ids1 };
