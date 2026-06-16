# Audion
Audion — A scalable music streaming backend platform featuring JWT authentication, role-based access control, cloud media uploads, and RESTful API architecture.


## Features

### Authentication and Security

- User registration and login
- JWT based authentication
- HTTP cookie based sessions
- Secure password hashing using bcrypt
- Role Based Access Control (User / Artist)
- Logout functionality

### Music Management

- Artist-only music upload functionality
- Audio file handling using Multer
- Cloud media storage using ImageKit
- Music metadata management
- Music discovery APIs

### Album Management

- Create music albums
- Store multiple songs inside albums
- Artist and album relationship management
- MongoDB document references
- Related data fetching using Mongoose populate

### Backend Quality

- RESTful API architecture
- Reusable middleware structure
- Request validation using Express Validator
- Automated API testing using Jest and Supertest
- Postman API documentation

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication and Security

- JSON Web Token (JWT)
- bcrypt
- Cookie Parser

### File Handling

- Multer
- ImageKit

### Validation and Testing

- Express Validator
- Jest
- Supertest

---

## Project Structure

```bash
src
├── controllers
│   ├── auth.controller.js
│   └── music.controller.js
│
├── models
│   ├── user.model.js
│   ├── music.model.js
│   └── album.model.js
│
├── routes
│   ├── auth.routes.js
│   └── music.routes.js
│
├── middlewares
│   ├── auth.middleware.js
│   └── validator.middleware.js
│
├── services
│   └── storage.service.js
│
├── tests
│
└── app.js
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>

cd Audion
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Start development server:

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file and add:

```env
PORT=

MONGODB_CONNECT_URL=

JWT_SECRET=

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

---

# API Documentation


## Authentication APIs


### Register User

```http
POST /api/auth/register
```

Creates a new user account.

Supports:

- User role
- Artist role


Request:

```json
{
    "username":"artist1",
    "email":"artist@gmail.com",
    "password":"123456",
    "role":"artist"
}
```


---

### Login User


```http
POST /api/auth/login
```


Request:


```json
{
    "email":"artist@gmail.com",
    "password":"123456"
}
```


---

### Logout User


```http
GET /api/auth/logout
```


Clears authentication cookie and logs out user.


---

# Music APIs


## Upload Music


```http
POST /api/music/upload
```


Access:

Artist only


Request Type:

multipart/form-data


Fields:


```text
title : Song name

music : audio file
```


Workflow:

- Authenticate artist
- Process file using Multer
- Upload file to ImageKit
- Store metadata in MongoDB


---

## Get All Songs


```http
GET /api/music/get-songs
```


Access:

User / Artist


Returns all uploaded music with artist information.


---

# Album APIs


## Create Album


```http
POST /api/music/album
```


Access:

Artist only


Request:


```json
{
    "title":"Album Name",

    "musicIds":[
        "music_id"
    ]
}
```


---

## Get Albums


```http
GET /api/music/albums
```


Fetch all available albums.


---

## Get Album By ID


```http
GET /api/music/album/:albumId
```


Fetch complete album details including songs.


---

# Testing


Automated API integration testing is implemented using Jest and Supertest.


Run tests:


```bash
npm test
```


Test coverage:


- User registration workflow
- Duplicate account handling
- Validation failures
- Login authentication
- Invalid credentials handling
- Logout workflow


---

# Architecture Flow


```text
Client Request

        |
        v

Routes

        |
        v

Validation Middleware

        |
        v

Authentication Middleware

        |
        v

Controllers

        |
        v

Services

        |
        v

MongoDB / ImageKit
```


---

# Postman Documentation


Complete API collection:


```text
docs/Audion.postman_collection.json
```


Import the collection into Postman to test all endpoints.


---

# Author


Omkar Zunje