import { Router } from 'express'
import * as PostUser from "./post.user"
import passport from "passport";
import validationMiddleware from "../../../../middlewares/validationMiddleware";

const router = Router({mergeParams: true})

export default () => {
    router.post('/:userId',
        passport.authenticate('jwt-api'),
        validationMiddleware(PostUser.schema),
        PostUser.workflow)
    return router
}
