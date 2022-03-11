const path = require("path");
const fs = require("fs");

const dataPath = path.join(__dirname, "../data");
const tagsPath = path.join(dataPath, "tags.json");
const projectsPath = path.join(dataPath, "projects.json");

const Tags = {
  data: [
    { id: -1, title: "TAG_NAME", color: "#fff" },
    { id: 2, title: "TAG_NAME", color: "#fff" }
  ]
};

const Projects = {
  data: [
    {
      id: -1,
      title: "PROJECT_NAME",
      description: "PROJECT_DESCTIPTION",
      image: "IMAGE_URL",
      tags: [1, 2, 3, 4],
      dateCreate: Date.now(),
      dateUpload: Date.now()
    }
  ]
};

const addProject = function (project) {
  const projects = loadProjects();
  console.log(projects);
};

const saveProjects = function () {
  fs.writeFileSync(projectsPath, JSON.stringify(Tags));
};

const loadProjects = function () {
  return JSON.parse(fs.readFileSync(projectsPath).toString());
};

const loadTags = function () {
  return JSON.parse(fs.readFileSync(tagsPath).toString());
};

module.exports = {
  addProject: addProject
};
