import { Router } from 'express'
import TodoItemRouter from './todoitem'
import UserRouter from './user/index'
import * as GetTodoLists from './get.todolists'
import * as GetTodoList from './get.todolist'
import * as PostTodoList from './post.todolist'
import * as PatchTodoList from './patch.todolist'
import * as DeleteTodoList from './delete.todolist'
import validationMiddleware from "../../../middlewares/validationMiddleware";
import passport from "passport";

const router = Router()

export default () => {
    router.use('/:todoListID/todoItems/', TodoItemRouter())
    router.use('/:todoListId/user/', UserRouter())

    router.get('/',
        validationMiddleware(GetTodoLists.schema),
        GetTodoLists.workflow)
    router.get('/:todoListID',
        validationMiddleware(GetTodoList.schema),
        GetTodoList.workflow)
    router.post('/',
        passport.authenticate('jwt-api'),
        validationMiddleware(PostTodoList.schema),
        PostTodoList.workflow)
    router.patch('/:todoListID',
        validationMiddleware(PatchTodoList.schema),
        PatchTodoList.workflow)
    router.delete('/:todoListID',
        validationMiddleware(DeleteTodoList.schema),
        DeleteTodoList.workflow)

    return router
}

