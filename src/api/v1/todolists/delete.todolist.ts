import Joi from "joi";
import {Request, Response} from "express";
import {models} from "../../../db";


export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        todoListID: Joi.number().integer().min(1).required()
    })
})

export const workflow = async (req: Request, res: Response) => {
    const {params} = req
    const id: number = Number(params.todoListID)
    const {TodoList} = models
    await TodoList.destroy({
        where: {
            id: id
        }
    })

    res.status(200).json({
        type: "SUCCESS",
        message: `TodoList with ID ${id} was successfully deleted`
    })
}