import Joi from "joi";
import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {models} from "../../../db";

export const schema = Joi.object( {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(8).required(),
        email: Joi.string().pattern(/^([a-zA-Z]*)(@)([a-zA-Z]*)/).required()
    }),
    query: Joi.object(),
    params: Joi.object()
})

export const workflow = async (req: Request, res: Response) => {
    const {User} = models
    const {body} = req
    body.password = await bcrypt.hash(body.password, 12)
    await User.create(body).then(function () {
        res.status(200).json({
            type: "SUCCESS",
            message: "Your registration was successful"
        })
    }).catch(function (e){
        res.status(500).json({
            type: "FAILURE",
            message: e.message
        })
    })

}