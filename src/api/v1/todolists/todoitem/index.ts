import { Router } from 'express'
import validationMiddleware from "../../../../middlewares/validationMiddleware";
import * as GetTodoItems from "./get.todoitems"
import * as GetTodoItem from "./get.todoitem"
import * as PostTodoItems from "./post.todoitem"
import * as PatchTodoItems from "./patch.todoitem"
import * as DeleteTodoItems from "./delete.todoitem"
import passport from "passport";

const router = Router({mergeParams: true})

export default () => {
    router.get('/',
        validationMiddleware(GetTodoItems.schema),
        GetTodoItems.workflow)
    router.get('/:todoItemID',
        validationMiddleware(GetTodoItem.schema),
        GetTodoItem.workflow)
    router.post('/',
        passport.authenticate('jwt-api'),
        validationMiddleware(PostTodoItems.schema),
        PostTodoItems.workflow)
    router.patch('/:todoItemID',
        passport.authenticate('jwt-api'),
        validationMiddleware(PatchTodoItems.schema),
        PatchTodoItems.workflow)
    router.delete('/:todoItemID',
        passport.authenticate('jwt-api'),
        validationMiddleware(DeleteTodoItems.schema),
        DeleteTodoItems.workflow)
    return router
}