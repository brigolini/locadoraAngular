const sgbd = require('node-json-db')
const path = require('path')

const dbConf = require('node-json-db/dist/lib/JsonDBConfig');
if (process.env.NODE_ENV === 'test')
    exports.db = new sgbd.JsonDB(new dbConf.Config(path.join(__dirname, "../../data/db_test.json"), true, true, '/'));
else
    exports.db = new sgbd.JsonDB(new dbConf.Config(path.join(__dirname, "../../data/db.json"), true, false, '/'));


