# MERN Task Manager

A simple task tracker built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Create tasks
- Read task list
- Update task text inline
- Delete tasks with a confirmation dialog
- Smooth UI with edit mode state and long-task wrapping

## Project structure

- `client/` - React frontend built with Vite
- `server/` - Express backend with MongoDB and Mongoose

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/Dhaval44451/task-manager.git
   cd task-manager
   ```

2. Create a MongoDB URI environment file in `server/.env`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

3. Install dependencies:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

## Running the app

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```

2. Start the frontend app:
   ```bash
   cd client
   npm run dev
   ```

3. Open the browser:
   ```
   http://localhost:5173
   ```

## Notes

- The frontend calls the backend API at `http://localhost:5000/api/tasks`.
- Add your own MongoDB connection string to `server/.env` before running the server.
- The `server/node_modules` and `client/node_modules` directories are excluded from git.

## Showcase

This repo is ready to share as a MERN CRUD project for portfolio or workflow showcase.
