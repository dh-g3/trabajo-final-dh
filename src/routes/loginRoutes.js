const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const loginValidations = [
    check("name")
    .notEmpty().withMessage("Debes completar el campo de nombre").bail()
    .isLength({min: 7}).withMessage("El nombre debe tener al menos 7 caracteres"),
    check("password")
    .notEmpty().withMessage("Debes completar el campo de contraseña").bail()
    .isLength({min: 7}).withMessage("La contraseña debe tener al menos 7 caracteres")
];

const editValidations = [
    check("newname")
    .notEmpty().withMessage("Debes completar el campo de nombre").bail()
    .isLength({min: 7}).withMessage("El nombre debe tener al menos 7 caracteres"),
    check("newpassword")
    .notEmpty().withMessage("Debes completar el campo de contraseña").bail()
    .isLength({min: 7}).withMessage("La contraseña debe tener al menos 7 caracteres")
];

const loginController = require("../controllers/loginController");

router.get("/", loginController.renderLogin);
router.post("/", loginValidations, loginController.userLogin);
router.post("/edit", editValidations, loginController.userUpdate);
router.post("/delete", loginController.userDelete);
router.post("/logout", loginController.userLogout);

router.get("/test", (req, res) => {
    res.send(req.session.loggedUser);
});

module.exports = router;