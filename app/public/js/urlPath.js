class UrlPath {
  listeners = [];
  bShouldReloadNext = false;

  constructor() {
    window.onpopstate = this._CallPopstateEvent.bind(this);
  }

  SetPath(path, params = {}) {
    let querySearch = "?";
    Object.entries(params).forEach(element => {
      querySearch += `${element[0]}=${element[1]}&`;
    });

    const state = { page_id: 1, user_id: 5 };
    const url = path;
    if (this.bShouldReloadNext) {
      window.location.href = `${url}${querySearch.slice(0, -1)}`;
    } else {
      window.history.pushState(state, " ", `${url}${querySearch.slice(0, -1)}`); //slice removes & at the and or ? if no params set
    }

    this._CallPathUpdateEvent();
  }

  OnPathUpdateEvent(listener) {
    this.listeners.push(listener);
  }

  _CallPathUpdateEvent() {
    this.listeners.forEach(listener => {
      listener(this.GetQuery());
    });
  }

  _CallPopstateEvent(event) {
    if (this.bShouldReloadNext) {
      window.location.href = event.target.location.href;
    }
    this._CallPathUpdateEvent();
  }

  GetPath() {
    return document.location.pathname.substring(1);
  }

  GetParams() {
    const params = window.location.search.replace("?", "").split("&");
    const obj = {};
    params.forEach(element => {
      obj[element.split("=")[0]] = element.split("=")[1];
    });

    return obj;
  }

  GetQuery() {
    return { path: this.GetPath(), params: this.GetParams() };
  }

  ReloadNext() {
    this.bShouldReloadNext = true;
  }
}

export default new UrlPath();
