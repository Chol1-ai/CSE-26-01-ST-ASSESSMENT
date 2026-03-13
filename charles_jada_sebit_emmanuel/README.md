# FCA Refugee Support Program Registration System

A professional, responsive web application for refugee registration and support program management.

## Features

- Landing page with program information
- Beneficiary registration form with comprehensive validation
- Responsive design for all devices
- Real-time form validation
- Success notifications
- Professional UI following FCA brand guidelines

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Styling**: Custom CSS with FCA brand colors and fonts

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the application:**
   ```bash
   npm start
   ```

3. **Access the application:**
   - Landing Page: http://localhost:5000
   - Registration Form: http://localhost:5000/form

## Project Structure

```
├── public/           # Frontend files
│   ├── index.html   # Landing page
│   ├── form.html    # Registration form
│   ├── css/         # Stylesheets
│   ├── js/          # Client-side JavaScript
│   └── assets/      # Images and logos
├── server/          # Backend files
│   ├── server.js    # Main server file
│   ├── models/      # Database models
│   └── routes/      # API routes
└── database/        # SQLite database files (auto-created)
```

## Validation Rules

- First name, Last name, Place of birth: Required, minimum 2 characters
- Date of birth: Must be before registration date
- Gender: Radio buttons (Female default)
- Date of joining settlement camp: Must be after registration date
- Nationality, Marital status, Settlement camp: Dropdown selections

## API Endpoints

- `POST /api/register` - Register new beneficiary
- `GET /api/beneficiaries` - Get all beneficiaries
- `GET /api/statistics` - Get registration statistics
- `GET /api/health` - Health check

## Development

For development with auto-reload:
```bash
npm run dev
```

## Author

Charles Jada Sebit Emmanuel