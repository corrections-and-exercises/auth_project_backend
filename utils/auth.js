import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export function comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
}

export function hashPassword(password) {
    return bcrypt.hash(password, 5);
}

export function createJWT(id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    return token;
}
