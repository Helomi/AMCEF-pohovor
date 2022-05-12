'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      todoList.belongsToMany(models.User, {through: models.usersLists})
      todoList.hasMany(models.usersLists)
      todoList.hasMany(models.todoItem, {foreignKey: 'todoListId'})
    }
  }
  todoList.init({
    id: DataTypes.BIGINT,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'todoList',
  });
  return todoList;
};