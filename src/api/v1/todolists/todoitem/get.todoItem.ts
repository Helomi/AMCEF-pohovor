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
    const {TodoItem, TodoList} = models
    const {params} = req
    const todoItemId: number = Number(params.todoItemId)
    const todoListId: number = Number(params.todoListId)

    const todoItem = await TodoList.findAll({
        where: {
            id: todoListId
        },
        include: [{
            model: TodoItem,
            where: {
                id: todoItemId
            }
        }]
    })
    if (!todoItem) {
        return res.status(404).json({
            status: "Failure",
            message: `Item with ID ${todoItemId} in List with ${todoListId} not found`
        })
    }
    res.status(200).json(todoItem)
}