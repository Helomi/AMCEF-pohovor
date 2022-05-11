import Joi from "joi";
import {Request, Response} from "express";
import {models} from "../../../db";


export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object()
})

export const workflow= async(req: Request, res: Response) => {
    const {TodoList, User} = models
    const {query} = req
    const todolists = await TodoList.findAll({
        include: [{
            model: User
        }]
    })

    res.status(200).json(todolists)
}