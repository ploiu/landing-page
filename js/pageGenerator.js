const siteListElement = document.querySelector("main > section#mainSiteList");
// make sure to let the user know to set up their site list object
if (!(globalThis.siteList ?? siteList)) {
  siteListElement.remove();
  document.querySelector("#missingSiteList").style.display = null;
} else {
  (globalThis.siteList ?? siteList).forEach((site) => {
    if (site instanceof Site) {
      const siteElement = SiteElement.fromSite(site);
      siteListElement.appendChild(siteElement);
    } else if (site instanceof Folder) {
      const folderElement = SiteFolderElement.fromFolder(site);
      siteListElement.appendChild(folderElement);
    }
  });
}
