import express from 'express';
import connectDB from './config/databaseAcess.js';
import Book from './models/books.js';
import cors from 'cors';

const app = express();

app.use(cors()); // libera acesso
app.use(express.json());

await connectDB();




app.post('/books', async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
});
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: 'Livro não encontrado'
            });
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
app.listen(3000, () => {
    console.log('Servidor rodando');
});