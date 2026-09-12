# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
MongoDB database: cse341-books-db
MongoDB collection: books

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string in ISO 8601 date format (for example, "2021-08-17") (required)

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects

- Success response body example:
[
  {
    "id": "b1",
    "author": "Maya Rivera",
    "title": "Patterns of Light",
    "publicationDate": "2021-08-17"
  }
]

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object
- Success response body example:
{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs
- Not found response body example:
{
  "message": "Book not found"
}

## Error Handling
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
  "message": "Internal server error"
}

#### POST /books
Purpose: Create a new book.

Request body:
    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object
- Success response body example:
{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

- Required field is missing body example:
{
  "message": "Please complete all required fields"
}
- Id already exists body example:
{
  "message": "That book id already exists"
}
- Author id does not match an existing author body example:
{
  "message": "That author id does not match an existing author"
}

### Error Handling
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
  "message": "Internal server error"
}

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object
- Success response body example:
{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

- Required field is missing body example:
{
  "message": "Please complete all required fields"
}
- Author id does not match an existing author body example:
{
  "message": "That author id does not match an existing author"
}
- No book exists with that id body example:
{
  "message": "Book not found"
}

### Error Handling
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
  "message": "Internal server error"
}

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: empty body

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

- No book exists with that id body example:
{
  "message": "Book not found"
}

#### Error Handling
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
  "message": "Internal server error"
}

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Feature 2: Author CRUD Operations

### Goal
Add an author collection that stores author ids, names, and birth years. The API should provide all CRUD operations for this collection.

### Data Model
MongoDB database: cse341-books-db
MongoDB collection: authors

Required book fields:
- `authorId`: string, required, custom id such as `a1`
- `name`: string, required
- `birthYear`: number, required

Authors will use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Books
Each book (from /books) will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

Authors can't be deleted if they have books associated with them - the books need to be deleted first.

### Routes

#### GET /authors
Purpose: Return all authors.

Success:
- Status code: `200`
- Response body: an array of author objects
- Success response body example:
[
    {
        "authorId": "a1",
        "name": "Patricia McKillip",
        "birthYear": 1948
    }
]

Errors:
- `500` if an unexpected server or database error occurs

## Error Handling
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
  "message": "Internal server error"
}

#### GET /authors/:id
Purpose: Return one author by his/her custom id.

Success:
- Status code: `200`
- Response body: the matching author object
- Success response body example:
    {
        "authorId": "a1",
        "name": "Patricia McKillip",
        "birthYear": 1948
    }

Errors:
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

- No author exists with that id body example:
{
  "message": "No author exists with that id"
}

### Error Handling
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
  "message": "Internal server error"
}

#### POST /authors
Purpose: Create a new author.

Request body:

    {
      "authorId": "a1",
      "name": "Patricia McKillip",
      "birthYear": 1948
    }

Success:
- Status code: `201`
- Success response body example:
[
    {
        "authorId": "a1",
        "name": "Patricia McKillip",
        "birthYear": 1948
    }
]

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `500` if an unexpected server or database error occurs

### Error Handling
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
  "message": "Internal server error"
}

#### PUT /authors/:id
Purpose: Update an existing author.

Request body:

    {
      "authorId": "a2",
      "name": "Updated Author Name",
      "birthYear": "1999"
    }

Success:
- Status code: `200`
- Response body: the updated author object

Errors:
- `400` if a required field is missing
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

- Required field is missing body example:
{
  "message": "Please complete all required fields"
}
- No author exists with that id body example:
{
  "message": "Author not found"
}

### Error Handling
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
  "message": "Internal server error"
}

#### DELETE /authors/:id
Purpose: Delete an existing author.

Success:
- Status code: `204`
- Response body: empty body

Errors:
- `404` if no author exists with that id
- `400` if the author has books (authors with books can't be deleted - their books must be deleted first)
- `500` if an unexpected server or database error occurs

- No author exists with that id body example:
{
  "message": "Author not found"
}
- Author still has books body example:
{
  "message": "All of an author's books need to be deleted before the author can be deleted"
}

#### Error Handling
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
  "message": "Internal server error"
}

### Swagger Documentation
Swagger must document every author route.

### Deployment Expectations
After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

