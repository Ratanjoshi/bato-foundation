"use strict";
const fs = require("fs");
const _ = require("lodash");
const path = require("path");

const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

const config = require(__dirname + "/../configs/db-config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// ---------- Load models ----------
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );

    // ✅ Register by ORIGINAL model name (used inside associate())
    db[model.name] = model;

    // ✅ ALSO register by camelCase + "Model" (backward-compat)
    db[_.camelCase(model.name) + "Model"] = model;
  });

// ---------- Run associations ONCE per unique class ----------
const seen = new Set();
Object.keys(db).forEach((key) => {
  const model = db[key];
  if (!model || !model.associate) return;
  if (seen.has(model)) return; // ✅ skip duplicates (User === userModel)
  seen.add(model);
  model.associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
