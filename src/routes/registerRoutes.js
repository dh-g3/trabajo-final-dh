const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const registerValidations = [
    check("name")
    .notEmpty().withMessage("Debes completar el campo de nombre").bail()
    .isLength({min: 7}).withMessage("El nombre debe tener al menos 7 caracteres"),
    check("password")
    .notEmpty().withMessage("Debes completar el campo de contraseña").bail()
    .isLength({min: 7}).withMessage("La contraseña debe tener al menos 7 caracteres")
];

const registerController = require("../controllers/registerController");

router.get("/", registerController.renderRegister);
router.post("/", registerValidations, registerController.createUser);

module.exports = router;