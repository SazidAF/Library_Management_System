import pg from "pg";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        const client = new pg.Client({
            user: 'han',
            host: 'localhost',
            database: 'lms',
            password: 'han',
            port: 5432
        })

        await client.connect();
        // const res = await client.query('SELECT * FROM test')
        // console.log(res);

    } catch (error) {
        console.log(error);  
    }
}


export default connectDB;