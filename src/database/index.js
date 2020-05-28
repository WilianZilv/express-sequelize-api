const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config/database.json")["development"];
const db = {};

const sequelize = new Sequelize(config);

const __models = path.join(__dirname, "..", "models");
fs.readdirSync(__models)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = sequelize["import"](path.join(__models, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

(sync = () =>
    sequelize
        .sync()
        .catch((error) => console.log("Sequelize Error:", error.message)))();

module.exports = db;
