import express, { Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';
import { orderRoutes } from './app/modules/order/order.route';
import { errorHandler } from './app/shared/middlewares/errorHandler';

const app = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// test route
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

// handle unmatched routes
app.all('/*', (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// global error handler
app.use(errorHandler);

export default app;
