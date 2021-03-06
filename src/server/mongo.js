import mongoose from 'mongoose';

const mongoUrl = 'mongodb://localhost/ofc';
let connection = false;

export function initConnection() {
    if (!connection) mongoose.connect(mongoUrl);
}

export function getConnection() {
    return mongoose;
}
