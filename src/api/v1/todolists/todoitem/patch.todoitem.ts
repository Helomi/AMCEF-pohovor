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
        todoListID: Joi.number().integer().min(1).required(),
        todoItemID: Joi.number().integer().min(1).required()
    })
})

export const workflow = async (req: Request, res: Response) => {
    const {TodoItem, User, UserList} = models
    const {params, body} = req
    const todoListID:number = Number(params.todoListID)
    const todoItemID:number = Number(params.todoItemID)
    const usr = req.user as any
    const userID:number = usr.id
    body.user_id = userID
    body.todolist_id = todoListID

    const userVerification = await User.findOne({
        include: {
            model: UserList,
            where: {
                todoListId: todoListID
            }
        },
        where: {
            id: userID
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
            id: todoItemID,
            todolist_id: todoListID
        }
    })

    if (!itemToUpdate) {
        return res.status(404).json({
            type: "FAILURE",
            message: `Item with ID ${todoItemID} was not found in list with ID ${todoListID}`
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