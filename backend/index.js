const express = require("express");
const cors = require('cors');
const bodyparser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(cors(), bodyparser.json());

app.listen(3000, () => {
    console.log("Backend listening to port 3000.");
});

app.get('/categories', async (req, res) => {
    // TODO: aus Datei einlesen
    
    const categories = {categories: fs.readdirSync('datasets/')};

    res.json(categories);
});

app.post('/categories', async (req, res) => {
    if(req.body['categorie'] == null && req.body['date'] == null) return res.end();
    var df = undefined;

    var file = findFile(req.body['categorie'], req.body['date'])

    if(file != undefined)
        df = rFile('datasets/' + req.body['categorie'] + '/' + file);

    res.json(df);
});

function findFile(dataSet, date) {
    var files = fs.readdirSync('datasets/' + dataSet);
    var file = undefined;
    files.forEach(f => {
        if(f.includes(date))
            file = f;
    });

    return file;
}

function rFile(filePath) {
    let df = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(df);
}