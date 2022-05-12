import Joi from "joi";
import {Request, Response} from "express";
import {models} from "../../../../db";


export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        todoListID: Joi.number().integer().min(1).required(),
        todoItemID: Joi.number().integer().min(1).required()
    })
})

export const workflow = async (req: Request, res: Response) => {
    const {TodoItem} = models
    const {params} = req
    const todoItemID:number = Number(params.todoItemID)
    const todoListID:number = Number(params.todoListID)

    const itemToRemove = await TodoItem.findOne({
        where: {
            id: todoItemID,
            todolist_id: todoListID
        }
    })
    if (!itemToRemove) {
        return res.status(404).json({
            type: "FAILURE",
            message: `Item with id ${todoItemID} was not found`
        })
    }
    await itemToRemove.destroy().then(function () {
        res.status(200).json({
            type: "SUCCESS",
            message: `Item with ID ${todoItemID} was removed`
        })
    }).catch(function (e){
        res.status(500).json({
            type: "FAILURE",
            message: e.message
        })
    })

}