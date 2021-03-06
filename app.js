let express = require("express");
let app = express();
let router = require("./router")
var bodyParser = require('body-parser')
let lib = require("./lib")
let utils = require("./utils")
let services = require("./services")
const port = process.env.PORT || 5001;
// init global variable
global.lib = lib
global.utils = utils
global.services= services
// define router
app.use(
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(express.static(__dirname + "/export"))
app.use(express.static(__dirname + "/public"))
app.use("/", router)




// INIT APP
let server = app.listen(port, () => {
  console.log(`App is running on port: ${port} | http://localhost:${port}`)
});

// INIT SOCKET
const io = require('socket.io')(server)
global.io = io
services.socket.init()
