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
   git clone https://github.com/Rahulpaswan461/Assignment-portal.git
2. Navigate to the project directory:
   cd assignment-portal
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

### Example API Requests using curl

- Signup
  - curl --location 'http://localhost:3000/api/user/signup' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODQ1YzIzOGRiYmRkYjQ1ZjFhYzY2MzkiLCJuYW1lIjoiU2hyZXlhcyBBZWl5ZXIiLCJlbWFpbCI6IlNocmV5YXNAMTIzNCIsImlhdCI6MTc0OTQwMjE3MiwiZXhwIjoxNzQ5NDA5MzcyfQ.f75rl2X3BHr4VqZKQEIBr6UagGm655YpzDHV9lGx2rc' \
--data-raw '{
     "name":"Rahul Paswan",
     "email":"Rahulpaswan@123",
    "password":"1234"
}'

- Login
- curl --location 'http://localhost:3000/api/user/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODQ1YzQ3MjgwMzIwNmQ3YmFkNDM0ZmMiLCJuYW1lIjoiUmFodWwgUGFzd2FuIiwiZW1haWwiOiJSYWh1bHBhc3dhbkAxMjMiLCJpYXQiOjE3NDk0MDI4MzcsImV4cCI6MTc0OTQxMDAzN30.n2-4KibfZiGqhqMO5zM5rat3ZAKNPtqS-8B_I7HY2IY' \
--data-raw '{
     "email":"Rahulpaswan@123",
    "password":"1234"

}'
