# Library Management System API

This is a comprehensive RESTful API for a Library Management System built with Express.js, TypeScript, and MongoDB (using Mongoose). It allows for creating, reading, updating, and deleting books, as well as managing book borrowing records, with a focus on clean code, proper validation, and business logic enforcement.

---

## ✨ Features

- **CRUD Operations for Books**: Full control over the book inventory with create, read, update, and delete functionalities.
- **Advanced Filtering & Sorting**: Retrieve book lists filtered by genre and sorted by any field in ascending or descending order.
- **Book Borrowing System**:
  - Business logic to ensure only available books with sufficient copies can be borrowed.
  - Atomic operations using MongoDB transactions to prevent data inconsistency when borrowing.
  - Automatic updates to a book's `available` status based on stock count, implemented via Mongoose middleware.
- **Aggregation Pipeline**: Generate a summary of borrowed books, showing total borrowed quantities for each book title and ISBN.
- **Robust Validation**: Strong server-side validation using Mongoose's built-in schema validation.
- **Centralized Error Handling**: A global error handler middleware that formats validation, cast, and duplicate key errors into a user-friendly JSON structure as per the requirements.
- **Mongoose Features**:
  - **Static Method**: `isBookExistsByISBN` to check for existing books before creation.
  - **Middleware (`pre-save` hook)**: Automatically manages the `available` status based on the number of `copies`.

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Development Tools**: `ts-node-dev` for live reloading, ESLint for linting, and Prettier for code formatting.

---

## 🚀 Local Setup & Installation

Follow these steps to run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a cloud instance like MongoDB Atlas)
- An API client like [Postman](https://www.postman.com/) for testing.

### 1. Clone the Repository

```bash
git clone https://github.com/Ashiqur2279/nl_assignment_03
cd your-project-folder-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add the following variable.

```env
PORT=5000
DATABASE_URL=mongodb://127.0.0.1:27017/library-management
```

_Note: Replace the `DATABASE_URL` with your own MongoDB connection string if you are using a different setup (e.g., MongoDB Atlas)._

### 4. Run the Development Server

This command starts the server with hot-reloading.

```bash
npm run dev
```

The server will be running at `http://localhost:5000`.

---

## 📝 API Documentation

**Base URL**: `http://localhost:5000/api`

\*live link:

### Book Endpoints

| Method   | Endpoint         | Description                                          |
| :------- | :--------------- | :--------------------------------------------------- |
| `POST`   | `/books`         | Adds a new book to the library.                      |
| `GET`    | `/books`         | Retrieves all books. Supports filtering and sorting. |
| `GET`    | `/books/:bookId` | Retrieves a single book by its ID.                   |
| `PUT`    | `/books/:bookId` | Updates a book's information.                        |
| `DELETE` | `/books/:bookId` | Deletes a book from the library.                     |

**Query Parameters for `GET /books`**:

- `filter`: Filter by genre (e.g., `?filter=FANTASY`).
- `sortBy`: Field to sort by (e.g., `title`). Default: `createdAt`.
- `sort`: Order (`asc` or `desc`). Default: `desc`.
- `limit`: Number of results. Default: `10`.

### Borrow Endpoints

| Method | Endpoint  | Description                                                            |
| :----- | :-------- | :--------------------------------------------------------------------- |
| `POST` | `/borrow` | Borrows a book and creates a borrow record.                            |
| `GET`  | `/borrow` | Returns a summary of all borrowed books using an aggregation pipeline. |
