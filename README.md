# Social Media Platform

A full-stack social media web application built using **Spring Boot, React.js, and MySQL**. The application provides secure user authentication and allows users to create posts, interact with posts through likes and comments, and manage their profiles.

## Features

* User registration and login
* JWT-based authentication
* BCrypt password encryption
* Protected routes
* Create and view posts
* Delete own posts
* Like and unlike posts
* View like counts
* Add comments to posts
* Delete own comments
* User profile
* View user's own posts
* Logout
* Form validation
* Global exception handling
* CORS configuration
* Environment-based configuration for database password and JWT secret

## Technologies Used

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios
* React Router
* Vite

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* REST APIs
* JWT
* BCrypt
* Bean Validation

### Database

* MySQL

### Tools

* Spring Tool Suite (STS)
* Visual Studio Code
* Git
* GitHub
* Maven

## Project Structure

```text
social-media-platform/
│
├── socialmedia_backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/socialmedia/
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── entity/
│   │   │   │       ├── exception/
│   │   │   │       ├── repository/
│   │   │   │       ├── security/
│   │   │   │       └── service/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
├── socialmedia-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Backend API Endpoints

### Authentication

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login and receive JWT |

### Posts

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | `/api/posts`          | Create a post            |
| GET    | `/api/posts`          | Get all posts            |
| GET    | `/api/posts/my`       | Get current user's posts |
| DELETE | `/api/posts/{postId}` | Delete own post          |

### Likes

| Method | Endpoint                    | Description           |
| ------ | --------------------------- | --------------------- |
| POST   | `/api/posts/{postId}/like`  | Like or unlike a post |
| GET    | `/api/posts/{postId}/likes` | Get post like count   |

### Comments

| Method | Endpoint                          | Description        |
| ------ | --------------------------------- | ------------------ |
| POST   | `/api/posts/{postId}/comments`    | Add a comment      |
| GET    | `/api/posts/{postId}/comments`    | Get post comments  |
| DELETE | `/api/posts/comments/{commentId}` | Delete own comment |

### Profile

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| GET    | `/api/profile` | Get current user's profile |

## Authentication and Security

The application uses **JWT-based authentication**.

After successful login:

1. The backend validates the user's credentials.
2. The password is checked using BCrypt.
3. A JWT token is generated.
4. The frontend stores the token.
5. Axios automatically sends the token with protected API requests.
6. Spring Security validates the JWT before allowing access to protected endpoints.

The JWT secret and database password are supplied through environment variables:

```properties
spring.datasource.password=${DB_PASSWORD}
jwt.secret=${JWT_SECRET}
```

Actual credentials are not stored in the source code.

## Database

Create a MySQL database:

```sql
CREATE DATABASE socialmedia_db;
```

Configure the database username and password using environment variables.

The application uses Hibernate's automatic schema update:

```properties
spring.jpa.hibernate.ddl-auto=update
```

The required tables are created automatically when the application starts.

## How to Run the Backend

### 1. Configure environment variables

Set:

```text
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_jwt_secret
```

### 2. Start the Spring Boot application

Open the backend in Spring Tool Suite and run:

```text
SocialmediaApplication.java
```

The backend runs on:

```text
http://localhost:8080
```

## How to Run the Frontend

Navigate to the frontend directory:

```bash
cd socialmedia-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Application Flow

```text
Register
   ↓
Login
   ↓
JWT Authentication
   ↓
Home Feed
   ├── Create Post
   ├── Like / Unlike
   ├── Comment
   └── Delete Own Post
   ↓
Profile
   └── View Own Posts
   ↓
Logout
```

## Key Backend Concepts Demonstrated

* RESTful API development
* Layered architecture
* Controller-Service-Repository pattern
* JPA entity relationships
* Spring Security
* JWT authentication
* BCrypt password hashing
* DTO-based request and response handling
* Bean validation
* Global exception handling
* CORS configuration
* User-specific authorization

## Future Enhancements

Possible future improvements include:

* Follow/unfollow users
* User search
* Profile editing
* Profile pictures
* Post images
* Notifications
* Pagination
* Real-time messaging
* Admin moderation
* Deployment to a cloud platform

## Author

**Byrapuneni Prasanna**

B.Tech - Computer Science and Engineering
IIIT Ongole
