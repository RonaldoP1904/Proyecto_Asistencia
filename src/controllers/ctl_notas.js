const Nota = require("../models/nota");
const ctrl = {};
const mongoose = require("mongoose");
const user = require("../models/user");

ctrl.add = (req,res) =>{
    res.render("notas/add.hbs", {session: req.session});
};


ctrl.modificar = async (req,res)=>{ //post

    const codigo = req.params.codigo;
    const { title, description } = req.body;

    const nota = await Nota.findOne({ _id: codigo });

    const errores = [];

    if (!mongoose.Types.ObjectId.isValid(codigo)) {
        errores.push({ text: "Id incorrecto" });
    }
    if (!nota || nota.user != req.session._id) {
        errores.push({ text: "No se puede Editar una Nota de otro usuario" });
    }
    if (title.trim() === "" || description.trim() === "") {
        errores.push({ text: "Campos Incompletos" });
    }

    if (errores.length > 0) {
        res.render("notas/edit.hbs", { session: req.session, error_msg: errores, nota: req.body });
    } else {
        nota.title = title;
        nota.description = description;
        await nota.save();
        res.render("notas/edit.hbs", { session: req.session, success_msg: "Actualizado Correctamente", nota });
    }

}

ctrl.edit = async (req,res) => { //get

    const codigo = req.params.codigo;

    if (!mongoose.Types.ObjectId.isValid(codigo) || !(await Nota.exists({ _id: codigo, user: req.session._id }))) {
        return res.redirect("/principal");
    }

    const nota = await Nota.findOne({ _id: codigo });

    res.render("notas/edit.hbs", { session: req.session, nota });
    
}


ctrl.guardar = async (req,res) =>{
    
    const {title, description} = req.body;
    const errores = [];

    if(title == "" || description == ""){
        errores.push({text:"Campos Incompletos"});
    }

    if(errores.length > 0){
        res.render("notas/add.hbs", {error_msg : errores, datos: req.body });
    }else{

        user = req.session._id

        const nota = new Nota({
            title,
            description,
            user
        })

        await nota.save();
        res.render("notas/add.hbs", {session: req.session, success_msg : "Nota Creado Correctamente"});

    }

};


ctrl.eliminar = async (req,res) =>{

    const codigo = req.body.id;

    if (!mongoose.Types.ObjectId.isValid(codigo) || !(await user.exists({ user_id: codigo, user: req.session._id }))) {
        res.status(500).json(false);
    }

    await user.deleteOne({ _id: codigo });
    res.status(200).json(true)

}


module.exports = ctrl;