class SiteElement extends HTMLElement {
  #shadow;
  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "closed" });
    const template = document.querySelector("template#siteTemplate").content;
    this.#shadow.appendChild(template.cloneNode(true));
  }

  connectedCallback() {
    this.#shadow.querySelector("a").href = this.dataset.href;
    this.#shadow.querySelector("img").src = this.dataset.img;
    this.#shadow.querySelector("span").innerText = this.dataset.title;
  }

  /**
   * creates a SiteElement from the given site object
   * @param {Site} site
   * @returns {SiteElement}
   */
  static fromSite(site) {
    const siteElement = document.createElement("site-element");
    siteElement.dataset.title = site.title;
    siteElement.dataset.href = site.href;
    siteElement.dataset.img = site.img;
    return siteElement;
  }
}

customElements.define("site-element", SiteElement);

/**
 * function "bridge" for easy configuration. Each Site will be converted to a SiteElement
 * @param {string} title
 * @param {string} href
 * @param {string} img
 * @constructor
 */
function Site(title, href, img) {
  this.title = title;
  this.href = href;
  this.img = "./img/" + img;
}
