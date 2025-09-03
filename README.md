# Web Chat Application

This is a full-stack real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js). It features a modern user interface, real-time messaging with Socket.IO, user authentication, and file sharing capabilities.

## Technologies Used

### Front-end
- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool for modern web projects.
- **React Router:** For routing in the React application.
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **DaisyUI:** A component library for Tailwind CSS.
- **Zustand:** A small, fast, and scalable state-management solution.
- **Socket.IO Client:** For real-time communication with the server.
- **Axios:** For making HTTP requests to the back-end.

### Back-end
- **Node.js:** A JavaScript runtime environment.
- **Express:** A web framework for Node.js.
- **MongoDB:** A NoSQL database for storing data.
- **Mongoose:** An ODM library for MongoDB and Node.js.
- **Socket.IO:** For enabling real-time, bidirectional communication.
- **JSON Web Token (JWT):** For secure user authentication.
- **bcryptjs:** For hashing passwords.
- **Multer:** For handling file uploads.
- **Cloudinary:** For storing uploaded files in the cloud.

## Features

- **Real-time Messaging:** Send and receive messages instantly without refreshing the page.
- **User Authentication:** Secure user registration and login system using JWT.
- **File Sharing:** Share images and other files with other users.
- **Responsive Design:** The application is designed to work on both desktop and mobile devices.
- **Monorepo Architecture:** The front-end and back-end are managed in a single repository for streamlined development.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A MongoDB database (local or cloud-based).
- A Cloudinary account for file storage.

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Create a `.env` file in the `back-end` directory:**
   - Create a file named `.env` in the `back-end` directory.
   - Add the following environment variables to the file:
     ```
     PORT=5000
     MONGO_URI=<your_mongodb_uri>
     JWT_SECRET=<your_jwt_secret>
     CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
     CLOUDINARY_API_KEY=<your_cloudinary_api_key>
     CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
     ```

3. **Install dependencies and build the project:**
   - In the root directory, run the following command to install dependencies for both the front-end and back-end, and to build the front-end:
     ```bash
     npm run build
     ```

4. **Start the application:**
   - To start the back-end server, run the following command in the root directory:
     ```bash
     npm start
     ```
   - The back-end server will be running on `http://localhost:5000` (or the port you specified in your `.env` file).
   - The front-end will be served by the back-end. You can access the application by navigating to `http://localhost:5000` in your web browser.
