# FCA Refugee Support Program

This project implements a landing page and a beneficiary registration form with a Node.js backend and MongoDB storage.

## Project Structure
- `frontend/` UI (landing page + registration form)
- `backend/` API server, routes, model validation, MongoDB connection

## Requirements Met
- Two components: landing page and beneficiary registration form
- Frontend + Backend separation
- Form validation and submission
- Backend with database (MongoDB), models, and routes
- Success alert with reset behavior

## Validation Rules
- First name, last name, and place of birth are required (min 2 characters)
- Date of birth must be before today
- Date of joining settlement camp must be after today
- Gender radio buttons default to female
- Select options match the provided list

## Run Locally
### 1) Start MongoDB
Make sure MongoDB is running (Compass connected to `mongodb://localhost:27017/ASSESSMENT`).

### 2) Install backend dependencies
```powershell
cd C:\Users\USER\CSE-26-01-ST-ASSESSMENT\kwizera_maria\backend
npm install
```

### 3) Start the backend
```powershell
node server.js
```
You should see:
```
Backend running on http://localhost:3000
MongoDB connected: mongodb://localhost:27017/ASSESSMENT
```

### 4) Open the app
Open in your browser:
```
http://localhost:3000/registration.html
```

## API Endpoints
- `GET /api/health`
- `GET /api/beneficiaries`
- `POST /api/beneficiaries`

## Notes
- Data is stored in MongoDB database `ASSESSMENT`, collection `beneficiaries`.
- Backend serves the frontend from `http://localhost:3000/`.
