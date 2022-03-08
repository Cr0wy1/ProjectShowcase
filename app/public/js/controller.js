//import "core-js/stable";
//import "regenerator-runtime/runtime";

//import * as model from "./model.js";
//import { MODAL_CLOSE_SEC } from "./config.js";
import projectCollectionView from "./views/projectCollectionView.js";
import addProjectView from "./views/addProjectView.js";
import modalData from "./model.js";

await modalData.Fetch();
modalData.ConstructData();

const mainContent = document.querySelector("main");

const init = function () {
  //Handlers
};
init();

console.log(modalData.projects);

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
  link.addEventListener("click", function (elem) {
    elem.preventDefault();
    const title = elem.target.title;
    if (title === "index") {
      projectCollectionView.render({
        items: modalData.projects
      });
    } else if (title === "addProject") {
      addProjectView.render({});
    }
  });
});
console.log(navLinks);

const OpenProject = function () {};
//console.log(modalData.GetProjectTags(modalData.projects[0]));

//Parcel Hot Reload
// if (module.hot) {
//     module.hot.accept();
//   }

//window.history.pushState({ page: "another" }, "another page", "example.html");

console.log(window.location);
