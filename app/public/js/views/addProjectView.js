import View from "./view.js";

class AddProjectView extends View {
  _parentElement = document.querySelector("main");

  _generateMarkup() {
    let markup = `<h2>Add new Project</h2>
                    <form action="newProject" method="get">
                        <label>Titel</label> <input type="text" name="title"/><br /><br />
                        <label>Kurz Beschreibung</label> <textarea rows="4" cols="50" name="shortDescription"> </textarea><br /><br />
                        <label>Beschreibung</label> <textarea name="description"> </textarea><br /><br />
                        <label>Bild URL</label> <input type="text" name="image"/><br /><br />
                        <label>Tags</label> <input type="text" name="videoCode"/><br /><br />
                        <label>Tags</label> <input type="text" name="tags"/><br /><br />
                        <label>Erstelldatum</label> <input type="date" name="dateCreate"/>
                        <button>Speichern</button>
                    </form>`;

    return markup;

    // let today = new Date();

    // let date = `${today.getFullYear()}-${
    //   today.getMonth() + 1
    // }-${today.getDate()}`;
    // console.log("s", date);
  }
}

export default new AddProjectView();
