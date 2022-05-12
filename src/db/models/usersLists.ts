import {Model, Sequelize} from "sequelize";
import {Models} from "../index";

export class UsersListsModel extends Model {
    user_id: number
    todolist_id: number
}

export default (sequelize: Sequelize, modelName: string) => {
    UsersListsModel.init({},
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName,
            tableName: 'usersLists'
        });

    (UsersListsModel as any).associate = (models: Models) => {
        UsersListsModel.belongsTo(models.User)
        UsersListsModel.belongsTo(models.TodoList)
    }

    return UsersListsModel
}