CREATE TABLE borrow (
  book_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  issued_at TIMESTAMP DEFAULT NOW(),
  due_at DATE NOT NULL,
  PRIMARY KEY (book_id, user_id),
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);