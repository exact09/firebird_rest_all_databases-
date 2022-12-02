const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { response } = require("express");
//Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require(__dirname + "/config/swagger_doc.json");
//-----
const alltables = require("./config/tables.json");

var Firebird = require("node-firebird");
app.use(
  cors({
    origin: "*",
    // origin: ['*','http:*:*','http://localhost:8000','http://127.0.0.1:8000', 'http://192.168.2.136:8000', 'http://192.168.2.44:8000', 'http://192.168.2.252:8000','http://192.168.2.252','http://192.168.2.29:8000']
  })
);
const port = 3000;
var HOST = "localhost";
const send = require("send");
const res = require("express/lib/response");
const options = require("./config/database"); //import ose uses
app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);
require("./config/schema.js")(router, Firebird, options);
//swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//------------
//require("./api-routes/anetaresite.js")(router, Firebird, options);
//require("./api-routes/vitet")(router, Firebird, options);
//require("./api-routes/anetaret.js")(router, Firebird, options);
require("./api-routes/routat.js")(router, Firebird, options);
app.get("/alltables", (req, res) => {
  res.json(alltables);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening at http://${HOST}:${port}`);
});
