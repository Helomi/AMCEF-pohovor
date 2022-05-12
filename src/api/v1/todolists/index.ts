import { Router } from 'express'
import TodoItemRouter from './todoitem'
import * as GetTodoLists from './get.todolists'
import * as GetTodoList from './get.todolist'
import * as PostTodoList from './post.todolist'
import validationMiddleware from "../../../middlewares/validationMiddleware";
import passport from "passport";

const router = Router()

export default () => {
    router.use('/:todolistID/items/', TodoItemRouter())
    router.get('/',
        validationMiddleware(GetTodoLists.schema),
        GetTodoLists.workflow)
    router.get('/:todolistID',
        validationMiddleware(GetTodoList.schema),
        GetTodoList.workflow)
    router.post('/',
        passport.authenticate('jwt-api'),
        validationMiddleware(PostTodoList.schema),
        PostTodoList.workflow)


    return router
}