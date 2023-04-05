import pg from "pg";
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
    user: 'han',
    host: 'localhost',
    database: 'lms',
    password: 'han',
    port: 5432
})

export default pool;