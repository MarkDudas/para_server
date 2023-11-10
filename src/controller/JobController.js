const Job = require("../entity/Job");

const createJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const job = await newJob.save();
    res.status(200).json(job);
  } catch (error) {
    console.log(error);
  }
};

const getJobList = async (req, res) => {
  try {
    const jobList = await Job.find();
    res.status(200).json(jobList);
  } catch (error) {
    console.log(error);
  }
};

const getJobListUnArchive = async (req, res) => {
  try {
    const jobList = await Job.find({ isArchive: false });
    res.status(200).json(jobList);
  } catch (error) {
    console.log(error);
  }
};

const getJobById = async (req, res) => {
  try {
    const jobList = await Job.findById(req.params.id);
    res.status(200).json(jobList);
  } catch (error) {
    console.log(error);
  }
};

const updateJobById = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(job);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getJobById,
  createJob,
  getJobList,
  updateJobById,
  getJobListUnArchive,
};
