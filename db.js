/**
 * Created by zubair on 12-Aug-16.
 */
'use strict';

var db = {},
    Sequelize = require('sequelize'),
    $ = require('jquery-deferred'),
    path = require('path'),
    fs = require("fs"),
    modelsPath = path.join(__dirname, "model"),
    sequelize = new Sequelize('SquelizeTest', 'sa', 'sa229', {
        host: 'localhost',
        dialect: 'mssql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    });


db.model = {};
fs.readdirSync(modelsPath).forEach(function (file) {
    db.model[file.replace('.js', '')] = require("./model/" + file);
});

var deferreds = [],
    count = 0;
for (let key in db.model) {
    deferreds.push($.Deferred());
    deferreds[count].resolve(db.model[key].initModel(sequelize, Sequelize));
    ++count;
}

//$.when.apply($, deferreds).done(function () {
//    console.log(db);
//});


module.exports = db;


