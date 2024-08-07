import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getProducts);
router.post('/createproduct', protect, createProduct);
router.get('/getproductbyid/:id', getProductById);
router.put('/updateproduct/:id', protect, updateProduct);
router.delete('/deleteproduct/:id', protect, deleteProduct);

export default router;
