'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('usersLists', {
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
          tableName: 'usersLists'
        });
      await queryInterface.addConstraint('usersLists', {
          fields: ['userId'],
          type: 'foreign key',
          references: {
              table: 'users',
              field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      })
      await queryInterface.addConstraint('usersLists', {
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
    await queryInterface.dropTable('usersLists');
  }
};