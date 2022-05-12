import { Router } from 'express'
import validationMiddleware from "../../../../middlewares/validationMiddleware";
import * as TodoItem from "./get.todoitem"
import * as TodoItems from "./get.todoitems"

const router = Router({mergeParams: true})

export default () => {
    router.get('/',
        validationMiddleware(TodoItems.schema),
        TodoItems.workflow)
    router.get('/:todoitemID',
        validationMiddleware(TodoItem.schema),
        TodoItem.workflow)

    return router
}