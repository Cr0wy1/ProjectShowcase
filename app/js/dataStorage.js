const path = require("path");
const fs = require("fs");

const dataPath = path.join(__dirname, "../data");
const tagsPath = path.join(dataPath, "tags.json");
const projectsPath = path.join(dataPath, "projects.json");

const BACKUP_MAX = 5;

const addProject = function (project) {
  const projects = loadProjects();
  projects.idLevel++;
  project.id = projects.idLevel;

  const splitTags = project.tags.split(",");
  let tags = [];
  splitTags.forEach(splitTag => {
    if (Number(splitTag)) {
      tags.push(Number(splitTag));
    }
  });

  projects.data.push({
    id: project.id,
    title: project.title,
    shortDescription: project.shortDescription,
    description: project.description,
    image: project.image,
    videoCode: project.videoCode,
    scriptName: project.scriptName,
    tags: tags,
    dateCreate: project.dateCreate,
    dateUpload: project.dateUpload
  });
  //console.log(projects);

  backupProjects();
  saveProjects(projects);
};

const saveProjects = function (projects) {
  fs.writeFileSync(projectsPath, JSON.stringify(projects));
};

const loadProjects = function () {
  return JSON.parse(fs.readFileSync(projectsPath).toString());
};

const loadTags = function () {
  return JSON.parse(fs.readFileSync(tagsPath).toString());
};

const backupProjects = function () {
  const backupFiles = fs.readdirSync(path.join(dataPath, "backup"));
  if (backupFiles.length >= BACKUP_MAX) {
    fs.unlinkSync(path.join(dataPath, `backup/${backupFiles[0]}`));
  }

  const dateString = new Date()
    .toISOString()
    .replaceAll(":", "_")
    .replaceAll(".", "-");

  fs.copyFileSync(
    projectsPath,
    path.join(dataPath, "backup/projects" + dateString + ".json"),
    fs.constants.COPYFILE_FICLONE,
    err => {
      if (err) throw err;
    }
  );
};

module.exports = {
  addProject: addProject
};
