import bcrypt from 'bcrypt';

export function comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
}

export function hashPassword(password) {
    return bcrypt.hash(password, 5);
}

// add function to create JWT.
