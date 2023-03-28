const express = require('express');
const router = express.Router();

const loginController = require("../controllers/loginController");

router.get("/", loginController.renderLogin);
router.post("/", loginController.userLogin);

router.post("/edit", loginController.userUpdate);
router.post("/delete", loginController.userDelete);
router.post("/logout", loginController.userLogout);

router.get("/test", (req, res) => {
    res.send(req.session.loggedUser);
});

module.exports = router;