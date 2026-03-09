# Leave Management System  [[LIVE](https://leave-request-management-app.onrender.com)]

A simple web application where employees can apply for leave and employers can review, approve, or reject those requests.  
The system includes authentication, role-based access control, and a minimal user interface focused on functionality.

This project was built as a full-stack assignment using Vue.js, Tailwind CSS, Node.js, Express, and MongoDB Atlas.

---

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Secure cookie-based session handling
- Logout functionality
- Role-based access control for Employee and Employer

### Employee Capabilities
- Apply for leave with start date, end date, and reason
- View personal leave request history
- Withdraw pending leave requests

### Employer Capabilities
- View all employee leave requests
- Approve leave requests
- Reject leave requests

### General Features
- REST API architecture
- MongoDB Atlas database
- Input validation and basic error handling
- Clean folder structure
- Environment variables for sensitive configuration
- Responsive minimal UI

---

## Tech Stack

### Frontend
- Vue.js (Vite)
- Tailwind CSS
- Vue Router

### Backend
- Node.js
- Express.js
- JWT Authentication
- Cookie-based session management

### Database
- MongoDB Atlas

### Deployment
- Frontend: Render
- Backend: Render

---

## Project Structure

### Backend

```
backend
├── controllers
│ ├── user.js
│ └── leave.js
│
├── models
│ ├── user.js
│ └── leave.js
│
├── middleware
│ ├── userAuthorization.js
│ └── adminAuthorization.js
│
├── services
│ └── auth.js
│
├── routes
│ ├── user.js
│ └── leave.js
│
├── server.js
└── .env
```

### Frontend

```
frontend
│
├── src
│ ├── pages
│ │ ├── Login.vue
│ │ ├── Signup.vue
│ │ ├── EmployeeDashboard.vue
│ │ └── EmployerDashboard.vue
│ │
│ ├── services
│ │ └── api.js
│ │
│ ├── router
│ │ └── index.js
│ │
│ ├── App.vue
│ └── main.js
│
└── .env
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|------|------|------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | User login |
| POST | /api/auth/logout | Logout user |
| GET | /api/auth/check | Verify authentication and return user info |

---

### Leave Requests

#### Employee Routes

| Method | Endpoint | Description |
|------|------|------|
| POST | /api/leave | Apply for leave |
| GET | /api/leave/my | Get employee's own leave requests |
| DELETE | /api/leave/:id | Withdraw a leave request |

#### Employer Routes

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/leave | Get all leave requests |
| PATCH | /api/leave/:id/approve | Approve leave request |
| PATCH | /api/leave/:id/reject | Reject leave request |

---


## Installation

> **Note:** To access admin features log in using an email address that ends with `@admin.com`. Any other email will be treated as a normal user.


1. Clone the repository:
   ```bash
   git clone https://github.com/KunalVChoudhary/Leave-Request-Management-App.git
   cd Leave-Request-Management-App
   ```

2. Install dependencies:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. Add environment variables in server app (`.env`):
   ```
   MONGO_URI=your_mongo_connection_string
   CLIENT_URL=your_react_app_url
   JWT_SECRET=your_jwt_secret
   COOKIE_PARSER_SECRET_KEY=your_cookie_parser_secret
   PORT=your_port_number
   ```

4. Add environment variables in client app (`.env`):
   ```
   VITE_API_URL=your_express_server_url
   ```

5. Start the AI-Kata-Sweet-Shop-Management-System app:
   ```bash
   npm start
   ```

---

# ✍️ Author

**Kunal Vijay Choudhary**

* GitHub: [@KunalVChoudhary](https://github.com/KunalVChoudhary)
* Email: [imkunalvchoudhary@gmail.com](mailto:imkunalvchoudhary@gmail.com)
* LinkedIn: [kunal-vijayshree-choudhary](https://www.linkedin.com/in/kunal-vijayshree-choudhary)

---

*Thank U!*
