const express = require("express");
const router = express.Router();
const { getCurrentUser, getAllUser } = require("../controllers/user.controller");

router.get("/current-user", getCurrentUser)
router.get("/getalluser", getAllUser);


module.exports = router;