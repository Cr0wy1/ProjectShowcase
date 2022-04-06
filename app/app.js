const path = require("path");
const express = require("express");
//const { renderSync } = require("sass");
const app = express();
const port = process.env.PORT || 3000; //Heroku Enviroment port, else 3000
const dataStorage = require("./js/dataStorage");

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

app.get("/newProject", (req, res) => {
  let today = new Date();
  let date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  dataStorage.addProject({
    title: req.query.title,
    shortDescription: req.query.shortDescription,
    description: req.query.description,
    image: req.query.image,
    videoCode: req.query.videoCode,
    scriptName: req.query.scriptName,
    tags: req.query.tags,
    dateCreate: req.query.dateCreate,
    dateUpload: today
  });
  //console.log(dataStorage);
  //console.log(req.query);

  //res.send("Hello World");
  //res.render("index", {});
  res.sendFile(path.join(publicDirectoryPath, "index.html"));
});

app.use("/*", (req, res) => {
  //res.render("index", {});
  res.sendFile(path.join(publicDirectoryPath, "index.html"));
  //res.status(404).send("<h1>Resource not found 404</h1>");
});

app.listen(port, () => {
  console.log("Server is up on port 3000.");
});
