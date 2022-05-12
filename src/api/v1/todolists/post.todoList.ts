import Joi from "joi";
import {Request, Response} from "express";
import {models} from "../../../db";
import {UserModel} from "../../../db/models/user";


export const schema = Joi.object( {
    body: Joi.object({
        title: Joi.string().min(8).max(100).required()
    }),
    query: Joi.object(),
    params: Joi.object()
})

export const workflow = async (req: Request, res: Response) => {
    const usr = req.user as any
    const userId:number = usr.id
    const {User, TodoList} = models
    const user: UserModel = await User.findByPk(userId)
    await TodoList.create(req.body).then(function (newTodoList){
        // @ts-ignore Metóda existuje ale keďže nie je statická ale vytvorená dynamicky tak ju webstorm nepozná.
        user.addTodoList(newTodoList)
        res.status(200).json({
            messages: [{
                type: "SUCCESS",
                message: "New todoList was successfully created"
            }],
            todoList: {
                id: newTodoList.id,
                title: newTodoList.title
            }
        })
    }).catch(function (e) {
        res.status(400).json({
            messages: [{
                type: "FAILURE",
                message: "Somethings goes wrong"
            }]
        })
        console.log(`Post_todolist error: ${e}`)
    })
}