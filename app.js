var server = require("./server");
var loginRoute = require("./loginRoute");


server.start(loginRoute.loginRoute);