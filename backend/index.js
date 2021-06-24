const express = require("express");
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors(), express.json());

app.listen(process.env.PORT || 9000, () => {
    console.log("Backend listening to port 9000.");
});

app.get('/categories', async (req, res) => {
    let counter = 0;
    let response = []; 
    fs.promises.readdir('datasets/').then(categories => {   
        categories.forEach( c => {
            fs.promises.readdir('datasets/' + c).then((files) => {
                let dates = [];
                files.forEach( f => {
                    dates.push(f.replace('.json', ''));
                });
                response.push({'category': c, 'dates': dates});
                
            }).then(() => {
                counter++;

                if (counter === categories.length) {
                    res.json(response);
                }
            });
        })
        
    })
});

app.post('/categories', async (req, res) => {
    if(req.body['category'] == null && req.body['date'] == null) return res.end();
    let df = undefined;

    const file = findFile(req.body['category'], req.body['date'])

    if(file != undefined)
        df = rFile('datasets/' + req.body['category'] + '/' + file);

    res.json(df);
});

function findFile(dataSet, date) {
    let files = fs.readdirSync('datasets/' + dataSet);
    let file = undefined;
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