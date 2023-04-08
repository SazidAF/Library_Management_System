import pool from '../utils/db.js';

const client = await pool.connect();

export const filter = async (req, res) => {
    try {
        const filter = req.query.filter;
        const qstring = req.query.qstring;
    
        if (filter == 'name') var filerQuery = "SELECT name, author, genre, stock FROM books WHERE name ILIKE $1 LIMIT 20";
        else if (filter == 'author') var filerQuery = "SELECT name, author, genre, stock FROM books WHERE author ILIKE $1 LIMIT 20";
        else if (filter == 'genre') var filerQuery = "SELECT name, author, genre, stock FROM books WHERE genre ILIKE $1 LIMIT 20";

        const result = await client.query(filerQuery, ["%" + qstring + "%"]);
        res.status(200).json(result.rows)
    } catch (error) {
        console.log(error);
    }

}