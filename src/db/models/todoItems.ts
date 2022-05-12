import {DataTypes, Model, Sequelize} from "sequelize";
import {TODOITEM_STATUS, TODOITEM_STATUSES} from "../../utilities/enums";
import {Models} from "../index";

export class TodoItemModel extends Model {
    id: number
    title: string
    text: string
    deadline: Date
    status: TODOITEM_STATUS


    //FK
    userId: number
    todoListId: number
}

export default (sequelize: Sequelize, modelName: string) => {
    TodoItemModel.init({
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
                type: DataTypes.ENUM(...TODOITEM_STATUSES),
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
            sequelize,
            modelName,
            tableName: 'todoItems'
        });

    (TodoItemModel as any).associate = (models: Models) => {
        TodoItemModel.belongsTo(models.TodoList, {foreignKey: 'todoListId'})
        TodoItemModel.belongsTo(models.User, {foreignKey: 'userId'})
    }

    return TodoItemModel
}