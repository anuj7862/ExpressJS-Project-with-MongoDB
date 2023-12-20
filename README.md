# ExpressJS Project with MongoDB and EJS

This project showcases the implementation of a web application using ExpressJS, EJS, MongoDB, and various associated technologies. The key features demonstrated include:

- **ExpressJS and Middleware**: Utilizes ExpressJS for building a robust web application and includes custom middleware functions for various tasks.

- **EJS Templating**: Implements EJS as the templating engine for rendering dynamic views.

- **Session and Cookies using Express-Generator**: Incorporates session and cookie management using Express-Generator for enhanced user interaction.

- **MongoDB and Mongoose for Data Storage**: Leverages MongoDB as the database and utilizes Mongoose as the ODM for effective data storage and retrieval.

- **Flash Messages for User Feedback**: Implements flash messages to provide informative feedback to users.

- **Authentication and Authorization**: Demonstrates user authentication using Passport.js, ensuring secure access to protected routes.

- **Data Association using MongoDB Models**: Establishes data association between two MongoDB models - `User` and `Post`, showcasing a relational structure.

## Project Structure

The project is organized into the following structure:

- `app.js`: Entry point of the application.
- `routes/`: Contains route handlers for different features.
- `views/`: EJS templates for rendering views.
- `public/`: Static assets like stylesheets and client-side scripts.
- `models/`: MongoDB models for User and Post.
- `config.js`: Configuration including MongoDB connection setup.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/express-mongodb-project.git

2. **Install Dependencies:**

   ```bash
   cd express-mongodb-project
   npm install

3. **Configuration**

      Update the MongoDB connection details in the `config.js` file.

4. **Running the Application**

   ```bash
   npm start

  The application will be accessible at http://localhost:3000.

## Features
  - ExpressJS and Middleware
  - EJS Templating
  - Session and Cookies using Express-Generator
  - MongoDB and Mongoose
  - Flash Messages
  - Authentication and Authorization
  - Data Association using MongoDB Models
