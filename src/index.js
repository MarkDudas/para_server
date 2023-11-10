const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const cors = require("cors");
const expressSession = require("express-session");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(express.json());

dotEnv.config();

const UserRouter = require("./route/UserRouter");
const JobRouter = require("./route/JobRouter");
const CareerHistoryRouter = require("./route/CareerHistoryRouter");
const EducationRouter = require("./route/EducationRouter");
const LicenseRouter = require("./route/LicenseRouter");
const SkillRouter = require("./route/SkillRouter");
const LanguageRouter = require("./route/LanguageRouter");
const ApplicantRouter = require("./route/ApplicantRouter");
const OpenAiRouter = require("./route/OpenAiRouter");
const EmailRouter = require("./route/EmailRouter");

app.use(cors());

app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//mongoose connection here
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

app.use("/api/user", UserRouter);
app.use("/api/job", JobRouter);
app.use("/api/career", CareerHistoryRouter);
app.use("/api/education", EducationRouter);
app.use("/api/license", LicenseRouter);
app.use("/api/skill", SkillRouter);
app.use("/api/language", LanguageRouter);
app.use("/api/applicant", ApplicantRouter);
app.use("/api/email", EmailRouter);

//

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

const Applicant = require("./entity/Applicant");

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadToCloudinary = (file) => {
  const dataURI = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64"
  )}`;

  return cloudinary.uploader.upload(dataURI, {
    folder: "pdf-folder",
    resource_type: "auto",
  });
};

app.post("/upload-files", upload.single("pdfFile"), async (req, res) => {
  const jobId = req.body.jobId;
  const name = req.body.name;
  const job_applying = req.body.job_applying;
  const actualJobPosted = req.body.actualJobPosted;
  const email = req.body.email;
  const rank = req.body.rank;
  const skills = req.body.skills;

  try {
    const pdfFile = await uploadToCloudinary(req.file);

    await Applicant.create({
      email: email,
      pdfFile: pdfFile.secure_url,
      jobId: jobId,
      name: name,
      job_applying: job_applying,
      actualJobPosted: actualJobPosted,
      rank: rank,
      skills: skills,
    });
  } catch (error) {
    console.log(error);
  }
  res.send("Hii");
});

//

const fileUpload = require("express-fileupload");

app.use(fileUpload());

app.use("/api", OpenAiRouter);

const PORT = 5000;
app.listen(PORT, () => {
  connect();
  console.log(`server is listening to port ${PORT}`);
});
