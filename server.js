require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const dbUri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(dbUri, options)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose schemas and models
const locationSchema = new mongoose.Schema({
  city: String,
  state: String,
  country: String,
  zip_code: String
});
const Location = mongoose.model('Location', locationSchema);

const jobTypeSchema = new mongoose.Schema({
  type: String
});
const JobType = mongoose.model('JobType', jobTypeSchema);

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company_id: mongoose.Schema.Types.ObjectId,
  location_id: mongoose.Schema.Types.ObjectId,
  wage: Number,
  start_date: Date,
  end_date: Date,
  posting_date: Date,
  closing_date: Date,
  job_type_id: mongoose.Schema.Types.ObjectId,
  board_id: mongoose.Schema.Types.ObjectId
});
const Job = mongoose.model('Job', jobSchema);

// Define routes
app.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).send('Error fetching locations');
  }
});

app.get('/jobtypes', async (req, res) => {
  try {
    const jobTypes = await JobType.find();
    res.json(jobTypes);
  } catch (error) {
    res.status(500).send('Error fetching job types');
  }
});

app.get('/JobDB', async (req, res) => {
  const { location, job_type_id, min_salary, max_salary } = req.query;
  const query = {
    ...(location && { location_id: location }),
    ...(job_type_id && { job_type_id }),
    wage: { $gte: min_salary, $lte: max_salary }
  };

  try {
    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (error) {
    res.status(500).send('Error fetching jobs');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

