import dbConfig from '../config/db.config.js';
import Sequelize from 'sequelize';

import Tutorial from './tutorial.model';
import Comment from './comment.model';
import Tag from './tag.model';


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = Tutorial(sequelize, Sequelize);
db.comments = Comment(sequelize, Sequelize);
db.tags = Tag(sequelize, Sequelize);

// one to many between comment and tutorial
db.tutorials.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.tutorials, {
  foreignKey: "tutorialId",
  as: "tutorial",
});

// many to many between tutorial and tag
db.tags.belongsToMany(db.tutorials, {
  through: "tutorial_tag",
  as: "tutorials",
  foreignKey: "tag_id",
});
db.tutorials.belongsToMany(db.tags, {
  through: "tutorial_tag",
  as: "tags",
  foreignKey: "tutorial_id",
});

module.exports = db;