# Live Frontend Link

https://leaderboard-blush-sigma.vercel.app

# LeaderBoard

A full-stack web application for managing and displaying a leaderboard, built with React (frontend), Node.js/Express (backend), and MongoDB (database).

## Features
- User leaderboard with rankings
- Claim rewards functionality
- User selection and history tracking
- Responsive, modern UI
- RESTful API backend

## Folder Structure
```
leaderboard/
  backend/        # Node.js/Express API
    controllers/
    models/
    routes/
    seed/
    index.js
    package.json
  frontend/       # React app
    public/
    src/
      components/
      services/
      assets/
      App.js
      index.js
    package.json
```

## Tech Stack
- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Atlas recommended)

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB Atlas account (or local MongoDB)

### Backend Setup
```bash
cd backend
npm install
# Set up .env with your MongoDB URI
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Environment Variables
- Backend: Create a `.env` file in `backend/` with:
  ```
  MONGO_URI=your_mongodb_connection_string
  PORT=5000
  ```
- Frontend: If your API is not on localhost, update API URLs in `src/services/api.js` or use a `.env` file:
  ```
  REACT_APP_API_URL=https://your-backend-url.com
  ```
   
