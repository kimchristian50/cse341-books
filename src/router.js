import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';
import {
    getAllAuthors,
    getAuthorByIdHandler,
    createAuthorHandler,
    updateAuthorHandler,
    deleteAuthorHandler
} from './controllers/authors.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books
 *     description: Retrieves a list of all books.
 *     responses:
 *       200:
 *         description: A list of books was successfully retrieved.
 *       500:
 *         description: Internal server error.
 */
router.get('/books', getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get a book by ID
 *     description: Retrieves a single book using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested book was successfully retrieved.
 *       400:
 *         description: Invalid book ID.
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/books/:id', getBookByIdHandler);

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Unable to retrieve authors
 */
router.get('/authors', getAllAuthors);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     tags:
 *       - Authors
 *     summary: Get an author by ID
 *     description: Retrieves a single author using his/her ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the author to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested author was successfully retrieved.
 *       400:
 *         description: Invalid author ID.
 *       404:
 *         description: Author not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/authors/:id', getAuthorByIdHandler);

/**
 * @openapi
 * /authors:
 *   post:
 *     tags:
 *       - Authors
 *     summary: Create a new author
 *     description: Creates a new author entry in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *                 example: a4
 *               name:
 *                 type: string
 *                 example: Example Author
 *               birthYear:
 *                 type: integer
 *                 example: 1980
 *     responses:
 *       201:
 *         description: The author was successfully created.
 *       400:
 *         description: Missing required field or author ID already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/authors', createAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     tags:
 *       - Authors
 *     summary: Update an existing author
 *     description: Updates the name and birth year of an existing author.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the author to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Author
 *               birthYear:
 *                 type: integer
 *                 example: 1981
 *     responses:
 *       200:
 *         description: The author was successfully updated.
 *       400:
 *         description: Missing required field.
 *       404:
 *         description: Author not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/authors/:id', updateAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     tags:
 *       - Authors
 *     summary: Delete an author
 *     description: Deletes an author by ID if they have no remaining books.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the author to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author successfully deleted (no content).
 *       404:
 *         description: Author not found.
 *       409:
 *         description: Conflict - Author still has books associated with them.
 *       500:
 *         description: Internal server error.
 */
router.delete('/authors/:id', deleteAuthorHandler);

export default router;