export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this.setMarkup(markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    this.setMarkup(newMarkup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  setMarkup(markup) {
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._loadScripts();
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <p>${message}</p>
      </div>
    `;
    this.setMarkup(markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <p>${message}</p>
      </div>
    `;
    this.setMarkup(markup);
  }
}
