import Joi from "joi";
import {Request, Response} from "express";
import {models} from "../../../db";


export const schema = Joi.object( {
    body: Joi.object({
        title: Joi.string().min(8)
    }),
    query: Joi.object(),
    params: Joi.object({
        todolistID: Joi.number().integer().min(1).required()
    })
})


export const workflow = async (req: Request, res: Response) => {
    const {TodoList} = models
    const {body, params} = req
    const id: number = Number(params.todolistID)


    await TodoList.update(body, {
        where: {
            id: id
        }
    })

    res.status(200).json({
        type: "SUCCESS",
        Message: "TodoList was successfully updated"
    })

}