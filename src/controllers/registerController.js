let db = require("../database/models");
const { validationResult } = require("express-validator");

const registerController = {
    renderRegister: (req, res) => {
        res.render("register");
    },
    /* Registrar usuario */
    createUser: (req, res) => {
        // Traer validaciones de campos para crear usuario
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            // Si hay errores renderizarlos y persistir datos válidos si fueron enviados
            res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } else {
            db.User.create({
                // Si no hay errores de validación, crear usuario
                name: req.body.name,
                password: req.body.password
            }, { raw: true })
            .then(function(newUser){
                console.log("Se creó el usuario " + req.body.name);
                res.redirect("/login");
            })
            .catch(function(error){
                console.log(error);
            });
        }
    }
};

module.exports = registerController;