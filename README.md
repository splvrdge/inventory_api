# Inventory Management System API

A robust REST API for managing inventory, built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Register/Login)
- Supplier Management
- Item Management
- JWT-based Authorization
- MongoDB Integration

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Suppliers
- POST `/api/suppliers` - Create new supplier
- GET `/api/suppliers` - Get all suppliers

### Items
- POST `/api/items` - Create new item
- GET `/api/items` - Get all items

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/splvrdge/inventory_api.git
```

2. Install dependencies
```bash
cd BACKEND
npm install
```

3. Create a .env file with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the server
```bash
npm start
```

## Testing

API endpoints can be tested using the Postman collection located in the `tests` directory.

## Documentation

Detailed API documentation and test results can be found in:
- `tests/inventory-api.postman_collection.json`
- `tests/test_results_2024-12-14.json`
