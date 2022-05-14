class ExpandedFolderElement extends HTMLElement {
  #shadow;
  /** @type SiteElement[] */
  #sites;
  #name;
  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "closed" });
    const template =
      document.querySelector("template#expandedFolderTemplate").content;
    this.#shadow.appendChild(template.cloneNode(true));
  }

  connectedCallback() {
    const titleElement = this.#shadow.querySelector("span.title");
    titleElement.innerText = this.#name;
    const body = this.#shadow.querySelector("div.dialog-body");
    this.#sites.forEach((site) => {
      body.appendChild(site);
    });
    this.open();
    const closeButton = this.#shadow.querySelector("button.close");
    const dialog = this.#shadow.querySelector('dialog')
    dialog.addEventListener('close', () => this.close())
    closeButton.addEventListener("click", () => dialog.close());
  }

  open() {
    /** @type HTMLDialogElement */
    const dialog = this.#shadow.querySelector("dialog");
    dialog.showModal();
  }

  close() {
    this.remove();
  }

  /**
   * Must be called before this element is added to the DOM (because I'm lazy)
   * @param {Site[]} value
   */
  set sites(value) {
    this.#sites = value.map((site) => {
      if (!site instanceof Site) {
        throw "Folders cannot be nested!";
      }
      return SiteElement.fromSite(site);
    });
  }

  /**
   * Must be called before this element is added to the DOM (once again - I'm lazy)
   * @param value
   */
  set name(value) {
    this.#name = value;
  }
}

customElements.define("expanded-folder", ExpandedFolderElement);
