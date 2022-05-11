import Joi from "joi";


export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object()
})