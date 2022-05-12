import Joi from "joi";
import {Request, Response} from "express";
import {models} from "../../../../db";


export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        todoListId: Joi.number().integer().min(1).required(),
        userId: Joi.number().integer().min(1).required()
    })
})

export const workflow = async (req: Request, res: Response) => {
    const {UserList} = models
    const {params} = req
    const usr = req.user as any
    const userId:number = usr.id
    const todoListId:number = Number(params.todoListId)
    const newUser:number = Number(params.userId)

    const validateUser = await UserList.findOne({
        where: {
            userId: userId,
            todoListId: todoListId
        }
    })
    if (!validateUser) {
        return res.status(403).json({
            type: "FAILURE",
            message: "Forbidden"
        })
    }

    await UserList.create({
        userId: newUser,
        todoListId: todoListId
    }).then(function (){
        res.status(200).json({
            type: "SUCCESS",
            message: `User with ID ${newUser} was successfully added to list with ID ${todoListId}`
        })
    }).catch(function (e){
        res.status(500).json({
            type: "FAILURE",
            message: e.message
        })
    })

}