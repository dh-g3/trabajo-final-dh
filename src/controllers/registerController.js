let db = require("../database/models");

const registerController = {
    renderRegister: (req, res) => {
        res.render("register");
    },
    /* Registrar usuario */
    createUser: (req, res) => {
        db.User.create({
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
};

module.exports = registerController;