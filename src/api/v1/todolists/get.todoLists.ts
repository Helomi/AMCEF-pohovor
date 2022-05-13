import Joi from "joi";
import {Request, Response} from "express";
import {models} from "../../../db";
import {TodoListModel} from "../../../db/models/todoLists";
import {ORDERS, GET_TODOLISTS_ORDERS} from "../../../utilities/enums";

export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object({
        limit: Joi.number().min(1).default(1),
        orderBy: Joi.string().trim().valid(...GET_TODOLISTS_ORDERS).default('id'),
        order: Joi.string().trim().valid(...ORDERS).default('asc'),
        page: Joi.number().min(1).default(1),
        token: Joi.string()
    }),
    params: Joi.object()
})

export const workflow= async(req: Request, res: Response) => {
    const {TodoList, User, TodoItem} = models
    const {query} = req
    const orderBy: string = query.orderBy as string
    const order: string = query.order as string
    const limit: number = Number(query.limit)
    const page: number = Number(query.page)

    const todoLists: TodoListModel[] = await TodoList.findAll({
        offset: (page - 1) * limit,
        limit: limit,
        order: [
             [orderBy, order]
        ],
        include: [{
            model: User,
            attributes: ['id', 'username']
        },
        {
            model: TodoItem
        }]
    })

    res.status(200).json({
        todoLists,
        pagination: {
            limit: limit,
            page: page
        }

    })
}