# YelpCamp

A full-stack web application for sharing and exploring camping site information with user interaction features.

---

## Table of Contents

- [YelpCamp](#yelpcamp)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation \& Setup](#installation--setup)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)

---

## Project Overview

YelpCamp is a web platform designed for camping enthusiasts to browse camping site details, share their own experiences, and interact with others.  
It is built using a front-end and back-end separation architecture, supporting responsive design for both mobile and desktop devices.

---

## Features

- User registration and login  
- Add, edit, and delete campgrounds  
- Interactive map to view nearby campgrounds  
- User reviews and ratings  
- Upload and display multiple images for campgrounds   

---

## Tech Stack

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express.js 
- **Database**: MongoDB  
- **Map Service**: Mapbox  
- **Other Tools**: Cloudinary (image storage), Passport (user authentication), Helmet, Docker (optional)  

---

## Installation & Setup

### Prerequisites

- Node.js (version >= 16.0.0 recommended)  
- MongoDB (local or cloud, e.g., Atlas)  
- Mapbox API key  
- Cloudinary API key  

### Steps

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/LiyanWang222/YelpCamp2.0.git
   cd YelpCamp2.0
2. **Install dependencies**:

    For both the backend and frontend, run the following commands:
    * Backend：
    ```
    cd YelpCamp-backend
    npm install
    ```
    * Frontend: 
    ```
    cd ../YelpCamp-frontend 
    npm install
    ```
3. **Configure Environment Variables**:

    Create .env files in the root directories of both YelpCamp-backend and YelpCamp-frontend with the following keys:
    * Backend .env file:
    ```
    MONGO_URI=<your MongoDB connection string>
    CLOUDINARY_NAME=<your Cloudinary name>
    CLOUDINARY_KEY=<your Cloudinary API Key>
    CLOUDINARY_SECRET=<your Cloudinary API Secret>
    MAPBOX_TOKEN=<your Mapbox API Token>
    ```
    * Frontend .env file:
    ```
    VITE_MAPBOX_TOKEN=<your Mapbox API Token>
    ```

4. **Start the Application**:
   * Backend
   ```
   cd YelpCamp-backend
   npm start
   ```
   * Frontend
   ```
   cd ../YelpCamp-frontend
   npm run dev
   ```

5. Access the application
   * frontend: http://localhost:5173
   * backend: http://localhost:3001



