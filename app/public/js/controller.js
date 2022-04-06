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

// const canvas = document.getElementById("myCanvas");
// const draw = new Draw(canvas);
// draw.background(RGBA(120, 22, 200, 1));
// draw.line(P(10, 10), P(100, 100));

// //draw.fillColor(Color.black());
// console.log(draw);

// //draw.strokeWidth(1);
// //draw.strokeColor(RGBA(255, 0, 0));
// //draw.fillColor(RGBA().random());
// //draw.circle(P(100, 100), 100, true);

// draw.pixel(P(200, 200));

// //let p1 = new Point(1, 2);
// //let p2 = new Point(5, -1);
// //console.log(p1.add(1, -10));
