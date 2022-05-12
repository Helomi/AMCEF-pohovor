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
    const userID:number = usr.id
    const todoListID:number = Number(params.todoListId)
    const newUser:number = Number(params.userId)

    const validateUser = await UserList.findOne({
        where: {
            userId: userID,
            todoListId: todoListID
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
        todoListId: todoListID
    }).then(function (){
        res.status(200).json({
            type: "SUCCESS",
            message: `User with ID ${newUser} was successfully added to list with ID ${todoListID}`
        })
    }).catch(function (e){
        res.status(500).json({
            type: "FAILURE",
            message: e.message
        })
    })

}