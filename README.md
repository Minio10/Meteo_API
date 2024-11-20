
# Project Name
Meteo API

## Overview
This is a full-stack application that uses a Ruby on Rails backend (API) and a React frontend. The Rails API serves as the backend for the React app, providing weather information based on a given location and date range.

When weather data for a requested location and date range is not found in the database, the Rails API makes an external API call to Open Meteo to retrieve the missing data. The goal of the project is to allow users to access detailed weather information for a specific location and date range.

In the React frontend, the weather information is displayed in two formats:
- A **line graph** that visualizes the **min and max temperatures** along with **precipitation** for the given date range.
- A **table** that presents the same data in a structured format.

Below are the steps to set up and run the project locally.

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
---

### Frontend Setup

1. **Navigate to the Frontend Directory:**
   ```bash
   cd ../meteo-client
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
---

## Running the Applications

To start both the Rails backend and the React frontend concurrently, use **Foreman**:

```bash
gem install foreman
foreman start
```
---
## Additional Notes

- The backend uses Rails 7 API mode, so there’s no built-in view layer.
- The frontend communicates with the backend API via `http://localhost:3000`.
- Ensure both applications are running simultaneously to avoid connection issues.

---
