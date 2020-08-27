let express = require("express");
let app = express();
let router = require("./router")
var bodyParser = require('body-parser')
let lib = require("./lib")
let utils = require("./utils")
const port = process.env.PORT || 5001;
// init global variable
global.lib = lib
global.utils = utils
// define router
app.use(
  bodyParser.json(),
  bodyParser.urlencoded({ 
    extended: true
  })
)
app.use(express.static(__dirname + "/public"))
app.use("/", router)

app.listen(port, () => {
  console.log(`App is running on port: ${port} | http://localhost:${port}`)
});