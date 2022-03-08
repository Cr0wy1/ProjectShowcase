import View from "./view.js";

class ProjectView extends View {
  _parentElement = document.querySelector("main");

  _generateMarkup() {
    let markup = `<h2>Project - ${this.data.title}</h2>
    <div class="preview-grid">`;

    return markup;
  }
}

export default new ProjectView();
