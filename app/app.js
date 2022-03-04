const path = require("path");
const express = require("express");
const { renderSync } = require("sass");

const app = express();
const port = process.env.PORT || 3000; //Heroku Enviroment port, else 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "public");
//const viewsPath = path.join(__dirname, "../templates/views");
//const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  console.log("asd");

  //res.send("Hello World");
  //res.render("index", {});
  res.sendFile(path.join(publicDirectoryPath, "index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Resource not found 404</h1>");
});

app.listen(port, () => {
  console.log("Server is up on port 3000.");
});
