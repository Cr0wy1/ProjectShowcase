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
import Draw from "./scripts/draw.js";
import Point, { P } from "./scripts/point.js";
import ColorRGBA, { Color, RGBA } from "./scripts/color.js";

await modalData.Fetch();
modalData.ConstructData();
modalData.SortByRating(modalData.projects);

const mainContent = document.querySelector("main");
const body = document.querySelector("body");

const OnUrlUpdate = function (query) {
  console.log("path", query.path);
  if (query.path === "") {
    if (query.params.search) {
      ShowProjectGrid(
        modalData.FilterSearch(modalData.projects, query.params.search)
      );
    } else {
      ShowProjectGrid(modalData.projects);
    }
    // } else if (query.path === "AddProject") {
    //   ShowAddProject();
  } else if (query.path === "project") {
    if (query.params.id) {
      ShowProject(query.params.id);
    }
  } else if (query.path === "Interactive") {
    ShowProjectGrid(modalData.GetAllWithTagId(7)); //tagId 7 => Interactive
  } else if (query.path === "3DModels") {
    ShowProjectGrid(modalData.GetAllWithTagId(12)); //tagId 12 => 3DModels
  } else if (query.path === "UnrealEngine") {
    ShowProjectGrid(modalData.GetAllWithTagId(5)); //tagId 5 => UnrealEngine
  }
};

const ShowProjectGrid = function (projects) {
  projectCollectionView.render({
    items: projects
  });
  projectCollectionView.RegisterEvents();
};

const ShowAddProject = function () {
  addProjectView.render({});
  addProjectView.RegisterEvents();
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
};
init();
