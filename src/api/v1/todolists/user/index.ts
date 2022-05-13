import { Router } from 'express'
import * as PostUser from "./post.user"
import passport from "passport";
import validationMiddleware from "../../../../middlewares/validationMiddleware";
import errorMiddleware from "../../../../middlewares/errorMiddleware";

const router = Router({mergeParams: true})

export default () => {
    router.post('/:userId',
        passport.authenticate('jwt-api'),
        validationMiddleware(PostUser.schema),
        PostUser.workflow,
        errorMiddleware())
    return router
}
