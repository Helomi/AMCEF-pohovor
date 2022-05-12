import { Router } from 'express'
import * as Login from './post.login'
import validationMiddleware from "../../../middlewares/validationMiddleware";
import loginMiddleware from "../../../middlewares/loginMiddleware";

const router = Router()

export default () => {
    router.post('/login',
        validationMiddleware(Login.schema),
        loginMiddleware(),
        Login.workflow)

    return router
}