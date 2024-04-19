const ctl_notas = require("../controllers/ctl_notas");
const {isAuth} = require("../helpers/auth")

module.exports = (app) => {

    app.get("/notas/add", isAuth, ctl_notas.add);
    app.post("/notas/add", isAuth, ctl_notas.guardar);

    
    app.delete("/nota/del", isAuth, ctl_notas.eliminar);
    app.get("/notas/editar/:codigo", isAuth, ctl_notas.edit);
    app.post("/notas/editar/:codigo", isAuth, ctl_notas.modificar);

}