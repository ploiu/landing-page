const siteListElement = document.querySelector('main > section#mainSiteList')
// make sure to let the user know to set up their site list object
if(!globalThis.siteList) {
    siteListElement.remove()
    document.querySelector('#missingSiteList').style.display = null
} else {
    globalThis.siteList.forEach(site => {
        const siteElement = document.createElement('site-element')
        siteElement.dataset.title = site.title
        siteElement.dataset.href = site.href
        siteElement.dataset.img = site.img
        // TODO change once we have the container for sites
        siteListElement.appendChild(siteElement)
    })
}
