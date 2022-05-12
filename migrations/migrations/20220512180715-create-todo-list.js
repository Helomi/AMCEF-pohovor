'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('todoLists', {
          id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false
          },
        },
        {
          paranoid: false,
          timestamps: false,
          tableName: 'todoLists'
        });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('todoLists');
  }
};