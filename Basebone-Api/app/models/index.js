const dbConfig = require("../config/mongo.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.categories = require("./category.model.js")(mongoose);

module.exports = db;