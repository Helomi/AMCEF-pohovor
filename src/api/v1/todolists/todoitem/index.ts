import { Router } from 'express'
import validationMiddleware from "../../../../middlewares/validationMiddleware";
import * as GetTodoItems from "./get.todoItems"
import * as GetTodoItem from "./get.todoItem"
import * as PostTodoItem from "./post.todoItem"
import * as PatchTodoItem from "./patch.todoItem"
import * as DeleteTodoItem from "./delete.todoItem"
import passport from "passport";

const router = Router({mergeParams: true})

export default () => {
    router.get('/',
        validationMiddleware(GetTodoItems.schema),
        GetTodoItems.workflow)
    router.get('/:todoItemId',
        validationMiddleware(GetTodoItem.schema),
        GetTodoItem.workflow)
    router.post('/',
        passport.authenticate('jwt-api'),
        validationMiddleware(PostTodoItem.schema),
        PostTodoItem.workflow)
    router.patch('/:todoItemId',
        passport.authenticate('jwt-api'),
        validationMiddleware(PatchTodoItem.schema),
        PatchTodoItem.workflow)
    router.delete('/:todoItemId',
        passport.authenticate('jwt-api'),
        validationMiddleware(DeleteTodoItem.schema),
        DeleteTodoItem.workflow)
    return router
}