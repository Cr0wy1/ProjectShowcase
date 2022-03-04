import View from "./view.js";

class PreviewCardView extends View {
  _parentElement = "";

  _generateMarkup() {
    let markup = `
    <div class="preview-card">
    <a href="#">
      <img src="${this._data.image}" alt="" />
    </a>

    <div class="preview-card-content">
      <h3>${this._data.title}</h3>
      <p>
      ${this._data.description}
      </p>
      <div class="tags-container">`;

    this._data.tags.forEach(tag => {
      markup += `<a href="#" class="tag">${tag}</a>`;
    });

    markup += `</div></div></div>`;

    return markup;
  }
}

export default new PreviewCardView();