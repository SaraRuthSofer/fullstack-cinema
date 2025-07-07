# Cinema Management System

A full-stack web application for managing movies, subscriptions, and users in a cinema environment. This project demonstrates a modern, scalable, and secure solution for cinema management, built with cutting-edge technologies and best practices.

## Features
- User authentication and authorization with granular permissions
- Movie management: add, edit, delete, and view movies
- Subscription management: manage members and their subscriptions
- User management: admin panel for user CRUD and permissions
- Responsive, modern UI with a beautiful custom theme
- RESTful API architecture
- Robust error handling and validation
- Modular, maintainable codebase

## Technologies Used
### Client (Frontend)
- React 18
- Redux for state management
- React Router v6
- Vite for fast development
- Custom CSS (including rose-theme)

### Server (Backend)
- Node.js
- Express.js
- File-based data storage (JSON files)
- Modular service and repository layers
- RESTful API design

## Project Structure
```
FullStack-Cinema/
  client/    # React frontend
  server/    # Node.js + Express backend
```

## Getting Started
1. Clone the repository:
   ```
   git clone https://github.com/<your-username>/FullStack-Cinema.git
   ```
2. Install dependencies for both client and server:
   ```
   cd FullStack-Cinema/client && npm install
   cd ../server && npm install
   ```
3. Start the backend server:
   ```
   node cinema_ws/index.js
   ```
4. Start the frontend:
   ```
   cd ../client
   npm run dev
   ```
5. Open your browser at `http://localhost:5173`

## Screenshots
![Movies Page](./screenshots/movies-page.png)
![Subscriptions Page](./screenshots/subscriptions-page.png)

## Why This Project Stands Out
- Clean, modular codebase for easy maintenance and scalability
- Real-world permission system for enterprise-grade security
- Modern UI/UX with attention to detail
- Clear separation of concerns between client and server
- Ready for deployment and further extension

## License
This project is licensed under the MIT License.

---

> Developed by saraRuthSofer as part of the Full Stack course at Yaniv Arad School.
