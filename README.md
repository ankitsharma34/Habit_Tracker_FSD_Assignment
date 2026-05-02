# Habit Tracker

A full-stack MERN application to track daily habits, monitor streaks, and visualize progress over time.

---

## Objective

To build a web-based habit tracking application that helps users develop and maintain positive daily habits by allowing them to log, track, and visualize their consistency. The project is developed using the **iterative development methodology**, where new features are added in stages.

---

## Features

- Add, edit, and delete habits
- Mark habits as completed for the day
- Track current streaks and longest streaks
- View overall stats (total habits, completions, best streak)
- Calendar view to see completion history
- User authentication (signup/login)
- Progress charts and visualizations
- Persistent data storage with MongoDB
- Responsive design for mobile and desktop

---

## Tech Stack

| Layer            | Technology                                              |
| ---------------- | ------------------------------------------------------- |
| **Frontend**     | React (Vite), Axios, React Router                       |
| **Backend**      | Node.js, Express.js                                     |
| **Database**     | MongoDB (Mongoose)                                      |
| **Architecture** | MVC Pattern                                             |
| **Deployment**   | Vercel (Frontend), Render (Backend), MongoDB Atlas (DB) |

---

## How to Run

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/ankitsharma34/Habit_Tracker_FSD_Assignment.git
cd habit-tracker
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
NODE_ENV=development
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file inside `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

### 4. Open the App

Visit **http://localhost:5173** in your browser

---

## API Endpoints

Base URL: `http://localhost:5000/api`

### Habit Endpoints

| Method   | Endpoint                  | Description                           |
| -------- | ------------------------- | ------------------------------------- |
| `GET`    | `/habits`                 | Get all habits                        |
| `GET`    | `/habits/stats`           | Get overall stats                     |
| `GET`    | `/habits/analytics`       | Get progress chart data               |
| `POST`   | `/habits`                 | Create a new habit                    |
| `PUT`    | `/habits/:id`             | Update a habit                        |
| `DELETE` | `/habits/:id`             | Delete a habit                        |
| `PATCH`  | `/habits/:id/toggle`      | Toggle today's completion             |
| `PATCH`  | `/habits/:id/toggle-date` | Toggle completion for a specific date |

### Auth Endpoints

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| `POST` | `/auth/register` | Register a new user     |
| `POST` | `/auth/login`    | Login user              |
| `GET`  | `/auth/me`       | Get logged-in user info |

---

## Iterations

The project is built incrementally over 6 iterations:

| #   | Iteration                     | Description                                       | Status |
| --- | ----------------------------- | ------------------------------------------------- | ------ |
| 0   | Project Setup                 | Folder structure, MVC pattern, MongoDB connection | Done   |
| 1   | Add Habits + Daily Completion | CRUD operations, mark/unmark today                | Done   |
| 2   | Streak Counter                | Current streak, longest streak, stats dashboard   | Done   |
| 3   | Calendar View                 | Monthly calendar grid with click-to-toggle        | Done   |
| 4   | User Authentication           | JWT-based signup/login, per-user habits           | Done   |
| 5   | Progress Charts               | Weekly/monthly visualizations using Recharts      | Done   |

---

## Team

| Name                   | Roll No. | Responsibilities                               |
| ---------------------- | -------- | ---------------------------------------------- |
| **Ankit Kumar Sharma** | 12311017 | Iteration 0, 1, 2 (Setup, CRUD, Streaks)       |
| **Ankush**             | 12311021 | Iteration 3, 4 (Calendar View, Authentication) |
| **Harsh Raj**          | 12311033 | Iteration 5 (Progress Charts & Deployment)     |

---

## License

This project is built as part of a college assignment for educational purposes.
