const mongoose = require('mongoose');

function connectToDb() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        const err = new Error('MONGO_URI environment variable is not set');
        console.error(err.message);
        return Promise.reject(err);
    }

    // Optional: adjust query strictness for Mongoose 6/7
    mongoose.set('strictQuery', true);

    return mongoose.connect(uri)
        .then((mongooseInstance) => {
            console.log('Connected to MongoDB');
            return mongooseInstance;
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
            throw err;
        });
}

module.exports = connectToDb;