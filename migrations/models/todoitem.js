'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todoItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      todoItem.belongsTo(models.todoList, {foreignKey: 'todoListId'})
      todoItem.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  todoItem.init({
    id: DataTypes.BIGINT,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    deadline: DataTypes.DATE,
    status: DataTypes.String
  }, {
    sequelize,
    modelName: 'todoItem',
  });
  return todoItem;
};