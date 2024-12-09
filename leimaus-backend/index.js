const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const stamps = require('./routes/stamps');
const trainees = require('./routes/trainees');
const auth = require('./routes/auth');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors());
app.use(express.json());

app.use("/api/stamps", stamps);
app.use("/api/trainees", trainees)
app.use("/api", auth);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});