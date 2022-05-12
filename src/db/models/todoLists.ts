import {DataTypes, Model, Sequelize} from "sequelize";
import {Models} from "../index";
import {UserModel} from "./users";
import {TodoItemModel} from "./todoItems";

export class TodoListModel extends Model {
    id: number
    title: string

    users: UserModel[]
    todoItems: TodoItemModel[]


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
            tableName: 'todoLists'
        });

    (TodoListModel as any).associate = (models: Models) => {
        TodoListModel.belongsToMany(models.User, {through: models.UserList})
        TodoListModel.hasMany(models.UserList)
        TodoListModel.hasMany(models.TodoItem, {foreignKey: 'todoListId'})
    }

    return TodoListModel
}