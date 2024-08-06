import { Request, Response } from 'express';
import Product from '../models/productModel';

export const createProduct = async (req: Request, res: Response) => {
    const { name, description, price, imageURL } = req.body;
    const createdBy = req.user.id;

    try {
        const product = new Product({ name, description, price, imageURL, createdBy });
        await product.save();
        res.status(201).json(product);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price, imageURL } = req.body;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this product' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.imageURL = imageURL || product.imageURL;

        await product.save();
        res.status(200).json(product);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this product' });
        }

        await product.deleteOne();
        res.status(200).json({ message: 'Product removed' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};



