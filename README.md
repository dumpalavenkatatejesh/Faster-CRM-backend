# Fastor CRM Backend

Express + Sequelize + SQLite + JWT implementation for Fastor NodeJs assignment.

## Features
- Employee register & login (JWT)
- Public enquiry submission (no auth)
- View unclaimed public enquiries
- Employee can claim an enquiry (becomes private)
- View enquiries claimed by logged-in employee

## Setup
1. Clone / create project folder and add files as shown.
2. Install dependencies:
   ```bash
   npm install

## Create .env from .env.example and set values:

PORT=4000

JWT_SECRET=your_secret

DATABASE_STORAGE=./database.sqlite

## Start server:

npm run dev   # with nodemon
# or
npm start
