import { Router } from 'express'
import validationMiddleware from "../../../middlewares/validationMiddleware";
import * as GetUser from "./get.user"
import errorMiddleware from "../../../middlewares/errorMiddleware";

const router = Router()

export default () => {
    router.get('/:userId',
        validationMiddleware(GetUser.schema),
        GetUser.workflow,
        errorMiddleware())
    return router
}