import View from "./view.js";
import PreviewCardView from "./previewCardView.js";

class ProjectCollectionView extends View {
  _parentElement = document.querySelector("main");

  _generateMarkup() {
    let markup = `<h2>Project Collection</h2>
    <div class="preview-grid">`;

    this._data.items.forEach(item => {
      markup += PreviewCardView.render(item, false);
    });

    markup += `</div>`;
    return markup;
  }
}

export default new ProjectCollectionView();
