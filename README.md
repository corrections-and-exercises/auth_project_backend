# Instructions

Familiarize yourself with the existing code. Try to explain every detail to yourself or your rubber duck. Ask someone if you have questions. There are already some useful lines written to implement authentication.

## Start

-   [ ] connect to MongoDb via Mongoose (add connection string to .env)

## User

Implement the functionality to create a new user in a database. A user should have a firstname, lastname, an unique email, and a password. Remember to hash the password before inserting it into the database.
We need three main features for the user controller: sign in, sing up, and the possiblity to [retrieve user data](https://beginner-guides.authmaker.com/release/customize-routes/me-route/).

-   [ ] add user router
-   [ ] add user model
-   [ ] add user controller

## Auth

-   [ ] add function to create jsonwebtoken
-   [ ] add middleware to check for valid token
-   [ ] think about which routes you want to protect
-   [ ] add useful error handling

## Extras

-   [ ] add validation with [express-validator](https://express-validator.github.io/docs) or [joi](https://github.com/hapijs/joi)
