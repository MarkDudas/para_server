const axios = require("axios");
const pdfParse = require("pdf-parse");
const dotEnv = require("dotenv");

dotEnv.config();

const getChatReply = async (req, res) => {
  const apiKey = process.env.OPEN_AI_API_KEY;

  if (!req.files && !req.files.pdfFile) {
    res.status(400).send("No file uploaded.");
    return;
  }

  const pdfFile = req.files.pdfFile;
  const result = await pdfParse(pdfFile.data);
  const extractedText = result.text;

  const instructions = `Your job is to extract the following information from the provided resume and return a JSON object ONLY.
  - name: The name of the applicant
  - email: The email address of the applicant
  - skills: A list of skills that the applicant has
  - job_applying: The title of the job that the applicant is applying for
  - experience: The experience of the applicant or Compute the experience of the applicant
  - rank: A number between 0 and 100% indicating how well the resume matches the job description
  - how: How do you asses the ranking

  NOTE: Output should be JSON object ONLY WITHOUT any words before or after the JSON object

  Example: 

  {
    "name": "John Smith",
    "email": "john.smith@example.com",
    "skills": ["Driving"],
    "job_applying": "Driver",
    "experience": " 2years of driving 10 wheeler truck"
    "rank": 10,
    "how": "it is 100 because he met all the job description requirements",
  }`;

  const { jobDescription } = req.query;

  const prompt = `Instruction: ${instructions}\n Job Description: ${jobDescription} \n Resume:${extractedText}`;

  const data = {
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    messages: [{ role: "user", content: prompt }],
  };

  const apiCall = async () => {
    let success = false;

    while (!success) {
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          data,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        const reply = response.data.choices[0].message.content.trim();
        console.log(reply);
        const jsonObject = JSON.parse(reply);
        try {
          res.json(jsonObject);
          success = true;
        } catch (error) {
          console.log(`Retrying API call...`);
          await new Promise((resolve) => setTimeout(resolve, 10000));
        }
      } catch (error) {
        console.log("Error in API call:", error);
        console.log(`Retrying API call...`);
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    }
  };

  await apiCall();
};

module.exports = {
  getChatReply,
};
