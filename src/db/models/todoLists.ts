import {DataTypes, Model, Sequelize} from "sequelize";
import {Models} from "../index";
import {UserModel} from "./user";
import {TodoItemsModel} from "./todoItems";

export class TodoListModel extends Model {
    id: number
    title: string

    users: UserModel
    todoItems: TodoItemsModel


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
        TodoListModel.belongsToMany(models.User, {through: models.UserList,
            as: {
                singular: 'user',
                plural: 'users'
            }})
        TodoListModel.hasMany(models.UserList)
        TodoListModel.hasMany(models.TodoItem, {foreignKey: 'todolist_id'})
    }

    return TodoListModel
}