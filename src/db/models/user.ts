import {DataTypes, Model, Sequelize} from "sequelize";
import {Models} from "../index";

export class UserModel extends Model {
    id: number
    username: string
    password: string
    email: string
}

export default (sequelize: Sequelize, modelName: string) => {
    UserModel.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName,
            tableName: 'users'
        });

    (UserModel as any).associate = (models: Models) => {
        UserModel.hasMany(models.UserList)
        UserModel.belongsToMany(models.TodoList, {through: models.UserList})
    }

    return UserModel
}