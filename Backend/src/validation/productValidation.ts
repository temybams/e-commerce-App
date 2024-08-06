import joi from 'joi';

export const ProductValidationSchema = joi.object({
    name: joi.string().min(3).max(50).required(),
    description: joi.string().max(500).required(),
    price: joi.number().positive().required(),
    imageURL: joi.string().uri().required(),
    createdBy: joi.string().required()
});
