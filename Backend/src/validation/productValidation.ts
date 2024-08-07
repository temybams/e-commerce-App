import Joi from 'joi';
import mongoose from 'mongoose';

export const ProductValidationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    imageURL: Joi.string().uri().required(),
    createdBy: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid'); 
        }
        return value;
    }).required()
}).messages({
    'any.invalid': 'Invalid ObjectId' 
});
