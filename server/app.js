import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

import books from './routes/books.js';
import db from './utils/db.js';

const app = express();


app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
db();
app.use("/books", books);


app.listen(8000, ()=>{
    console.log("Server running on port:8000");
});
