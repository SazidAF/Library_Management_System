import { response } from 'express';
import pool from '../utils/db.js';

const client = await pool.connect();

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
 

export const addBooks = async (req, res) => {
    // add book to database
    try {
        const {...book } = req.body;
        await client.query('BEGIN')
        const queryText = 'INSERT INTO books(name, author, genre) VALUES($1, $2, $3) RETURNING id, name, author';
        const result = await client.query(queryText, [book.name, book.author, book.genre]);
        await client.query('COMMIT');
        res.status(201).json(result.rows);
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

export const deleteBook = (req, res) => {
    // delete books from database    
    pool.query(`DELETE FROM books WHERE id = $1`, [id])
    .then((result) => res.status(200).json(result.rows))
    .catch((err) => setImmediate(() => {throw err;}));
};


export const updateBook = (req, res) => {
    // update books from database
};

