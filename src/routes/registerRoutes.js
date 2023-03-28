const express = require('express');
const router = express.Router();

const registerController = require("../controllers/registerController");

router.get("/", registerController.renderRegister);
router.post("/", registerController.createUser);

module.exports = router;