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
  methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Welcome to the Job Board application!');
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
