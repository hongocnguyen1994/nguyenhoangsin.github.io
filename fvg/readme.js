"use strict"
const fs = require('fs');

let data = '';
fs.readdirSync('./').forEach(fileName => {
    if (fileName.indexOf('.html') >= 0) {
        data += `<li><a href="${fileName}">${fileName}</a></li>\n`;
    }
})
console.log("Read done!");

let temp =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Readme</title>
</head>
<body>
    <h1>LIST PAGE</h1>
    <ol style="font-weight: 700; font-size: 18px; line-height: 1.8">
        ${data}
    </ol>
</body>
</html>`;
fs.writeFile('readme.html', temp, function (err) {
    if (err) throw err;
    console.log("Write done!");
});
