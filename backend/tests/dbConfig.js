const sgbd = require('node-json-db')
const path = require('path')

const  dbConf = require('node-json-db/dist/lib/JsonDBConfig');

exports.db = new sgbd.JsonDB(new dbConf.Config(path.join(__dirname,"../../data/db_test.json"), true, true, '/'));
