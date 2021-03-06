import Joi from "joi";
import {Request, Response} from "express";
import {models} from "../../../db";


export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        todoListId: Joi.number().integer().min(1).required()
    })
})

export const workflow = async (req: Request, res: Response) => {
    const {TodoList, User, TodoItem} = models
    const {params} = req
    const id: number = Number(params.todoListId)

    const todoList = await TodoList.findOne({
        where: {
            id: id
        },
        include: [{
            model: User,
            attributes: ['id', 'username']
        },
        {
            model: TodoItem
        }]

    })
    if (!todoList) {
        return res.status(404).json({
            status: "Failure",
            message: "TodoList not found"
        })
    }
    return res.status(200).json(todoList)
}
