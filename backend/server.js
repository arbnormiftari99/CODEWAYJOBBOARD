const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { notFound, errorHandler} = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes')
const jobsRoutes = require('./routes/jobs_routes');


require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({
  origin: 'https://jobboard-gold.vercel.app/',
  credentials: true, //included credentials as true

}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://jobboard-gold.vercel.app/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods, GET,OPTIONS,PATCH,DELETE,POST,PUT")
  next();
});

app.use('/users', userRoutes);
app.use('/jobs', jobsRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB!`);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });





app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
