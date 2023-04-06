import pool from '../utils/db.js';
import bcrypt from 'bcrypt';

const client = await pool.connect();

export const getOneUser = async (req, res) => {
    const id = req.params.id;
    
    pool.query('SELECT * FROM users WHERE id = $1', [id])
    .then((response) => res.status(200).json(response.rows))
    .catch((err) => setImmediate(() => {throw err;}));
    
}

export const createUser = async (req, res) => {
    try {
        const {...user} = req.body;
        
        const existingUserQuery = "SELECT id, email FROM users WHERE email = $1";
        const existingUser = await client.query(existingUserQuery, [user.email]);

        if (existingUser.rows[0]) {
            return res.status(400).json({message: "User already Exists"});
        }
        await client.query('BEGIN')
        const querytext = 'INSERT INTO users(username, email, password, role) values($1, $2, $3, $4) RETURNING *';
        bcrypt.genSalt(10)
        .then(async (salt) => {
            const hashedPassword = await bcrypt.hash(user.password, salt)
            const result = await client.query(querytext, [user.username, user.email, hashedPassword, user.role]);
            res.status(201).json(result.rows[0]);
        })
        .then(async () => {
            await client.query('COMMIT');
        })
        .catch(err => console.error(err.message));

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
}

export const updateUser = async (req, res) => {
    try {
        const {...user} = req.body;
        const id = req.params.id;

        const existingUserQuery = "SELECT id, email FROM users WHERE email = $1";
        const existingUser = await client.query(existingUserQuery, [user.email]);

        if (!existingUser.rows[0]) {
            return res.status(404).json({message: "User not Found"});
        }

        await client.query('BEGIN');
        const queryText = 'UPDATE users SET username = $1, email = $2, role = $3 WHERE id = $4 RETURNING *';
        const result = await client.query(queryText, [user.username, user.email, user.role]);
        // console.log(result);
        await client.query('COMMIT');
        res.status(200).json(result.rows[0]);


    } catch (error) {
        
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        await client.query('BEGIN')
        const existingUser = await client.query('SELECT id FROM users WHERE id = $1', [id]);
        if (!existingUser.rows[0]) {
            return res.status(404).json({ message: "User Does not Exist"});
        }
        const queryText = 'DELETE FROM users WHERE id = $1 RETURNING *';
        const result = await client.query(queryText, [id]);
        await client.query('COMMIT');
        res.status(200).json(result.rows);
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }

}