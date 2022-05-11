import { Router } from 'express'
import AuthRouter from './auth'
import TodoListRouter from './todolists'

const router = Router()

export default () => {
    router.use('/auth/', AuthRouter())
    router.use('/todolists/', TodoListRouter())

    return router
}