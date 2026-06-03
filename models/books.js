// models/User.js
import mongoose from 'mongoose';

const { Schema } = mongoose;
const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: [{
        type: String,
        trim: true
    }],
    genre: [{
        type: String,
        trim: true
    }],
    image: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    year: {
        type: Number,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    category: [{
        type: String,
        trim: true
    }],
    description: {
        type: String,
        trim: true
    }
});


// const book = await Book.create({
//     title: 'Hunter x Hunter - Volume 1',
//     author: 'Yoshihiro Togashi',
//     genre: 'Ação, Aventura, Fantasia',
//     image: 'assets/imgs/hunter-x-hunter-1.jpg',
//     rating: 4.9,
//     year: 1998,
//     pages: 184,
//     price: 26.24,
//     link: 'https://www.amazon.com.br/',
//     category: ['lancamentos'],
//     description: 'Gon Freecss é um garoto de 12 anos que vive na Ilha da Baleia.'
// });
const Book = mongoose.model('Book', bookSchema);

export default Book;