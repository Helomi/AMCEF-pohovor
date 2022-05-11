import {DataTypes, Model, Sequelize} from "sequelize";
import {Models} from "../index";

export class TodoListModel extends Model {
    id: number
    title: string

}

export default (sequelize: Sequelize, modelName: string) => {
    TodoListModel.init({
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
            sequelize,
            modelName,
            tableName: 'todolists'
        });

    (TodoListModel as any).associate = (models: Models) => {
        TodoListModel.belongsToMany(models.User, {through: models.UserList})
        TodoListModel.hasMany(models.UserList)
        TodoListModel.hasMany(models.TodoItem, {foreignKey: 'todolist_id'})
    }

    return TodoListModel
}