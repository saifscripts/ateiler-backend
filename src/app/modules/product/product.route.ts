import express from 'express';
import { productControllers } from './product.controller';

const router = express.Router();

router.route('/').post(productControllers.createProduct);

export const productRoutes = router;
