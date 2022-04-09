import View from "./view.js";
import urlPath from "../urlPath.js";

class NavTopView extends View {
  _parentElement = document.querySelector("body");

  _generateMarkup() {
    let markup = `
    <nav class="nav-top">
    <div class="nav-top-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="logo"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        />
      </svg>
      <ul>
        <li><a class="nav-link" href="Index">Startseite</a></li>
        <li><a class="nav-link" href="Interactive">Interactive</a></li>
        <li><a class="nav-link" href="3DModels">3D Models</a></li>
        <li><a class="nav-link" href="UnrealEngine">Unreal Engine</a></li>
        <li><a class="nav-link" href="AddProject">Project hinzufügen</a></li>
      </ul>
      <div class="search-box">
        <input type="text" />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
    `;

    return markup;
  }

  _loadScripts() {}

  RegisterEvents() {
    this._LinkHandler();
  }

  _LinkHandler() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", function (elem) {
        elem.preventDefault();

        const href = elem.target.getAttribute("href");
        if (href === "Index") {
          urlPath.SetPath("/");
        } else {
          urlPath.SetPath(href);
        }
      });
    });
  }
}

export default new NavTopView();
