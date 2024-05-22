import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';
import { orderRoutes } from './app/modules/order/order.route';
import { ICustomError } from './app/shared/types';

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
app.use(
  (
    err: ICustomError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): void => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';

    res.status(statusCode).json({
      success: false,
      message,
    });
  },
);

export default app;
