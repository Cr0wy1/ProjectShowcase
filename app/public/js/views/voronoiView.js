import View from "./view.js";

class VoronoiView extends View {
  _parentElement = document.querySelector(".projectContent");

  _generateMarkup() {
    let markup = `<div class="voronoiContainer">
                    <div class="voronoiParams">
                        <div class="paramInput">
                            <label>Colored areas:</label><input type="checkbox" checked id="voronoiColoredAreasCheckbox" >
                        </div>
                        <div class="paramInput">
                            <label>Center points:</label><input type="checkbox" id="voronoiCenterPointsCheckbox">
                        </div>
                        <div class="paramInput">
                            <label>Edges:</label><input type="checkbox" checked id="voronoiEdgesCheckbox">
                        </div>
                        <div class="paramInput">
                            <label>Amount:</label><input type="range" min="2" max="100" value="20" id="voronoiAmountSlider"><span id="voronoiAmountText">10</span>
                        </div>
                        <button id="voronoiToggleMotion">Start Motion</button>
                        <button id="voronoiReset">Generate</button>
                    </div>
                    <div class="voronoiCanvas">
                      <canvas id="projectCanvas" width="400" height="400">
                    </div>
    </div>`;

    return markup;
  }

  _loadScripts() {}

  GetCanvas() {
    return document.querySelector("#projectCanvas");
  }

  RegisterEvents() {
    const amountSlider = document.querySelector("#voronoiAmountSlider");
    const amountText = document.querySelector("#voronoiAmountText");

    amountSlider.addEventListener("change", function (e) {
      amountText.innerHTML = amountSlider.value;
    });

    const motionBtn = document.querySelector("#voronoiToggleMotion");
    motionBtn.addEventListener("click", function (e) {
      if (e.target.classList.contains("active")) {
        e.target.classList.remove("active");
        e.target.innerHTML = "Start Motion";
      } else {
        e.target.classList.add("active");
        e.target.innerHTML = "Stop Motion";
      }
    });
  }

  OnMotionToggle(callback) {
    const motionBtn = document.querySelector("#voronoiToggleMotion");
    motionBtn.addEventListener("click", callback);
  }

  OnParamsUpdate(callback) {
    const voronoiParams = document.querySelector(".voronoiParams");
    voronoiParams.addEventListener("change", callback);
  }

  OnReset(callback) {
    const voronoiResetBtn = document.querySelector("#voronoiReset");
    voronoiResetBtn.addEventListener("click", callback);
  }

  GetVoronoiParams() {
    const coloredAreasCheckbox = document.querySelector(
      "#voronoiColoredAreasCheckbox"
    );
    const centerPointsCheckbox = document.querySelector(
      "#voronoiCenterPointsCheckbox"
    );
    const edgesCheckbox = document.querySelector("#voronoiEdgesCheckbox");

    const AmountSlider = document.querySelector("#voronoiAmountSlider");

    return {
      bColoredAreas: coloredAreasCheckbox.checked,
      bCenterPoints: centerPointsCheckbox.checked,
      bEdges: edgesCheckbox.checked,
      amount: AmountSlider.value
    };
  }
}

export default new VoronoiView();
