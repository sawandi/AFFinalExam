require("./db.js");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

var registerRoutes = require("./controllers/registerController");
var eventRoutes = require("./controllers/eventController");
var myEventRoutes = require("./controllers/myEventController");

var app = express();
app.use(bodyParser.json());

app.use("/register", registerRoutes);
app.use("/event", eventRoutes);
app.use("/myEvent", myEventRoutes);
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "stack-client", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Server started at : " + port));
