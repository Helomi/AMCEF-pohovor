import { Router } from 'express'
import validationMiddleware from "../../../../middlewares/validationMiddleware";
import checkListOwnershipMiddleware from "../../../../middlewares/checkListOwnershipMiddleware";
import * as GetTodoItems from "./get.todoItems"
import * as GetTodoItem from "./get.todoItem"
import * as PostTodoItem from "./post.todoItem"
import * as PatchTodoItem from "./patch.todoItem"
import * as DeleteTodoItem from "./delete.todoItem"
import passport from "passport";
import errorMiddleware from "../../../../middlewares/errorMiddleware";

const router = Router({mergeParams: true})

export default () => {
    router.get('/',
        passport.authenticate('jwt-api'),
        checkListOwnershipMiddleware(),
        validationMiddleware(GetTodoItems.schema),
        GetTodoItems.workflow,
        errorMiddleware())
    router.get('/:todoItemId',
        passport.authenticate('jwt-api'),
        checkListOwnershipMiddleware(),
        validationMiddleware(GetTodoItem.schema),
        GetTodoItem.workflow,
        errorMiddleware())
    router.post('/',
        passport.authenticate('jwt-api'),
        checkListOwnershipMiddleware(),
        validationMiddleware(PostTodoItem.schema),
        PostTodoItem.workflow,
        errorMiddleware())
    router.patch('/:todoItemId',
        passport.authenticate('jwt-api'),
        checkListOwnershipMiddleware(),
        validationMiddleware(PatchTodoItem.schema),
        PatchTodoItem.workflow,
        errorMiddleware())
    router.delete('/:todoItemId',
        passport.authenticate('jwt-api'),
        checkListOwnershipMiddleware(),
        validationMiddleware(DeleteTodoItem.schema),
        DeleteTodoItem.workflow,
        errorMiddleware())
    return router
}