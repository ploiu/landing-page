class SiteFolderElement extends HTMLElement {
  #shadow;
  /** @type Site[] */
  #sites;
  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "closed" });
    const template = document.querySelector("template#folderTemplate").content;
    this.#shadow.appendChild(template.cloneNode(true));
  }

  /**
   * @param {Site[]} value
   */
  set sites(value) {
    this.#sites = value;
  }

  connectedCallback() {
    this.#shadow.querySelector("span.folder-name").innerText =
      this.dataset.name;
    // we want to show small icons of each site we contain
    const folder = this.#shadow.querySelector("div.folder");
    let siteCount = 0;
    this.#sites.forEach((site) => {
      if (siteCount < 9) {
        const image = document.createElement("img");
        image.src = site.img;
        folder.appendChild(image);
      }
      siteCount++;
    });
    // click handler for showing dialog
    this.addEventListener("click", this.openFolder);
  }

  openFolder() {
    /** @type {ExpandedFolderElement} */
    const expandedFolder = document.createElement("expanded-folder");
    expandedFolder.sites = this.#sites;
    expandedFolder.name = this.dataset.name;
    document.body.appendChild(expandedFolder);
  }

  /**
   * creates a SiteFolderElement from a folder
   * @param {Folder} folder
   * @returns {SiteFolderElement}
   */
  static fromFolder(folder) {
    /** @type SiteFolderElement */
    const siteFolder = document.createElement("site-folder");
    siteFolder.dataset.name = folder.name;
    siteFolder.sites = folder.sites;
    return siteFolder;
  }
}

customElements.define("site-folder", SiteFolderElement);

/**
 * a "bridge" function for a SiteFolderElement
 * @param {string} name
 * @param {Site[]} sites
 * @constructor
 */
function Folder(name, sites) {
  this.name = name;
  this.sites = sites;
}
