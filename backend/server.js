const express = require('express');
const mongoose = require('mongoose');
const candidateRoutes = require('./routes/candidate_routes')

require('dotenv').config();

const app = express();

app.use(express.json());



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


app.use('/candidates', candidateRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
