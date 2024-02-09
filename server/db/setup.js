const fs = require('fs');
require('dotenv').config({path:__dirname + '/../.env'});

const db = require('./connect');

const sql = fs.readFileSync(__dirname + '/countries.sql').toString();

db.query(sql)
    .then((data) => {
        db.end();
        console.log('Setup Complete!');
    }).catch((err) => {
        console.log(err);
    });

