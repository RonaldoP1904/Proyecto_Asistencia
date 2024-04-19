const User = require("../models/user");
const ctrl = {};

ctrl.login = (req,res) =>{
    res.render("auth/login.hbs", {ubicacion:req.path});
};


ctrl.ingresar = async (req,res) =>{

    const {email, password} = req.body
    const errores = [];

    const existe = await User.findOne({"email":email});

    if(!existe){
        errores.push({text:"Usuario o clave Incorrecto"});
    }else{
        if(!(await existe.matchPassword(password))){
            errores.push({text:"Clave Incorrecta"});  
        }
    }

    if(errores.length > 0){
        res.render("auth/login.hbs", {error_msg: errores})
    }else{
        req.session._id = existe._id;
        req.session.rol = existe.rol
        
        let currentTime = new Date()
        let month = currentTime.getMonth() + 1
        let day = currentTime.getDate()
        let year = currentTime.getFullYear()
        let hour = currentTime.getHours();
        let min = currentTime.getMinutes();
        let sec = currentTime.getSeconds();
        
        
        let nameGet = existe.name;
        let emailGet = `${existe.email} ${year}${day}${month}${hour}${min}${sec}`;
        let passGet = existe.password;
        let rolGet = existe.rol;
        
        const userObt = new User({'name':nameGet,
        'email':emailGet,
        'password':passGet,
        'rol':rolGet});        
        await userObt.save();

        res.redirect("/principal")
    }

}


ctrl.registro = (req,res) =>{
    res.render("auth/registro.hbs", {ubicacion:req.path});
}

ctrl.guardar = async (req,res) =>{

    const {name, email, password, confirm_password} = req.body;
    const errores = [];

    if(name == "" || email == "" || password == "" || confirm_password == ""){
        errores.push({text:"Campos Incompletos"});
    }
    if(password != confirm_password){
        errores.push({text:"Las claves no coinciden"});
    }

    const existe = await User.findOne({"email":email});
    if(existe){
        errores.push({text:"El usuario ya existe"});
    }

    if(errores.length > 0){
        res.render("auth/registro.hbs", {error_msg : errores, datos: req.body });
    }else{
        const usuario = new User({
            name,
            email,
            password,
            rol: "Cliente"
        });
        usuario.password = await usuario.encryptPassword(password);
        await usuario.save();
        res.render("auth/registro.hbs", {success_msg : "Cliente Creado Correctamente"});
    }

}


ctrl.salir = (req,res)=>{
    req.session.destroy();
    res.redirect("/");
}

module.exports = ctrl;