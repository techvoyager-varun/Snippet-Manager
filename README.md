# Snippet Manager

Snippet Manager is a full-stack web application designed to help developers save, organize, and manage their code snippets efficiently. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and Vite for a fast development experience, it provides a secure and intuitive interface for all your code-saving needs.

## Features

- **User Authentication**: Secure registration and login system using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **CRUD Operations for Snippets**: Create, read, update, and delete your code snippets.
- **Interactive Dashboard**: View all your snippets in a clean, organized layout.
- **Search and Filter**: Easily find snippets by title, programming language, or visibility (public/private).
- **Detailed Snippet View**: Click on any snippet to see its full details, including the complete code block.
- **Copy to Clipboard**: A convenient one-click button to copy code to your clipboard.
- **Protected Routes**: Secure access to user-specific data and actions.
- **State Management**: Centralized state management on the frontend using Redux Toolkit.
- **Responsive Design**: A user-friendly experience across devices, built with Tailwind CSS.

## Tech Stack

| Category      | Technology                                                                                                                       |
|---------------|----------------------------------------------------------------------------------------------------------------------------------|
| **Frontend**  | [React](https://react.dev/), [Vite](https://vitejs.dev/), [Redux Toolkit](https://redux-toolkit.js.org/), [React Router](https://reactrouter.com/), [Axios](https://axios-http.com/), [Tailwind CSS](https://tailwindcss.com/) |
| **Backend**   | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/), [JWT](https://jwt.io/), [Bcrypt](https://www.npmjs.com/package/bcrypt), [CORS](https://www.npmjs.com/package/cors)      |
| **Database**  | MongoDB Atlas                                                                                                                    |

## Project Structure

The repository is a monorepo containing two main directories:

-   `frontend/`: Contains the React client-side application.
-   `backend/`: Contains the Node.js/Express server, API logic, and database models.

## Setup and Installation

### Prerequisites

-   [Node.js](https://nodejs.org/en) (v18.0.0 or higher)
-   [npm](https://www.npmjs.com/) (Node Package Manager)
-   [MongoDB](https://www.mongodb.com/try/download/community) instance (local or a cloud service like MongoDB Atlas)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```sh
    cd backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Create a `.env` file** in the `backend` root and add the following environment variables. Replace the placeholder values with your actual configuration.
    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    DB_NAME=devnotepro
    CORS_ORIGIN=http://localhost:5173

    ACCESS_TOKEN_SECRET=your_access_token_secret
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    REFRESH_TOKEN_EXPIRY=10d
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The server will start on the port specified in your `.env` file (e.g., `http://localhost:8000`).

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```sh
    cd frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Confirm the API endpoint:**
    The file `frontend/src/api/axios.js` is configured to connect to the deployed backend. For local development, change the `baseURL` to point to your local backend server:
    ```javascript
    // frontend/src/api/axios.js
    const axiosInstance = axios.create({
      baseURL: "http://localhost:8000/api/v1", // <-- Update this for local development
      withCredentials: true,
    });
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### User Routes (`/users`)

| Method | Endpoint      | Description           | Authentication |
|--------|---------------|-----------------------|----------------|
| `POST` | `/register`   | Register a new user   | Public         |
| `POST` | `/login`      | Log in a user         | Public         |
| `POST` | `/logout`     | Log out the current user | Required       |

### Snippet Routes (`/snippets`)

| Method   | Endpoint | Description                        | Authentication |
|----------|----------|------------------------------------|----------------|
| `POST`   | `/`      | Create a new snippet               | Required       |
| `GET`    | `/`      | Get all snippets for the logged-in user | Required       |
| `GET`    | `/:id`   | Get a single snippet by its ID     | Required       |
| `PATCH`  | `/:id`   | Update a snippet by its ID         | Required       |
| `DELETE` | `/:id`   | Delete a snippet by its ID         | Required       |
