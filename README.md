# Google OAuth 2.0 Authentication with Passport.js

A simple Node.js application demonstrating Google OAuth 2.0 authentication using Express.js, Passport.js, and the Google OAuth 2.0 strategy.

---

## Features

* Google OAuth 2.0 Login
* Passport.js Authentication
* Express.js Server
* Environment Variable Configuration using dotenv
* HTTP Request Logging with Morgan
* Easy to understand project structure
* Ready to integrate with JWT or Database

---

## Tech Stack

* Node.js
* Express.js
* Passport.js
* Passport Google OAuth 2.0
* Morgan
* Dotenv

---

## Project Structure

```
google-oauth/
│
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── main.js
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/yourusername/google-oauth.git
```

Navigate to the project

```bash
cd google-oauth
```

Install dependencies

```bash
npm install
```

---

## Required Packages

```bash
npm install express passport passport-google-oauth20 dotenv morgan
```

If using sessions:

```bash
npm install express-session
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
GOOGLE_USER_URL=http://localhost:3000/auth/google/callback
```

---

## Google Cloud Console Configuration

1. Go to Google Cloud Console.
2. Create a new project.
3. Enable the Google People API.
4. Configure the OAuth Consent Screen.
5. Create OAuth 2.0 Client Credentials.
6. Add the Authorized Redirect URI:

```
http://localhost:3000/auth/google/callback
```

7. Copy the Client ID and Client Secret into the `.env` file.

---

## Running the Application

Start the server

```bash
node main.js
```

or

```bash
npm start
```

Server runs on

```
http://localhost:3000
```

---

## Authentication Flow

```
Client
   │
   ▼
GET /auth/google
   │
   ▼
Google Login Page
   │
   ▼
User Grants Permission
   │
   ▼
Google Redirects
/auth/google/callback
   │
   ▼
Passport Verifies User
   │
   ▼
req.user contains Google Profile
   │
   ▼
Redirect / Generate JWT / Save User
```

---

## Available Routes

### Home Route

```
GET /
```

Response

```
Hello Welcome to the Home Page
```

---

### Login with Google

```
GET /auth/google
```

Redirects the user to Google's login page.

---

### Google Callback

```
GET /auth/google/callback
```

Google redirects the user here after successful authentication.

---

## Passport Configuration

The application uses the Google OAuth Strategy.

```javascript
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_USER_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);
```

---

## Using JWT (Recommended)

If your application uses JWT authentication, disable Passport sessions.

```javascript
passport.authenticate("google", {
    session: false
});
```

After successful authentication:

1. Find or create the user in the database.
2. Generate a JWT.
3. Return the token to the client.

---

## Using Express Session

If you want Passport to maintain login sessions, install:

```bash
npm install express-session
```

Configure session middleware.

```javascript
app.use(session({
    secret: "your-secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
```

Also add:

```javascript
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
```

---

## Common Errors

### Login sessions require session support

Reason:

Passport tries to create a login session, but Express Session is not configured.

Solution:

* Use `session: false` for JWT authentication.
* Or configure `express-session`.

---

### Unauthorized Redirect URI

Reason:

The callback URL does not match the one configured in Google Cloud Console.

Solution:

Ensure both URLs are identical.

Example

```
http://localhost:3000/auth/google/callback
```

---

### Missing Client ID or Secret

Reason:

Environment variables are not loaded.

Solution:

* Install dotenv.
* Add `require("dotenv").config()` at the top of the application.
* Verify the `.env` file exists in the project root.

---

## Future Improvements

* MongoDB Integration
* JWT Authentication
* User Registration
* User Login
* Refresh Tokens
* Logout Route
* Protected Routes
* Role-Based Authorization
* Profile Page
* Frontend Integration (React)

---

## Author

Sandeep Choudhary

---

##
