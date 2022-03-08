const path = require("path");
const express = require("express");
//const { renderSync } = require("sass");
const app = express();
const port = process.env.PORT || 3000; //Heroku Enviroment port, else 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "public");
//const viewsPath = path.join(__dirname, "../templates/views");
//const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));

app.get("/data/tags", (req, res) => {
  res.header("Content-Type", "application/json");
  res.sendFile(path.join(publicDirectoryPath, "../data/tags.json"));
});

app.get("/data/projects", (req, res) => {
  res.header("Content-Type", "application/json");
  res.sendFile(path.join(publicDirectoryPath, "../data/projects.json"));
});

app.get("/test", (req, res) => {
  //res.send("Hello World");
  //res.render("index", {});
  res.sendFile(path.join(publicDirectoryPath, "newProject.html"));
});

app.use("/*", (req, res) => {
  console.log("asd");
  //res.render("index", {});
  res.sendFile(path.join(publicDirectoryPath, "index.html"));
  //res.status(404).send("<h1>Resource not found 404</h1>");
});

app.listen(port, () => {
  console.log("Server is up on port 3000.");
});
