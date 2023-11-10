const router = require("express").Router();
const OpenAiController = require("../controller/OpenAiController");

router.post("/openai", OpenAiController.getChatReply);

module.exports = router;
