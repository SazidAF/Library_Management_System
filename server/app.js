import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

import books from './routes/books.js';
import users from './routes/users.js';
import search from './routes/search.js';

const app = express();


app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use("/books", books);
app.use("/users", users);
app.use("/search", search);

app.listen(8000, ()=>{
    console.log("Server running on port:8000");
});
