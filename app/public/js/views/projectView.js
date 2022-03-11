import View from "./view.js";

class ProjectView extends View {
  _parentElement = document.querySelector("main");

  _generateMarkup() {
    let markup = `<h2>Project - ${this._data.project.title}</h2>
    <div class="projectCenter">
      <div class="projectContainer">
        <div class="ytvideo-container">
          <iframe width="1280" height="720" class="ytvideo" src="https://www.youtube.com/embed/${this._data.project.videoCode}" frameborder="0"  allowfullscreen></iframe>
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
}

export default new ProjectView();
