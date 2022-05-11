import {DataTypes, Model, Sequelize} from "sequelize";
import {TODOITEM_STATUS, TODOITEM_STATUSES} from "../../utilities/enums";
import {Models} from "../index";

export class TodoItemsModel extends Model {
    id: number
    title: string
    text: string
    deadline: Date
    status: TODOITEM_STATUS


    //FK
    user_id: string
    todolist_id: number
}

export default (sequelize: Sequelize, modelName: string) => {
    TodoItemsModel.init({
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


            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            todolist_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            }

        },
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName,
            tableName: 'todoitems'
        });

    (TodoItemsModel as any).associate = (models: Models) => {
        TodoItemsModel.belongsTo(models.TodoList, {foreignKey: 'todolist_id'})
        TodoItemsModel.belongsTo(models.User, {foreignKey: 'user_id'})
    }

    return TodoItemsModel
}