import { Router } from 'express'
import * as PostLogin from './post.login'
import * as PostRegister from './post.register'
import validationMiddleware from "../../../middlewares/validationMiddleware";
import loginMiddleware from "../../../middlewares/loginMiddleware";
import errorMiddleware from "../../../middlewares/errorMiddleware";

const router = Router()

export default () => {
    router.post('/login',
        validationMiddleware(PostLogin.schema),
        loginMiddleware(),
        PostLogin.workflow,
        errorMiddleware())
    router.post('/register',
        validationMiddleware(PostRegister.schema),
        PostRegister.workflow,
        errorMiddleware())

    return router
}