import Joi from "joi";
import {Request, Response} from "express";
import {models} from "../../../db";

export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        userId: Joi.number().integer().min(1).required()
        })
})

export const workflow = async (req: Request, res: Response) => {
    const {User, TodoList, TodoItem} = models
    const {params} = req
    const userId:number = Number(params.userId)

    const user = await User.findOne({
        where: {
            id: userId
        },
        attributes: ['id', 'username', 'email'],
        include: [{
            model: TodoList,
            include: [{
                model: TodoItem
            }]
        }]
    }).catch(function (e) {
        return res.json(500).json({
            type: "FAILURE",
            message: e.message
        })
    })

    if (!user) {
        return res.status(404).json({
            type: "FAILURE",
            message: `User with id ${userId} not found`
        })
    }
     return res.status(200).json(user)
}