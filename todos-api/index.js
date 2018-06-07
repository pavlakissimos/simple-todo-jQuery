const express = require("express"),
  app = express(),
  todoRoutes = require("./routes/todos"),
  bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendfile("index.html");
});

app.use("/api/todos", todoRoutes);

app.listen(3000, function() {
  console.log("App is running at http://localhost:3000");
});
