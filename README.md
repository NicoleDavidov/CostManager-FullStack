# Cost Manager - Full Stack Application

A comprehensive cost management application built with React frontend and Node.js backend for tracking personal and business expenses.

## Project Description

Cost Manager is a full-stack application for managing personal and business expenses, allowing users to track income and expenses, categorize them, and receive financial reports and insights.

## Live Demo

- **Repository**: [https://github.com/NicoleDavidov/CostManager-FullStack](https://github.com/NicoleDavidov/CostManager-FullStack)
- **Link**: [Chttps://cost-manager-fullstack.vercel.app/l](https://cost-manager-fullstack.vercel.app/)

## Project Structure

```
CostManager-FullStack/
├── client/                    # React Frontend Application
│   ├── public/               # Static files
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service functions
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # CSS/SCSS files
│   │   ├── context/         # React Context providers
│   │   ├── assets/          # Images, icons, fonts
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   ├── package.json
│   └── .env.local           # Environment variables
├── server/                   # Node.js Backend Application
│   ├── controllers/         # Route handlers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   ├── utils/              # Helper functions
│   ├── validators/         # Input validation
│   ├── database/           # Database connection & migrations
│   ├── uploads/            # File uploads directory
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── package.json
│   └── .env                # Environment variables
├── docs/                    # Project documentation
├── .gitignore              # Git ignore rules
├── package.json            # Root package configuration
└── README.md               # This file
```

## Quick Start

### Prerequisites

- Node.js (version 16.0.0 or higher)
- npm (version 8.0.0 or higher)
- MongoDB (local or Atlas)
- Git

### Installation Steps

```bash
# Clone the project
git clone https://github.com/NicoleDavidov/CostManager-FullStack.git
cd CostManager-FullStack

# Install root dependencies
npm install

# Install all project dependencies
npm run install:all

# Configure environment variables (see "Environment Variables" section)
# Create .env files according to the instructions

# Run the application
npm run dev              # Frontend: localhost:5173, Backend: localhost:5000
```

## Available Commands

### Development
```bash
npm run dev              # Run both frontend and backend (recommended)
npm run client           # Run only frontend (localhost:5173)
npm run server           # Run only backend (localhost:5000)
```

### Installation
```bash
npm run install:all      # Install dependencies for all projects
npm run install:client   # Install frontend dependencies only
npm run install:server   # Install backend dependencies only
```

### Build & Production
```bash
npm run build            # Build frontend for production
npm start               # Run server in production mode
```

## Environment Variables

### Frontend (.env.local)
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_API_VERSION=v1

# Authentication
REACT_APP_JWT_SECRET=your_jwt_secret_here

# Features
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_NOTIFICATIONS=true
```

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development
HOST=localhost

# Database
DB_CONNECTION_STRING=mongodb://localhost:27017/costmanager
DB_NAME=costmanager

# Authentication & Security
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
BCRYPT_ROUNDS=12

# CORS
CORS_ORIGIN=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# File Upload
MAX_FILE_SIZE=5MB
UPLOAD_PATH=./uploads

# Email Service (optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## Database

### MongoDB Collections

```javascript
// Users Collection
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String, // hashed
  firstName: String,
  lastName: String,
  avatar: String,
  settings: {
    currency: String,
    language: String,
    notifications: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}

// Categories Collection
{
  _id: ObjectId,
  name: String,
  icon: String,
  color: String,
  type: String, // 'income' | 'expense'
  userId: ObjectId,
  isDefault: Boolean,
  createdAt: Date
}

// Transactions Collection
{
  _id: ObjectId,
  userId: ObjectId,
  categoryId: ObjectId,
  amount: Number,
  description: String,
  type: String, // 'income' | 'expense'
  date: Date,
  receipt: String, // file path
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication & Authorization

The project uses JWT (JSON Web Tokens) for user authentication:

- **Registration**: Create new account with password encryption
- **Login**: Authentication and JWT token issuance
- **Protected Routes**: Routes requiring authentication
- **Token Refresh**: Automatic token refresh

## Technologies Used

### Frontend Technologies
- **React 18**: JavaScript library for building user interfaces
- **Vite**: Modern build tool and development server
- **Material-UI**: React component library for styling
- **React Router**: Navigation between pages
- **Styled Components**: CSS-in-JS styling
- **Chart.js**: Charts and data visualization
- **Axios**: HTTP client for API requests

### Backend Technologies
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT implementation
- **multer**: File upload handling
- **cors**: Cross-origin requests
- **helmet**: Security middleware

### Key Features
- Responsive user interface
- Dark/Light mode support
- Interactive charts and data visualization
- Advanced filtering and search
- Data export capabilities
- File upload for receipts
- Real-time updates
- User authentication and authorization
- RESTful API design
- Modern development workflow

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints
```
POST   /auth/register     # Register new user
POST   /auth/login        # User login
POST   /auth/logout       # User logout
POST   /auth/refresh      # Refresh token
GET    /auth/me           # Get current user details
```

### Transaction Endpoints
```
GET    /transactions      # Get all transactions
POST   /transactions      # Create new transaction
GET    /transactions/:id  # Get specific transaction
PUT    /transactions/:id  # Update transaction
DELETE /transactions/:id  # Delete transaction
```

### Category Endpoints
```
GET    /categories        # Get all categories
POST   /categories        # Create new category
PUT    /categories/:id    # Update category
DELETE /categories/:id    # Delete category
```

### Reports Endpoints
```
GET    /reports/summary   # General summary
GET    /reports/monthly   # Monthly report
GET    /reports/category  # Report by categories
GET    /reports/export    # Export data
```

## Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Upload dist/ directory to hosting service
```

### Backend Deployment (Railway/Render)
```bash
# Configure environment variables on platform
# Upload code to hosting service
```

## Development Workflow

### Branch Strategy
- `main`: Production branch
- `develop`: Development branch
- `feature/*`: Feature branches
- `hotfix/*`: Hotfix branches

### Commit Convention
```
feat: add new transaction feature
fix: resolve category deletion bug
docs: update API documentation
style: format code with prettier
refactor: optimize database queries
test: add unit tests for auth service
```

## Troubleshooting

### Common Issues

**Database connection error:**
```bash
# Check if MongoDB is running
mongod --version
# Or check connection string in .env
```

**Port already in use:**
```bash
# Find process using the port
netstat -ano | findstr :5173
# Or change port in configuration
```

**CORS errors:**
```bash
# Check CORS settings in server
# Ensure client URL (localhost:5173) is in allowed origins list
```

## Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **Nicole Davidov** - *Initial work* - [@NicoleDavidov](https://github.com/NicoleDavidov)

## Acknowledgments

- React team for the amazing framework
- Vite team for the blazing fast build tool
- Express.js community
- MongoDB team
- Material-UI team for the component library
- All contributors and testers

---

**Happy Coding!**

For questions or support, please open an issue on GitHub.