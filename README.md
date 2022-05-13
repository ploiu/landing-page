# landing-page

A simple, dependency-less, customizable web page for your browser to open up to

## Features

- Customizable Color Scheme
- Easy to add your own sites
- Responsive to different screen sizes (still working on that part)

## Get Started

Very little setup is required to set this project up. Here's the steps:

1. add a `sites.js` file in the js folder
2. create a variable named `siteList`, which is an array of `Site` objects
3. reload your browser

Example:

```js
const siteList = [
  new Site("Example", "https://www.example.com", "example.png"),
];
```

Images should be stored in `/img`

## Customizing

in `css/vars.css`, you'll see a list of css variables that can be used on your
landing page. Feel free to customize them however you see fit.
