import Joi from "joi";
import {Request, Response} from "express";
import {models} from "../../../../db";


export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object()
})


export const workflow = async (req: Request, res: Response) => {
    const {TodoItem, TodoList} = models
    const {params} = req
    const todoItemID: number = Number(params.todoitemID)
    const todoListID: number = Number(params.todolistID)

    const todoItem = await TodoList.findAll({
        where: {
            id: todoListID
        },
        include: [{
            model: TodoItem,
            where: {
                id: todoItemID
            }
        }]
    })
    if (!todoItem) {
        return res.status(404).json({
            status: "Failure",
            message: `Item with ID ${todoItemID} in List with ${todoListID} not found`
        })
    }
    res.status(200).json(todoItem)
}