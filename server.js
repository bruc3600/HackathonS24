const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/jobsearch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your Mongoose models
const Job = mongoose.model('Job', new mongoose.Schema({
  title: String,
  description: String,
  company_id: Number,
  location_id: Number,
  wage: Number,
  start_date: Date,
  end_date: Date,
  posting_date: Date,
  closing_date: Date,
  job_type_id: Number,
  board_id: Number,
}));

const Location = mongoose.model('Location', new mongoose.Schema({
  city: String,
  state: String,
  country: String,
  zip_code: String,
}));

const JobType = mongoose.model('JobType', new mongoose.Schema({
  type: String,
}));

// Endpoint to fetch jobs based on filters
app.get('/JobDB', async (req, res) => {
  const { location, job_type_id, min_salary, max_salary } = req.query;
  const query = {
    wage: { $gte: parseFloat(min_salary), $lte: parseFloat(max_salary) }
  };
  if (location) query.location_id = location;
  if (job_type_id) query.job_type_id = job_type_id;
  
  try {
    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to fetch locations
app.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to fetch job types
app.get('/jobtypes', async (req, res) => {
  try {
    const jobTypes = await JobType.find();
    res.json(jobTypes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
