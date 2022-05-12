import { Router } from 'express'
import AuthRouter from './auth'
import TodoListRouter from './todolists'
import UserRouter from './users'

const router = Router()

export default () => {
    router.use('/auth/', AuthRouter())
    router.use('/todoLists/', TodoListRouter())
    router.use('/users/', UserRouter())

    return router
}