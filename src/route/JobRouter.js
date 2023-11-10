const router = require("express").Router();
const JobController = require("../controller/JobController");

router.post("/create", JobController.createJob);

router.get("/list", JobController.getJobList);

router.get("/list/unarchive", JobController.getJobListUnArchive);

router.get("/list/:id", JobController.getJobById);

router.put("/update/:id", JobController.updateJobById);

module.exports = router;
