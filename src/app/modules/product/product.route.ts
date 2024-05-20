import express from 'express';
import { productControllers } from './product.controller';

const router = express.Router();

router
  .route('/')
  .post(productControllers.createProduct)
  .get(productControllers.getAllProducts);

export const productRoutes = router;
