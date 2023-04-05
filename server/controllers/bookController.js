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
        await client.query('begin')
        const querytext = 'insert into books(name, author, genre) values($1, $2, $3) returning id, name, author';
        const result = await client.query(querytext, [book.name, book.author, book.genre]);
        await client.query('commit');
        res.status(201).json(result.rows);
    } catch (error) {
        await client.query('rollback');
        throw error;
    }
};

export const deleteBook = async (req, res) => {
  // add book to database
    try {
        const id = req.params.id;
        // console.log(id);
        await client.query('BEGIN')
        const existingBook = await client.query('SELECT id FROM books WHERE id = $1', [id]);
        if (!existingBook) {
            return res.status(404).json({ message: "Book Does not Exist"});
        }
        const queryText = 'DELETE FROM books WHERE id = $1 RETURNING id, name, author';
        const result = await client.query(queryText, [id]);
        await client.query('COMMIT');
        res.status(200).json(result.rows);
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
};


export const updateBook = async (req, res) => {
    // update books from database
    try {
        const id = req.params.id;
        const { ...book } = req.body;
        // console.log(id);
        await client.query('BEGIN')
        const existingBook = await client.query('SELECT id FROM books WHERE id = $1', [id]);
        if (!existingBook) {
            return res.status(404).json({ message: "Book Does not Exist"});
        }
        const queryText = 'UPDATE books SET name = $1, author = $2, genre = $3 WHERE id = $4 RETURNING id, name, author, genre';
        const result = await client.query(queryText, [book.name, book.author, book.genre, id]);
        // console.log(result);
        await client.query('COMMIT');
        res.status(200).json(result.rows);
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
};

export const borrowBook = async (req, res) => {
    // add book to database
    try {
        const id = req.params.id;
        const {user_id} = req.body;
        await client.query('BEGIN')
        const existingBook = await client.query('SELECT id, stock FROM books WHERE id = $1', [id]);
        if (!existingBook.rows[0]) {
            return res.status(404).json({ message: "Book Does not Exist"});
        }
        // console.log(existingBook.rows[0])
        if (existingBook.rows[0].stock == 0) {
            return res.status(400).json({ message: "Book is out of stock"});
        }
        const querytext = 'INSERT INTO borrow(book_id, user_id) VALUES ($1, $2) RETURNING user_id, book_id, issued_at, due_at';
        const result = await client.query(querytext, [id, user_id]);
        const updateStock = 'UPDATE books SET stock = stock - 1 WHERE id = $1';
        await client.query(updateStock, [id]);
        await client.query('COMMIT');
        res.status(201).json(result.rows);
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
};