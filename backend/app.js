import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';
import router from './router/router.js';
import cors from 'cors';
import morgan from 'morgan';

// loading environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// enabling CORS (so frontend can communicate with backend from different domain)
app.use(cors({
    origin: [
      'http://localhost:5173', // local development
      'http://137.184.232.207:5173' // deployed server
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('Welcome to Our Shelves API!'));
app.use('/', router);

// test database connection and fetch all books
app.get('/db-test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM books');
    res.json({ message: 'Database connected', books: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
