const router = require("express").Router();
const EmailController = require("../controller/EmailController");

router.post("/send", EmailController.sendEmail);

router.post("/verify-otp", EmailController.verifyOtp);

module.exports = router;
