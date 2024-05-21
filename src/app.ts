import express, { Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';

const app = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default app;
