# Cost Manager Server

This final project was developed as part of our academic coursework and focuses on building key parts of a RESTful Web Service.
The system supports basic cost management functionality and can serve as a backend for a front-end client.
It allows users to add and view categorized expenses, generate monthly reports, manage financial records, and retrieve user details.

## 🌐 Live Deployment

The project is deployed on **Render**:  
🔗 [Link]([https://costmanagerserversideproject.onrender.com](https://costmanagerserversideproject.onrender.com ))

## 🚀 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose (ODM for MongoDB)**
- **Python** (for test script using `requests`)
- **JSDoc** (for internal documentation of the code)

## 📦 API Endpoints

### 1. `POST /api/add`
Add a new cost item for a specific user.  
**Request body**: JSON containing `userid`, `description`, `category`, `sum`, `day`, `month`, and `year`.

### 2. `GET /api/report?id=USERID&year=YYYY&month=MM`
Returns all costs of the given user in the requested month/year grouped by category.

### 3. `GET /api/users/:id`
Returns the user's details and the total sum of all their expenses.

### 4. `GET /api/about`
Returns a list of the developers’ first and last names.

## 👩‍💻 Developers

- Nicole Davidov  
- Polina Shchulepova
