import { Router } from 'express'
import TodoItemRouter from './todoitem'
import UserRouter from './user/index'
import * as GetTodoLists from './get.todoLists'
import * as GetTodoList from './get.todoList'
import * as PostTodoList from './post.todoList'
import * as PatchTodoList from './patch.todoList'
import * as DeleteTodoList from './delete.todoList'
import validationMiddleware from "../../../middlewares/validationMiddleware";
import passport from "passport";
import checkListOwnershipMiddleware from "../../../middlewares/checkListOwnershipMiddleware";
import errorMiddleware from "../../../middlewares/errorMiddleware";

const router = Router()

export default () => {
    router.use('/:todoListId/todoItems/', TodoItemRouter())
    router.use('/:todoListId/user/', UserRouter())

    router.get('/',
        validationMiddleware(GetTodoLists.schema),
        GetTodoLists.workflow,
        errorMiddleware())
    router.get('/:todoListId',
        validationMiddleware(GetTodoList.schema),
        GetTodoList.workflow,
        errorMiddleware())
    router.post('/',
        passport.authenticate('jwt-api'),
        validationMiddleware(PostTodoList.schema),
        PostTodoList.workflow,
        errorMiddleware())
    router.patch('/:todoListId',
        passport.authenticate('jwt-api'),
        checkListOwnershipMiddleware(),
        validationMiddleware(PatchTodoList.schema),
        PatchTodoList.workflow,
        errorMiddleware())
    router.delete('/:todoListId',
        passport.authenticate('jwt-api'),
        checkListOwnershipMiddleware(),
        validationMiddleware(DeleteTodoList.schema),
        DeleteTodoList.workflow,
        errorMiddleware())

    return router
}

