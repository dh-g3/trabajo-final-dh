const express = require('express');
const app = express();
const session = require('express-session')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: "SessionKey",
    resave: true,
    saveUninitialized: true
}));

/* Vistas y archivos públicos de la aplicación */

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

/* Rutas de la aplicación */

const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});