import { response } from 'express';
import pool from '../utils/db.js';

export const getBooks = (req, res) => {
  pool.query('SELECT * FROM books')
  .then((response) => res.status(200).json(response.rows))
  .catch((err) => setImmediate(() => {throw err;}));
    
};

export const getBook = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    pool.query(`SELECT * FROM books WHERE id = $1`, [id])
    .then((result) => res.status(200).json(result.rows))
    .catch((err) => setImmediate(() => {throw err;}));
};


export const addBooks = (req, res) => {
    const {...data } = req.body;
    console.log(data);
    // add book to database
};

export const deleteBook = (req, res) => {
    // delete books from database
};


export const updateBook = (req, res) => {
    // update books from database
};

