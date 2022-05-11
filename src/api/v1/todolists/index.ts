import { Router } from 'express'
import TodoItemRouter from './todoitem'
import * as GetTodoLists from './get.todolists'
import validationMiddleware from "../../../middlewares/validationMiddleware";

const router = Router()

export default () => {
    router.use('/todoitem', TodoItemRouter())
    router.get('/',
        validationMiddleware(GetTodoLists.schema),
        GetTodoLists.workflow)

    return router
}