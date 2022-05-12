'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('todoItems', {
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
          text: {
            type: DataTypes.STRING,
            allowNull: false
          },
          deadline: {
            type: DataTypes.DATE,
          },
          status: {
            type: DataTypes.ENUM,
            values: [
              'AKTÍVNA',
              'DOKONČENÁ',
              'ZRUŠANÁ'
            ],
            allowNull: false
          },


          userId: {
            type: DataTypes.BIGINT,
            allowNull: false
          },
          todoListId: {
            type: DataTypes.BIGINT,
            allowNull: false
          }

        },
        {
          paranoid: false,
          timestamps: false,
          tableName: 'todoItems'
        })
      await queryInterface.addConstraint('todoItems', {
          fields: ['userId'],
          type: 'foreign key',
          references: {
              table: 'users',
              field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      })
      await queryInterface.addConstraint('todoItems', {
          fields: ['todoListId'],
          type: 'foreign key',
          references: {
              table: 'todoLists',
              field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      })
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('todoItems');
  }
};