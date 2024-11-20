
# Project Name
Meteo API

## Overview
This is a full-stack application with a **Ruby on Rails** backend (API) and a **React** frontend. Below are the steps to set up and run the project locally.

---

## Requirements

### Backend (Rails)
- Ruby: `3.2.2`
- Rails: `7.0.8`
- PostgreSQL (or the database you are using)

### Frontend (React)
- Node.js: `v16.20.2`
- npm: `8.19.4`

---

## Getting Started

### Backend Setup

1. **Clone the Repository:**
   ```bash
   git clone git@github.com:Minio10/Meteo_API.git
   cd meteo_api
   ```

2. **Install Dependencies:**
   Ensure you have the correct Ruby version installed (e.g., using `rbenv` or `rvm`).
   ```bash
   bundle install
   ```

3. **Start the Rails Server:**
   ```bash
   rails server
   ```
   The API will be available at `http://localhost:3000`.

---

### Frontend Setup

1. **Navigate to the Frontend Directory:**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the React Development Server:**
   ```bash
   npm start
   ```
   The React app will be available at `http://localhost:3001`.

---

## Running the Applications

1. Start the **Rails backend**:
   ```bash
   cd backend
   rails server
   ```

2. Start the **React frontend**:
   ```bash
   cd frontend
   npm start
   ```

## Additional Notes

- The backend uses Rails 7 API mode, so there’s no built-in view layer.
- The frontend communicates with the backend API via `http://localhost:3000`.
- Ensure both applications are running simultaneously to avoid connection issues.

---
