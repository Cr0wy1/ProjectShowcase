import View from "./view.js";

class PreviewCardView extends View {
  _parentElement = "";

  _generateMarkup() {
    let markup = `
    <div class="preview-card" id="${this._data.id}">
    <a>
      <img src="${this._data.image}" alt="" />
    </a>

    <div class="preview-card-content">
      <h3>${this._data.title}</h3>
      <p>
      ${this._data.shortDescription}
      </p>
      <div class="tags-container">`;

    this._data.tags.forEach(tag => {
      markup += `<a href="tag" class="tag" style="background-color:${tag.bgcolor}; color:${tag.color}">${tag.title}</a>`;
    });

    markup += `</div></div></div>`;

    return markup;
  }
}

export default new PreviewCardView();
