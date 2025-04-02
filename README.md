# 🎵 Music Booking API

A Scalable & Secure Backend for Managing Artist Profiles, Events, and Bookings

## 📌 Overview

This is a NestJS-powered REST API for a Music Booking App, designed to handle:

✅ User Authentication (JWT + HTTP-only cookies)
✅ Artist Profiles (Manage artist details & availability)
✅ Event Listings (Create & manage concerts, gigs, etc.)
✅ Bookings (Users can book artists for events)
✅ Payments (Stripe/PayPal for transactions)
✅ Security (Bcrypt for password hashing, Passport for auth)

## ⚙️ Tech Stack

- Tool Purpose
- NestJS Backend Framework
- PostgreSQL Database
- TypeORM ORM for Database Models
- Passport.js Authentication
- Bcrypt Secure Password Hashing
- Swagger API Documentation
- JWT Token-based Authentication
- Yarn Package Manager
- Postman API Testing

## 🚀 Installation & Setup

🔹 1. Clone the Repository

```bash
git clone <https://github.com/idowuseyi/musicbookingapi.git>
cd musicbookingapi
```

🔹 2. Install Dependencies

```bash
yarn install
```

🔹 3. Set Up Environment Variables
Create a .env file in the root directory and add the following:

```bash
touch env
```

## 🚀 Server Config

PORT=3000
NODE_ENV=development

## 🗄️ Database Config

DB_TYPE=postgres
DB_USERNAME=your_user_name
DB_PASSWORD=1234
DB_HOST=localhost
DB_NAME=music_booking_db
DB_PORT=5432
DB_ENTITIES=dist/src/modules/**/entities/**/*.entity{.ts,.js}
DB_MIGRATIONS=dist/db/migrations/*{.ts,.js}

## 🔐 Auth Config

JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=10h

## 💰 Payment Config

STRIPE_SECRET=your_stripe_secret

## 📧 Email Config

MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your_email
MAIL_PASS=your_email_password

## ⚡ Running the Project

🔹 1. Start PostgreSQL
Ensure PostgreSQL is installed & running.

```bash
sudo service postgresql start
```

🔹 2. Run Migrations

```bash
yarn typeorm migration:run
```

🔹 3. Start the API Server

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

The server will be available at: <http://localhost:3000>

## 📜 API Documentation

📌 Swagger UI:
Once the server is running, access the Swagger API Docs at:

🔗 <http://localhost:3000/api/docs>

## 🛠️ Available API Modules

Module Endpoints
Auth /auth/login, /auth/signup, /auth/logout
User /users, /users/:id
Artist /artists, /artists/:id
Event /events, /events/:id
Booking /bookings, /bookings/:id
Payment /payments, /payments/:id

## 🧪 Running Tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## 🛠️ Common Issues & Fixes

1️⃣ Error: Database Connection Refused
Ensure PostgreSQL is running:

```bash
sudo service postgresql start
```

2️⃣ Error: .env File Not Found
Make sure your .env file exists in the root directory.

3️⃣ TypeORM Migration Errors
If migrations fail, try:

```bash
yarn typeorm migration:revert
yarn typeorm migration:run
```

## 📌 Contributions

Contributions are welcome! Feel free to fork the repo and submit PRs.

## License

Nest is [MIT licensed](LICENSE).
