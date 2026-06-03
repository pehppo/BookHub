import fs from 'fs/promises';
import connectDB from './databaseAcess.js';
import Book from '../models/books.js';



await connectDB();
const file = await fs.readFile('./assets/api/books.json', 'utf-8');

const data = JSON.parse(file);

const books = Object.values(data.books);

console.log(books[0]); // primeiro livro

await Book.insertMany(books);

console.log(`${books.length} livros importados!`);

process.exit();