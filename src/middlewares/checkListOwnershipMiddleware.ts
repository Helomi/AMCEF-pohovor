import {NextFunction, Request, Response} from "express";
import {models} from "../db";

export default function checkListOwnershipMiddleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const {UserList} = models
        const {params} = req
        const todoListId: number = Number(params.todoListId)
        const usr = req.user as any
        const userId: number = usr.id

        const validateUser = await UserList.findOne({
            where: {
                userId: userId,
                todoListId: todoListId
            }
        })
        if (!validateUser) {
            return res.status(404).json({
                type: "FAILURE",
                message: "Not found"
            })
        }
        return next()
    }
}