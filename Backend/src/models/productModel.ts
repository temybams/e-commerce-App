import mongoose, { Schema, Document } from 'mongoose';
import { ProductValidationSchema } from '../validation/productValidation';


interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    imageURL: string;
    createdBy: mongoose.Schema.Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});


ProductSchema.pre<IProduct>('validate', async function (next) {
    console.log('Pre-validation Middleware: Product details:', this);

    try {
        const { name, description, price, imageURL, createdBy } = this;
        
        await ProductValidationSchema.validateAsync(
            { name, description, price, imageURL, createdBy: createdBy.toString() },
            { abortEarly: false }
        );
        next();
    } catch (error: any) {
        console.error('Validation Error:', error);
        next(error);
    }
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
