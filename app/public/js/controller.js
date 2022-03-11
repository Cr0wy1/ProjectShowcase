//import "core-js/stable";
//import "regenerator-runtime/runtime";

//import * as model from "./model.js";
//import { MODAL_CLOSE_SEC } from "./config.js";
import urlPath from "./urlPath.js";
import navTopView from "./views/navTopView.js";
import projectCollectionView from "./views/projectCollectionView.js";
import addProjectView from "./views/addProjectView.js";
import projectView from "./views/projectView.js";
import modalData from "./model.js";

await modalData.Fetch();
modalData.ConstructData();

const mainContent = document.querySelector("main");
const body = document.querySelector("body");

const OnUrlUpdate = function (query) {
  console.log("path", query.path);
  if (query.path === "") {
    ShowProjectGrid();
  } else if (query.path === "AddProject") {
    ShowAddProject();
  } else if (query.path === "project") {
    if (query.params.id) {
      ShowProject(query.params.id);
    }
  }
};

const ShowProjectGrid = function () {
  projectCollectionView.render({
    items: modalData.projects
  });
  projectCollectionView.RegisterEvents();
};

const ShowAddProject = function () {
  addProjectView.render({});
};

const ShowProject = function (id) {
  const project = modalData.GetProjectById(Number(id));
  projectView.render({ project: project });
  //console.log("Hello", project);
};

const init = function () {
  body.insertAdjacentHTML("afterbegin", navTopView.render({}, false));
  navTopView.RegisterEvents();

  urlPath.OnPathUpdateEvent(OnUrlUpdate);
  urlPath._CallPathUpdateEvent();

  window.onpopstate = function (event) {
    urlPath._CallPathUpdateEvent();
  };
};
init();
