const express = require('express'),
    path = require('path'),
    process = require('process'),
    bodyParser = require('body-parser');
const { compileFunction } = require('vm');
    fs = require('fs');

const app = express(),
    html = path.join(__dirname, 'src', 'index.html'),
    data = path.join(__dirname, 'src', 'data.json');

app.use(bodyParser.json());

app.get('/' ,(request, response)=>{
    response.sendFile(html);
});

app.post('/refresh', (req, res)=>{
    res.send(JSON.stringify(fs.readFileSync(data, 'utf-8'),'\n'));
});

app.post('/add', (req, res)=>{
    let resdata = JSON.parse(fs.readFileSync(data, 'utf-8'));
    resdata.data.push(req.body);

    console.log(resdata);
    fs.writeFileSync(data, JSON.stringify(resdata));
});

var JSONtemp = (inner)=> `{"data":[${inner}]}`;

app.listen(process.env.PORT || 8080, ()=>{
    console.log("WebApp Running");
    fs.writeFile(data, JSONtemp(''), (err)=>{
        if(err) return console.log(err);
        console.log('Data File Created');
    });
});