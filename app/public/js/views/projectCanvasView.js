import View from "./view.js";

class ProjectCanvasView extends View {
  _parentElement = document.querySelector(".projectContent");

  _generateMarkup() {
    let markup = `<div class="drawProjectContainer">
                    <div class="drawProjectParams"></div>
                    <div class="drawProjectCanvasContainer">
                      <canvas id="drawProjectCanvas" width="600" height="600">
                    </div>
    </div>`;

    return markup;
  }

  _loadScripts() {}

  RegisterEvents() {}

  GetCanvas() {
    return document.querySelector("#drawProjectCanvas");
  }

  GetParamsContainer() {
    return document.querySelector(".drawProjectParams");
  }

  RegisterEvents() {}

  AddButton(text) {
    const newElem = document.createElement("button");
    newElem.innerHTML = text;
    this.GetParamsContainer().insertAdjacentElement("beforeend", newElem);
    return newElem;
  }

  AddCheckbox(text, bIsChecked = false) {
    const checked = bIsChecked ? "checked" : "";
    const id = text.toLowerCase().replace(/\s+/g, "");
    let markup = `<div class="paramInput">
        <label>${text}:</label><input type="checkbox" ${checked} id="${id}">
    </div>`;
    this.GetParamsContainer().insertAdjacentHTML("beforeend", markup);
    return document.querySelector(`#${id}`);
  }

  AddSlider(text, min = 0, max = 100, value = 10) {
    const id = text.toLowerCase().replace(/\s+/g, "");
    let markup = `<div class="paramInput">
                    <label>${text}:</label><input type="range" min="${min}" max="${max}" value="${value}" id="${id}"><span id="${id}-span">10</span>
                </div>`;
    this.GetParamsContainer().insertAdjacentHTML("beforeend", markup);
    const slider = document.querySelector(`#${id}`);
    const span = document.querySelector(`#${id}-span`);

    span.innerHTML = slider.value;
    slider.addEventListener("input", () => (span.innerHTML = slider.value));

    return slider;
  }

  AddSelection(text, options) {
    const id = text.toLowerCase().replace(/\s+/g, "");
    let markup = `<div class="paramInput">
    <label>${text}:</label><select id="${id}">`;
    options.forEach(opt => {
      markup += `<option value="${opt}">${opt}</option>`;
    });
    markup += `</div>`;
    this.GetParamsContainer().insertAdjacentHTML("beforeend", markup);
    return document.querySelector(`#${id}`);
  }

  AddCanvasDownload(imageName = "canvas") {
    this.AddButton("Download Image").addEventListener(
      "click",
      this.DownloadCanvas.bind(this, imageName)
    );
  }

  OnParamsUpdate(callback) {
    const params = document.querySelector(".drawProjectParams");
    params.addEventListener("change", callback);
  }

  DownloadCanvas(imageName) {
    if (typeof imageName !== "string") {
      imageName = "canvas";
    }

    const data = this.GetCanvas().toDataURL("image/png");
    const tempLink = document.createElement("a");
    tempLink.href = data;
    tempLink.download = `${imageName}.png`;
    tempLink.click();
  }

  GetParams() {
    const paramInputs = document.querySelectorAll(".paramInput");

    const paramObject = {};
    paramInputs.forEach(paramInput => {
      const input = paramInput.querySelector("input");
      if (input) {
        if (input.type == "checkbox") {
          paramObject[input.id] = input.checked;
        } else if (input.type == "range") {
          paramObject[input.id] = Number(input.value);
        } else {
          paramObject[input.id] = input.value;
        }
      } else {
        const selection = paramInput.querySelector("select");
        paramObject[selection.id] = selection.value;
      }
    });
    return paramObject;
  }
}

export default new ProjectCanvasView();
