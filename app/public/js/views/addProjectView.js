import View from "./view.js";

class AddProjectView extends View {
  _parentElement = document.querySelector("main");

  _generateMarkup() {
    let markup = `<h2>Add new Project</h2>
                  <div class="formCenter">
                    <form class="form-addproject" action="newProject" method="get" >
                        <div class="form-input-container">
                          <label>Titel</label></br> 
                          <input type="text" name="title" class="formTitle" placeholder="Titel"/>
                        </div>
                        <div class="form-input-container">
                          <label>Kurzbeschreibung</label> </br> 
                          <textarea rows="4" cols="50" name="shortDescription" class="formShortDescription" placeholder="Kurzbeschreibung"></textarea>
                        </div>
                        <div class="form-input-container">
                          <label>Beschreibung</label> </br> 
                          <textarea name="description" class="formDescription" placeholder="Beschreibung"></textarea>
                        </div>
                        <div class="form-input-container">
                          <label>Bild URL</label> </br> 
                          <input type="text" name="image" class="formImage" placeholder="Bild URL"/>
                        </div>
                        <div class="form-input-container">
                          <label>Video Code</label> </br> 
                          <input type="text" name="videoCode" class="formVideoCode" placeholder="Video Code"/>
                        </div>
                        <div class="form-input-container">
                          <label>Script Name</label> </br> 
                          <input type="text" name="scriptName" class="formScriptName" placeholder="Script Name"/>
                        </div>
                        <div class="form-input-container">
                          <label>Tags</label> </br> 
                          <input type="text" name="tags" class="formTags" placeholder="Tags"/>
                        </div>
                        <div class="form-input-container">
                          <label>Erstelldatum</label> </br> 
                          <input type="date" name="dateCreate" class="formDateCreate"/>
                        </div>
                        <button class="form-addproject-save-btn">Speichern</button>
                    </form>
                  </div>`;

    return markup;

    // let today = new Date();

    // let date = `${today.getFullYear()}-${
    //   today.getMonth() + 1
    // }-${today.getDate()}`;
    // console.log("s", date);
  }

  _loadScripts() {}

  RegisterEvents() {
    this.form = document.querySelector(".form-addproject");
    this.formTitle = document.querySelector(".formTitle");
    this.formShortDescription = document.querySelector(".formShortDescription");
    this.formDescription = document.querySelector(".formDescription");
    this.formImage = document.querySelector(".formImage");
    this.formVideoCode = document.querySelector(".formVideoCode");
    this.formScriptName = document.querySelector(".formScriptName");
    this.formTags = document.querySelector(".formTags");
    this.formDateCreate = document.querySelector(".formDateCreate");
    this.saveBtn = document.querySelector(".form-addproject-save-btn");

    this.saveBtn.addEventListener("click", this.OnFormSave.bind(this));
  }

  OnFormSave(event) {
    event.preventDefault();

    if (
      this._ValidateInput(this.formTitle) &&
      this._ValidateInput(this.formShortDescription) &&
      this._ValidateInput(this.formImage) &&
      (this._ValidateInput(this.formVideoCode) ||
        this._ValidateInput(this.formScriptName)) &&
      this._ValidateInput(this.formTags) &&
      this._ValidateInput(this.formDateCreate)
    ) {
      this.form.submit();
    }
  }

  _ValidateInput(elem) {
    if (elem.value === "") {
      elem.classList.add("form-unvalid");
      return false;
    } else {
      elem.classList.remove("form-unvalid");
    }
    return true;
  }
}

export default new AddProjectView();
