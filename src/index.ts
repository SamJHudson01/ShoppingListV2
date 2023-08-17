import express from 'express';
import shoppingListRouter from './routes/shoppingListItem'; // Adjust the path as needed
import bodyParser from 'body-parser';

const app = express();

// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/api/shopping-list', shoppingListRouter);

export default app;

