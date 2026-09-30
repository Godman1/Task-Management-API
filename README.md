````md
# Task Management REST API

A RESTful Task Management API built with Node.js, Express.js, MongoDB, and Mongoose.

This project was built to practice building a backend API from scratch with Node.js and Express, while applying a clean separation between routes, middleware, controllers, services, and database models.

## Features

- Create tasks
- Get all tasks
- Get a single task
- Update tasks
- Mark tasks as completed
- Delete tasks
- Request validation
- MongoDB persistence with Mongoose
- Centralized error handling
- Invalid MongoDB ID handling
- Environment variable configuration

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **MongoDB** — Database
- **Mongoose** — MongoDB ODM
- **dotenv** — Environment variable management
- **Nodemon** — Development server auto-restart

## Project Structure

```text
task-management-api/
│
├── controller/
│   └── TaskController.js
│
├── middleware/
│   ├── ErrorHandler.js
│   └── TaskValidation.js
│
├── models/
│   └── Task.js
│
├── routes/
│   └── TaskRoutes.js
│
├── services/
│   └── TaskService.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```
````

## Architecture

The API follows a layered structure:

```text
Client
   ↓
Routes
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Mongoose Model
   ↓
MongoDB
```

### Routes

Responsible for defining the API endpoints and connecting requests to controllers.

### Middleware

Responsible for tasks such as request validation and centralized error handling.

### Controllers

Responsible for handling HTTP requests and responses.

### Services

Responsible for application logic and database operations.

### Models

Define the structure of documents stored in MongoDB using Mongoose schemas.

## Installation

### 1. Clone the repository

```bash
git clone <https://github.com/Godman1/Task-Management-API.git>
```

### 2. Navigate into the project

```bash
cd task-management-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB connection string.

### 5. Start the development server

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

## Available Scripts

### Development

```bash
npm run dev
```

Starts the server with Nodemon.

### Production

```bash
npm start
```

Starts the server with Node.js.

## API Endpoints

Base URL:

```text
http://localhost:5000/api/tasks
```

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| POST   | `/api/tasks`              | Create a task            |
| GET    | `/api/tasks`              | Get all tasks            |
| GET    | `/api/tasks/:id`          | Get a single task        |
| PUT    | `/api/tasks/:id`          | Update a task            |
| PATCH  | `/api/tasks/:id/complete` | Mark a task as completed |
| DELETE | `/api/tasks/:id`          | Delete a task            |

---

## Create a Task

### Request

```http
POST /api/tasks
```

### Body

```json
{
  "title": "Learn Node.js",
  "description": "Build a REST API with Express"
}
```

### Response

```json
{
  "_id": "64f123456789abcdef123456",
  "title": "Learn Node.js",
  "description": "Build a REST API with Express",
  "completed": false,
  "__v": 0
}
```

Returns:

```text
201 Created
```

---

## Get All Tasks

### Request

```http
GET /api/tasks
```

### Response

```json
[
  {
    "_id": "64f123456789abcdef123456",
    "title": "Learn Node.js",
    "description": "Build a REST API with Express",
    "completed": false,
    "__v": 0
  }
]
```

Returns:

```text
200 OK
```

---

## Get a Single Task

### Request

```http
GET /api/tasks/:id
```

Example:

```http
GET /api/tasks/64f123456789abcdef123456
```

### Response

```json
{
  "_id": "64f123456789abcdef123456",
  "title": "Learn Node.js",
  "description": "Build a REST API with Express",
  "completed": false,
  "__v": 0
}
```

Returns:

```text
200 OK
```

If the task does not exist:

```json
{
  "message": "Task not found"
}
```

Returns:

```text
404 Not Found
```

---

## Update a Task

### Request

```http
PUT /api/tasks/:id
```

Example:

```http
PUT /api/tasks/64f123456789abcdef123456
```

### Body

```json
{
  "title": "Learn Node.js and Express",
  "description": "Build a complete REST API"
}
```

### Response

```json
{
  "_id": "64f123456789abcdef123456",
  "title": "Learn Node.js and Express",
  "description": "Build a complete REST API",
  "completed": false,
  "__v": 0
}
```

Returns:

```text
200 OK
```

The API validates the request before updating the database, and Mongoose validation is also enabled for updates.

---

## Mark Task as Completed

### Request

```http
PATCH /api/tasks/:id/complete
```

Example:

```http
PATCH /api/tasks/64f123456789abcdef123456/complete
```

No request body is required.

### Response

```json
{
  "_id": "64f123456789abcdef123456",
  "title": "Learn Node.js and Express",
  "description": "Build a complete REST API",
  "completed": true,
  "__v": 0
}
```

Returns:

```text
200 OK
```

---

## Delete a Task

### Request

```http
DELETE /api/tasks/:id
```

Example:

```http
DELETE /api/tasks/64f123456789abcdef123456
```

### Response

```json
{
  "message": "Task deleted successfully"
}
```

Returns:

```text
200 OK
```

If the task does not exist:

```json
{
  "message": "Task not found"
}
```

Returns:

```text
404 Not Found
```

---

## Validation

Tasks require a valid title.

The title:

- Must be provided
- Must be a string
- Must contain at least 3 characters

Example of an invalid request:

```json
{
  "title": "Hi"
}
```

Response:

```json
{
  "message": "Title must be at least 3 characters"
}
```

Returns:

```text
400 Bad Request
```

---

## Error Handling

The API uses centralized error-handling middleware.

Errors are handled consistently rather than implementing separate error responses throughout the application.

For example, an invalid MongoDB ID:

```http
GET /api/tasks/hello
```

returns:

```json
{
  "message": "Invalid Task ID"
}
```

with:

```text
400 Bad Request
```

A valid MongoDB ID that does not belong to an existing task returns:

```json
{
  "message": "Task not found"
}
```

with:

```text
404 Not Found
```

---

## Environment Variables

The following environment variable is required:

| Variable    | Description               |
| ----------- | ------------------------- |
| `MONGO_URI` | MongoDB connection string |

The `.env` file should **never be committed to Git**.

The project includes `.env` in `.gitignore`.

## Future Improvements

Possible improvements for future versions include:

- User authentication and authorization
- Pagination
- Task filtering and searching
- Task priorities
- Due dates
- Automated tests
- API documentation with Swagger/OpenAPI
- Docker support
- Production logging
- Rate limiting

## Learning Goals

This project was built to gain practical experience with:

- Node.js
- Express.js
- REST API design
- Middleware
- Controllers
- Service-layer architecture
- MongoDB
- Mongoose
- Async/await
- Error handling
- Request validation
- HTTP status codes
- Environment variables

## License

This project is for learning and portfolio purposes.

```

```
