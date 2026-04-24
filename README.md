# Project Documentation

## Frontend Features
- User-friendly interface for clothing browsing
- Search functionality for finding products
- User authentication and profile management
- Shopping cart for product selection and checkout

## Backend Features
- RESTful API for handling client requests
- Database integration for product and user management
- Secure authentication and authorization
- Admin panel for managing products and users

## Technology Stack
- **Frontend:** React, Redux, CSS, HTML
- **Backend:** Node.js, Express.js, MongoDB
- **Deployment:** Heroku, GitHub Actions for CI/CD

## Setup Instructions
1. Clone the repository: `git clone https://github.com/ghost-bw/AI-Powered-ClothingBrand`
2. Navigate into the project directory: `cd AI-Powered-ClothingBrand`
3. Install dependencies:
   - For frontend: `cd client && npm install`
   - For backend: `cd server && npm install`
4. Set up environment variables in a `.env` file as per the `.env.example` file.
5. Run the application:
   - For frontend: `cd client && npm start`
   - For backend: `cd server && npm start`

## API Endpoints
- `GET /api/products` - Retrieve all products
- `POST /api/products` - Add a new product (Admin only)
- `PUT /api/products/:id` - Update a product (Admin only)
- `DELETE /api/products/:id` - Delete a product (Admin only)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

For further details, refer to the individual file documentation in the respective directories.