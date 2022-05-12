import Joi from "joi";
import {Request, Response} from "express";
import {models} from "../../../../db";
import {TODOITEM_STATUSES} from "../../../../utilities/enums";


export const schema = Joi.object( {
    body: Joi.object({
        title: Joi.string().min(8).required(),
        text: Joi.string().required(),
        deadline: Joi.date().required(),
        status: Joi.string().valid(...TODOITEM_STATUSES).required()
    }),
    query: Joi.object(),
    params: Joi.object({
        todoListId: Joi.number().integer().min(1).required()
    })
})

export const workflow = async (req: Request, res: Response) => {
    const {TodoItem} = models
    const {body, params} = req
    const usr = req.user as any
    const userId:number = usr.id
    const todoListId:number = Number(params.todoListId)
    body.userId = userId
    body.todoListId = todoListId

    await TodoItem.create(body).then(function (newTodoItem) {
        res.status(200).json({
            type: "SUCCESS",
            message: `New item with ID ${newTodoItem.id} was created`
        })
    }).catch(function (e) {
        res.status(400).json({
            type: "FAILURE",
            message: `${e.message}`
        })

    })
}