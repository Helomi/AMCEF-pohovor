import Joi from "joi";
import {Request, Response} from "express";
import {models} from "../../../../db";


export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        todoListId: Joi.number().integer().min(1).required(),
        todoItemId: Joi.number().integer().min(1).required()
    })
})

export const workflow = async (req: Request, res: Response) => {
    const {TodoItem} = models
    const {params} = req
    const todoItemId:number = Number(params.todoItemId)
    const todoListId:number = Number(params.todoListId)

    const itemToRemove = await TodoItem.findOne({
        where: {
            id: todoItemId,
            todoListId: todoListId
        }
    })
    if (!itemToRemove) {
        return res.status(404).json({
            type: "FAILURE",
            message: `Item with id ${todoItemId} was not found`
        })
    }
    await itemToRemove.destroy().then(function () {
        res.status(200).json({
            type: "SUCCESS",
            message: `Item with ID ${todoItemId} was removed`
        })
    }).catch(function (e){
        res.status(500).json({
            type: "FAILURE",
            message: e.message
        })
    })

}