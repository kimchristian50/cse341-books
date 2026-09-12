import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    authorExists
} from '../models/books.js';

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.error('GET /books failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getBookByIdHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const book = await getBookById(requestedId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error('GET /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const createBookHandler = async (req, res) => {
    try {
        const { id, author, authorId, title, publicationDate } = req.body;

        // Validate required fields
        if (!id || !author || !authorId || !title || !publicationDate) {
            return res.status(400).json({ message: 'Please complete all required fields' });
        }

        // Check if book id already exists
        const existingBook = await getBookById(id);
        if (existingBook) {
            return res.status(400).json({ message: 'That book id already exists' });
        }

        // Validate that author exists in authors collection
        const validAuthor = await authorExists(authorId);
        if (!validAuthor) {
            return res.status(400).json({ message: 'That author id does not match an existing author' });
        }

        const newBook = { id, author, authorId, title, publicationDate };
        const createdBook = await createBook(newBook);

        return res.status(201).json(createdBook);
    } catch (error) {
        console.error('POST /books failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateBookHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const { author, authorId, title, publicationDate } = req.body;

        // Validate required fields
        if (!author || !authorId || !title || !publicationDate) {
            return res.status(400).json({ message: 'Please complete all required fields' });
        }

        // Check if book exists
        const existingBook = await getBookById(requestedId);
        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Validate that author exists in authors collection
        const validAuthor = await authorExists(authorId);
        if (!validAuthor) {
            return res.status(400).json({ message: 'That author id does not match an existing author' });
        }

        const updatedData = { author, authorId, title, publicationDate };
        const updatedBook = await updateBook(requestedId, updatedData);

        return res.status(200).json(updatedBook);
    } catch (error) {
        console.error('PUT /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteBookHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const existingBook = await getBookById(requestedId);
        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await deleteBook(requestedId);
        return res.status(204).send();
    } catch (error) {
        console.error('DELETE /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    getBooksHandler,
    getBookByIdHandler,
    createBookHandler,
    updateBookHandler,
    deleteBookHandler
};