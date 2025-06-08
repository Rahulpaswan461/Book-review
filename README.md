# 📚 Book Review API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing books and user-submitted reviews. This backend system supports authentication, secure review submission, and advanced querying features.

---

## 🚀 Features

- 🔐 **JWT Authentication** for secure user access
- 📖 **Books**: Add, list, and view book details
- 📝 **Reviews**: Submit, update, or delete a review (one per user per book)
- 🔎 **Search**: Case-insensitive search by title or author
- 📊 **Ratings**: Automatically calculates average ratings for books
- 🔄 **Pagination** support for books and reviews

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Configuration**: dotenv

---

## 📁 Folder 

project-root/
- │
- ├── controllers/ # Route logic
- ├── models/ # Mongoose schemas
- ├── routes/ # API endpoints
- ├── middlewares/ # JWT & error handling middleware
- ├── services/ # Utility functions (e.g., token generation)
- ├── .env # Environment variables
- ├── server.js # App entry point
- └── README.md # Project documentation

  ## 🧪 API Endpoints

### 🔐 Authentication

| Method | Endpoint       | Description           |
|--------|----------------|-----------------------|
| POST   | `/api/user/signup`      | Register new user     |
| POST   | `/api/user/login`       | Authenticate user & get token |



### 📚 Books

| Method | Endpoint             | Description                                  |
|--------|----------------------|----------------------------------------------|
| POST   | `/api/books/add`             | Add a new book (Auth required)               |
| GET    | `/api/books`             | Get all books with filters & pagination      |
| GET    | `/api/books/:bookId`         | Get book by ID + reviews & average rating    |
| POST   | `/api/books/:bookId/reviews` | Submit a review for a book (Auth required)   |


### ✍️ Reviews

| Method | Endpoint         | Description                       |
|--------|------------------|-----------------------------------|
| PUT    | `/api/reviews/:reviewId`   | Update your review                |
| DELETE | `/api/reviews/:reviewId`   | Delete your review                |

---

### 🔍 Search

| Method | Endpoint   | Description                       |
|--------|------------|-----------------------------------|
| GET    | `/api/books/search`  | Search books by title or author   |


## Installation
1. Clone the repository:
   git clone https://github.com/Rahulpaswan461/Book-review.git
2. Navigate to the project directory:
   cd book-review
3. Install the dependencies:
    npm install
4. Set up the environment variables:
    - SECRET = your-secret-key
    - PORT = port-number
    - MONGODB_URL = your-mongodb-url
5. Start the server:
   npm start

   - The server should now be running on the specified port (from the .env file). You can access the API at http://localhost: port.
  

## Environment Variables

-  In order to run this project, you will need to add the following environment variables to your .env file:

- SECRET: The secret key used to sign and verify JWT tokens for authentication.
- PORT: The port number on which the server will run (default: 3000 if not specified).
- MONGODB_URL: MongoDB connection URL.

  
 ### Example .env file:
- SECRET=mySuperSecretKey
- PORT=3000
- MONGODB_URL=mongodb://localhost:27017/book-review

### Example API Requests with payload

- Signup  : http://localhost:3000/api/user/signup
   -     {
         "name":"Rahul Paswan",
         "email":"example@123",
         "password":"1234"
         }

- Login : http://localhost:3000/api/user/login
   -     {
         "email":"example@123",
         "password":"1234"
         }

- Add book : http://localhost:3000/api/books/add

       {
        "title": "Letters from the East",
        "author": "Fatima Noor",
        "genre": "Historical Fiction",
        "publishedYear": 2010
      }

  - Get all book details : http://localhost:3000/api/books?page=1&limit=5&author=Rahul&genre=New
  - Get book by is : http://localhost:3000/api/books/{bookId}?page=1&limit=2

  - Add Review to specific book : http://localhost:3000/api/books/{bookId}/reviews
    -      {
          "rating": 5,
           "comment": "This is Great"
          }

 - Update Review : http://localhost:3000/api/reviews/{reviewId}
   -     {
         "comment":"Something really great",
          "rating":2
         }
- Delete Review : http://localhost:3000/api/reviews/{reviewId}
- Search book : http://localhost:3000/api/books/search?author=Fatima&title=Letters

  ### Database Schema Design
  - The Book Review API uses a MongoDB database with the following core schemas:

1. User Schema
 - Fields:

 - name (String, required) — User's full name
- email (String, required, unique) — User’s email for login
- password (String, required) — Hashed password stored securely
- createdAt (Date) — Timestamp of user creation
- Purpose:
- Stores user details and handles authentication using JWT.

2. Book Schema
- Fields:

- title (String, required) — Book title
- author (String, required) — Book author
- genre (String) — Genre/category of the book
- publishedYear (Number) — Year the book was published
- reviewCount (Number, default: 0) — Number of reviews received
- Purpose:
- Represents books available for review and searching.

3. Review Schema
- Fields:
- book (ObjectId, ref to Book) — Reference to the reviewed book
- user (ObjectId, ref to User) — Reference to the user who wrote the review
- ratings (Number) — Rating given by the user (e.g., 1–5)
- comment (String) — Textual review/comment
- createdAt (Date) — Timestamp of review creation
- Purpose:
- Stores individual user reviews and ratings linked to both books and users.
  
