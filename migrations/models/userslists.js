'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersLists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usersLists.belongsTo(models.User)
      usersLists.belongsTo(models.todoList)
    }
  }
  usersLists.init({
    userId: DataTypes.BIGINT,
    todoListId: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'usersLists',
  });
  return usersLists;
};