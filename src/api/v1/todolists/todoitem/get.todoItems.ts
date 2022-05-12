import Joi from "joi";
import {Request, Response} from "express";
import {models} from "../../../../db";
import {size} from "lodash";


export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        todoListId: Joi.number().integer().min(1).required()
    })
})

export const workflow = async (req: Request, res: Response) => {
    const {TodoItem, TodoList} = models
    const {params} = req
    const todoListId: number = Number(params.todoListId)

    const todoList = await TodoList.findOne({
        where: {
            id: todoListId
        },
        include: [{
            model: TodoItem
        }]
    })
    if (!todoList) {
        return res.status(404).json({
            status: "Failure",
            message: `TodoList with ID ${todoListId} not found`
        })
    } else if (size(todoList.todoItems) === 0) {
        return res.status(204).json()
    }


    res.status(200).json(todoList.todoItems)
}

