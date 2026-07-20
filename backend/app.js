const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectToDb = require('./db/db');
const userRouter = require('./routes/user.routes');
const captainRouter = require('./routes/captain.routes');
const mapRouter = require('./routes/maps.routes');
const rideRouter = require('./routes/ride.route');


connectToDb();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174'
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRouter);
app.use('/captain', captainRouter); // singular path base
app.use('/captains', captainRouter); // optional backward compatibility
app.use('/maps',mapRouter)
app.use('/rides',rideRouter)

module.exports = app;