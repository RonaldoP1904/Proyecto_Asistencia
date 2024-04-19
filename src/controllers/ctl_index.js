const User = require("../models/user");
const Notas = require("../models/nota");
const ctrl = {};

ctrl.inicio = async (req,res)=>{

    res.render("index.hbs", {session: req.session})
};

ctrl.principal = async (req,res)=>{

    var users = []

    const user = await User.findOne({"_id":req.session._id}).select("-password");

    if(req.session.rol === "administrador"){
        users = await User.find({"_id": { $nin: req.session._id}}).select("-password")
        
    }else if(req.session.rol === "Cliente"){
        users = await User.find({"_id":  req.session._id}).select("-password")

    }
    

    res.render("principal.hbs", {session: req.session,users, user});
};

ctrl.about = (req,res)=>{
    res.render("about.hbs", {session: req.session, ubicacion:req.path})
};

module.exports = ctrl;