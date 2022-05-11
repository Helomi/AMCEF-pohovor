import { Sequelize } from "sequelize"
import * as database from '../../config/database'
import {forEach} from "lodash";
import modelUser from './models/user'
import modelTodoItem from './models/todoItems'
import modelTodoList from './models/todoLists'
import modelUsersLists from './models/usersLists'

const env = process.env.NODE_ENV
const { url, options } = (database as any)[env]

const sequelize = new Sequelize(url, options)

console.log(url)

sequelize.authenticate()
    .then(()=> console.log('Database connection has been established succesfully'))
    .catch((err) => console.log(`Unable to connect to database ${err.messages}`))

const modelsBuilder = (instance: Sequelize) => ({
    User: modelUser(instance, 'user'),
    TodoList: modelTodoList(instance, 'todoList'),
    UserList: modelUsersLists(instance, 'userList'),
    TodoItem: modelTodoItem(instance, 'todoItem')
})

const buildModels = () => {
    const models = modelsBuilder(sequelize)

    forEach(models, (model: any) => {
        if(model.associate) {
            model.associate(models)
        }
    })

    return models
}

const models = buildModels()
type Models = typeof models

export type { Models }
export { models }

export default sequelize