import View from "./view.js";
import PreviewCardView from "./previewCardView.js";
import urlPath from "../urlPath.js";

class ProjectCollectionView extends View {
  _parentElement = document.querySelector("main");

  _generateMarkup() {
    let searchSubTitle = "";
    if (urlPath.GetParams().search) {
      searchSubTitle = ` (${urlPath.GetParams().search})`;
    }
    console.log(urlPath.GetParams().search);

    let markup = `<h2>Project Collection${searchSubTitle}</h2>
    <div class="preview-grid">`;

    this._data.items.forEach(item => {
      markup += PreviewCardView.render(item, false);
    });

    markup += `</div>`;
    return markup;
  }

  OnProjectClickEvent() {
    const previewGrid = document.querySelector(".preview-grid");
    previewGrid.addEventListener("click", function (elem) {
      const previewCard = elem.target.closest(".preview-card");
      if (previewCard) {
        urlPath.SetPath("project", { id: previewCard.id });
      }
    });
  }

  OnTagClickEvent() {
    const allTags = document.querySelectorAll(".tag");
    allTags.forEach(tag => {
      tag.addEventListener("click", function (e) {
        e.stopPropagation();
        urlPath.SetPath("/", { search: tag.innerHTML });
      });
    });
  }

  RegisterEvents() {
    this.OnTagClickEvent();
    this.OnProjectClickEvent();
  }

  _loadScripts() {}
}

export default new ProjectCollectionView();
