const express = require("express");
const cors = require('cors');
const bodyparser = require('body-parser')
const fs = require('fs');

const app = express();

app.use(cors(), bodyparser.json());

app.listen(process.env.PORT || 9000, () => {
    console.log("Backend listening to port 9000.");
});

app.get('/categories', async (req, res) => {
    
    const categories =  fs.readdirSync('datasets/');
    var response = []; 
    categories.forEach( c => {
        const files = fs.readdirSync('datasets/' + c);
        let dates = [];
        files.forEach( f => {
            dates.push(f.replace('.json', ''));
        });
        response.push({'category': c, 'dates': dates})
    });

    res.json(response);
});

app.post('/categories', async (req, res) => {
    if(req.body['category'] == null && req.body['date'] == null) return res.end();
    var df = undefined;

    var file = findFile(req.body['category'], req.body['date'])

    if(file != undefined)
        df = rFile('datasets/' + req.body['category'] + '/' + file);

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