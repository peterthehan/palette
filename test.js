const fs = require('fs');
const Palette = require('./palette.js');

const FILE = '';
const BUCKETS = 3;
Palette.load(FILE)
  .then((pixels) => Palette.medianCut(pixels, BUCKETS))
  .then((buckets) => Palette.sortByLuminance(buckets))
  .then((palettes) => {
    const template =
`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Palette</title>
    <style>
      body {
        display: flex;
        margin: 0;
      }
      div {
        flex-grow: 1;
        height: 100vh;
      }
    </style>
  </head>
  <body>
    ${palettes.reduce((prev, color) => {
      return prev
        + `<div style="background-color:rgb(${color.r}, ${color.g}, ${color.b});" title="rgb(${color.r},${color.g},${color.b})"></div>\n    `;
    }, '')}
  </body>
</html>`;

    fs.writeFileSync(`./palettes.html`, template, 'utf8');
  });
