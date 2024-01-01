const Applicant = require("../entity/Applicant");

const getApplicantById = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    res.status(200).json(applicant);
  } catch (err) {
    console.log(err);
  }
};

const getApplicantList = async (req, res, next) => {
  try {
    const applicant = await Applicant.find();
    res.status(200).json(applicant);
  } catch (err) {
    next(err);
  }
};

const getApplicantByEmail = async (req, res) => {
  try {
    const applicant = await Applicant.find({ email: req.params.email });
    res.status(200).json(applicant);
  } catch (error) {
    console.log(error);
  }
};

const getApplicantJobCounts = async (req, res) => {
  try {
    const filter = req.params.filter;

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    let dateFilter;

    if (filter === "month") {
      dateFilter = {
        $gte: new Date(`${currentYear}-${currentMonth}-01T00:00:00.000Z`),
      };
    } else if (filter === "year") {
      dateFilter = {
        $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      };
    }

    const jobCounts = await Applicant.aggregate([
      {
        $match: {
          createdAt: dateFilter,
        },
      },
      {
        $group: {
          _id: "$actualJobPosted",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          jobPosted: "$_id",
          count: 1,
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);

    res.status(200).json(jobCounts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getApplicantJobCountsToday = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    const jobCounts = await Applicant.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(
              `${currentYear}-${currentMonth}-${currentDay}T00:00:00.000Z`
            ),
          },
        },
      },
      {
        $group: {
          _id: "$actualJobPosted",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          jobPosted: "$_id",
          count: 1,
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.status(200).json(jobCounts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getApplicantById,
  getApplicantList,
  getApplicantByEmail,
  getApplicantJobCounts,
  getApplicantJobCountsToday,
};
