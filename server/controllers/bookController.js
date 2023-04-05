export const getBooks = (req, res) => {
    res.send("Hello");
};


export const getBook = (req, res) => {
    // return one book
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

