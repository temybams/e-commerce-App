import { Request, Response } from 'express';
import Product from '../models/productModel';


export const createProduct = async (req: Request, res: Response) => {
    const { name, description, price, imageURL } = req.body;
    const createdBy = req.user;

    if (!name || !description || !price || !imageURL) {
        return res.status(400).json({ message: 'Please provide name, description, price, and imageURL.' });
    }

    try {

        const product = new Product({ name, description, price, imageURL, createdBy });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};



export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Product ID is required.' });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price, imageURL } = req.body;

    // console.log('Updating product with ID:', id);
    // console.log('Request Body:', { name, description, price, imageURL });
    // console.log('Authenticated user ID:', req.user);

    if (!id) {
        console.log('Product ID is missing');
        return res.status(400).json({ message: 'Product ID is required.' });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            console.log('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }


        if (product.createdBy.toString() !== req.user?.toString()) {
            console.log('User not authorized to update this product');
            return res.status(403).json({ message: 'You are not authorized to update this product' });
        }

        let updated = false;

        if (name && name !== product.name) {
            product.name = name;
            updated = true;
        }

        if (description && description !== product.description) {
            product.description = description;
            updated = true;
        }

        if (price && price !== product.price) {
            product.price = price;
            updated = true;
        }

        if (imageURL && imageURL !== product.imageURL) {
            product.imageURL = imageURL;
            updated = true;
        }

        if (!updated) {
            console.log('No changes detected');
            return res.status(200).json({ message: 'No changes made to the product' });
        }

        await product.save();
        console.log('Product updated successfully');
        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};



export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Product ID is required.' });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }


        if (product.createdBy.toString() !== req.user) {
            return res.status(403).json({ message: 'You are not authorized to delete this product' });
        }

        await product.deleteOne();
        res.status(200).json({ message: 'Product removed' });
    } catch (error: any) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
