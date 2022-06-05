import View from "./view.js";
import urlPath from "./../urlPath.js";
import Model3DView from "../scripts/model3DView.js";

class ProjectView extends View {
  _parentElement = document.querySelector("main");

  _generateMarkup() {
    let modelMarkup = "";
    if (this._data.project.model !== "") {
      modelMarkup += `<div class="modelCanvasContainer" data-model="${this._data.project.model}"></div>`;
    }

    let videoMarkup = "";
    if (this._data.project.videoCode !== "") {
      videoMarkup = `<div class="ytvideo-container">
                      <iframe width="1280" height="720" class="ytvideo" src="https://www.youtube.com/embed/${this._data.project.videoCode}" frameborder="0"  allowfullscreen></iframe>
                    </div>`;
    }

    let imagesMarkup = "";
    if (this._data.project.images.length > 0) {
      imagesMarkup = `<div class="projectImageGrid">`;

      this._data.project.images.forEach(image => {
        imagesMarkup += `<img src="${image}">`;
      });

      imagesMarkup += `</div>`;
    }

    let markup = `<h2>${this._data.project.title}</h2>
    <div class="projectCenter">
      <div class="projectContainer">
        <div class="projectContent">
        ${modelMarkup}
        ${videoMarkup}
        ${imagesMarkup}
        </div>
        <div class="project-info">
          <span class="project-dateCreate">
            Erstellt:
            <time>${this._data.project.dateCreate}</time>
          </span>
          <br>
          <span class="project-dateUpload">
            Hochgeladen:
            <time>${this._data.project.dateUpload}</time>
          </span>      
        </div>
        <div class="project-description">
          ${this._data.project.description}
        </div>
      </div>
    </div>
    `;

    return markup;
  }

  _loadScripts() {
    if (this._data.project.scripts && this._data.project.scripts.length > 0) {
      urlPath.ReloadNext();

      this._data.project.scripts.forEach(script => {
        let scriptElem = document.createElement("script");
        scriptElem.setAttribute("defer", "defer");
        if (script.type === "module") {
          scriptElem.type = "module";
        }

        scriptElem.setAttribute("src", `./js/scripts/${script.name}.js`); //[{"name": "voronoi-core", "type": "script"}, {name"voronoi"}]
        this._parentElement.appendChild(scriptElem);
      });
    }

    if (this._data.project.model) {
      const model3DView = new Model3DView();
      model3DView.Run();
    }
  }
}

export default new ProjectView();
