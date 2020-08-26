let express = require("express");
let app = express();
let router = require("./router")
var bodyParser = require('body-parser')
let lib = require("./lib")

// init global variable
global.lib = lib

// define router
app.use(
  bodyParser.json(),
  bodyParser.urlencoded({ 
    extended: true
  })
)
app.use(express.static(__dirname + "/public"))
app.use("/", router)




app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port: ${process.env.PORT || 3000}`)
});