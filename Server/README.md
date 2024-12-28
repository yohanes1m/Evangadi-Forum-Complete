# Evangadi Question and Answer Platform

## Overview

The **Evangadi Question and Answer Platform** is designed to allow Evangadi students to ask programming-related questions and receive answers. This application is part of the Evangadi Networks website and provides a dedicated space for users to engage with programming queries.

## Features

- **User Registration & Login**: Secure user sign-up and login with JWT-based authentication.
- **Post & Get Questions**: Authenticated users can post questions, view their questions, and retrieve all posted questions.
- **Post & Get Answers**: Authenticated users can post answers to questions and view answers associated with a particular question.
- **User Validation**: Ensures that users are authenticated before accessing protected routes.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: Relational Database (e.g., PostgreSQL or MySQL)
- **Environment Variables**: Configured through Render for sensitive information (e.g., DB credentials, JWT secret)

## API Endpoints

### User Endpoints

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Authenticate a user and generate a JWT.
- **GET /api/auth/check**: Check if the user is authenticated.

### Question Endpoints

- **POST /api/questions**: Post a new question.
- **GET /api/questions/:question_id**: Get details of a specific question.
- **GET /api/questions**: Get a list of all questions.

### Answer Endpoints

- **POST /api/answers**: Post an answer to a question.
- **GET /api/answers/:question_id**: Get all answers for a specific question.

## Authentication Middleware

The **authMiddleware** ensures that all protected routes are accessed only by authenticated users. It verifies the JWT provided in the request headers.

## Deployment

### Workflow

1. **Code Development and Commit**: Changes are made and committed to the GitHub repository.
2. **Connect to Render**: The GitHub repository is connected to Render for automatic deployment.
3. **Build Command**:
   - `npm install`: Installs all necessary dependencies.
   - `node index.js`: Starts the application using the entry point file (`index.js`).
4. **Environment Variables**: Environment variables such as database credentials and JWT secret are configured on Render.
5. **Automatic Deployment**: Render automatically deploys the application each time changes are pushed to GitHub.

### Live Application

After deployment, the application is accessible at:

[https://evangadi-forum-group4-team2.onrender.com](https://evangadi-forum-group4-team2.onrender.com)

## Setup Instructions

### Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/evangadi-forum.git
cd evangadi-forum
```

### Install Dependencies

Install all necessary dependencies using npm:

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
DB_NAME=<your_database_name>
DB_USER=<your_database_user>
DB_PASSWORD=<your_database_password>
JWT_SECRET=<your_jwt_secret>
```

### Start the Application

To run the application locally:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

