const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectToDb = require('./db/db');
const userRouter = require('./routes/user.routes');
const captainRouter = require('./routes/captain.routes');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRouter);
app.use('/captain', captainRouter); // singular path base
app.use('/captains', captainRouter); // optional backward compatibility

module.exports = app;