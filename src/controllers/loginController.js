let db = require("../database/models");
const { validationResult } = require("express-validator");

const loginController = {
    renderLogin: (req, res) => {
        res.render("login", {loggedUser: req.session.loggedUser});
    },
    userLogin: (req, res) => {
        // Traer validaciones de campos para iniciar sesión
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            res.render("login", {
                loggedUser: req.session.loggedUser,
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } else {
            // Superadas las validaciones
            // Buscar en DB usuario con datos enviados por el form
            db.User.findOne({
                where: {
                    name: req.body.name,
                    password: req.body.password
                },
                raw: true
            })
            .then((foundUser) => {
                // Si el resultado es null, no lo encontró. "Credenciales inválidas"
                if (foundUser == null) {
                    res.render("login", {
                        loggedUser: req.session.loggedUser,
                        notMatch: "No se ha encontrado al usuario"
                    });
                } else {
                    // Lo encontró: Guardar su nombre en Session
                    req.session.loggedUser = foundUser.name;
                    console.log(`Inició sesión el usuario ${req.session.loggedUser}`);
                    res.redirect("/login");
                }
            })
        }
    },
    userUpdate: (req, res) => {
        // Traer validaciones de campos para editar usuario
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            res.render("login", {
                loggedUser: req.session.loggedUser,
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } else {
            // Superadas las validaciones
            // Reemplaza datos del form buscando en la DB el usuario en sesión
            db.User.update({
                name: req.body.newname,
                password: req.body.newpassword
            },{
                where: {
                    name: req.session.loggedUser
                }
            })
            .then(() => {
                // Busca el usuario editado en la DB
                db.User.findOne({
                    where: {
                        name: req.body.newname,
                        password: req.body.newpassword
                    },
                    raw: true
                })
                .then((foundUser) => {
                    // Actualiza la sesión con los nuevos datos
                    req.session.loggedUser = foundUser.name;
                    console.log("Se actualizaron datos del usuario");
                    res.redirect("/login");
                })
            })
        }
    },
    userDelete: (req, res) => {
        // Elimina datos de usuario que coincide con usuario en sesión
        db.User.destroy({
            where: {
                name: req.session.loggedUser
            }
        })
        .then(() => {
            // Cerrar sesión
            req.session.loggedUser = undefined;
            console.log("Se eliminó un usuario");
            res.redirect("/login");
        })
    },
    userLogout: (req, res) => {
        req.session.loggedUser = undefined;
        console.log("El usuario cerró sesión");
        res.redirect("/login");
    }
};

module.exports = loginController;