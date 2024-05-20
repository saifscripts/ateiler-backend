import express, { Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';

const app = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/products', productRoutes);

app.get('/hello-world', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
