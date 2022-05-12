import Joi from "joi";
import {TODOITEM_STATUSES} from "../../../../utilities/enums";
import {Request, Response} from "express";
import {models} from "../../../../db";


export const schema = Joi.object( {
    body: Joi.object({
        title: Joi.string().min(8),
        text: Joi.string(),
        deadline: Joi.date(),
        status: Joi.string().valid(...TODOITEM_STATUSES)
    }),
    query: Joi.object(),
    params: Joi.object({
        todoListId: Joi.number().integer().min(1).required(),
        todoItemId: Joi.number().integer().min(1).required()
    })
})

export const workflow = async (req: Request, res: Response) => {
    const {TodoItem, User, UserList} = models
    const {params, body} = req
    const todoListId:number = Number(params.todoListId)
    const todoItemId:number = Number(params.todoItemId)
    const usr = req.user as any
    const userId:number = usr.id
    body.userId = userId
    body.todoListId = todoListId

    const userVerification = await User.findOne({
        include: {
            model: UserList,
            where: {
                todoListId: todoListId
            }
        },
        where: {
            id: userId
        }
    })

    if (!userVerification) {
        return res.status(403).json({
            type: "FAILURE",
            message: "Forbidden"
        })
    }



    const itemToUpdate = await TodoItem.findOne({
        where:  {
            id: todoItemId,
            todoListId: todoListId
        }
    })

    if (!itemToUpdate) {
        return res.status(404).json({
            type: "FAILURE",
            message: `Item with ID ${todoItemId} was not found in list with ID ${todoListId}`
        })
    }



    await itemToUpdate.update(body).then(function (){
            res.status(200).json({
                type: "SUCCESS",
                message: "TodoItem was successfully updated"
            })
    }).catch(function (e){
            res.status(400).json({
                type: "FAILURE",
                message: e.message
            })
    })




}