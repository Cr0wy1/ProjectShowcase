import View from "./view.js";

class AddProjectView extends View {
  _parentElement = document.querySelector("main");

  _generateMarkup() {
    let markup = `<h2>Add new Project</h2>
                    <form action="newProject" method="get">
                        <label name="title">Titel</label> <input type="text" name="title"/><br /><br />
                        <label name="description">Beschreibung</label> <input type="text" name="description"/><br /><br />
                        <label name="image">Bild URL</label> <input type="text" name="image"/><br /><br />
                        <label name="tags">Tags</label> <input type="text" name="tags"/><br /><br />
                        <label>Erstelldatum</label> <input type="text" name="dateCreate"/>
                        <button>Speichern</button>
                    </form>`;

    return markup;
  }
}

export default new AddProjectView();
