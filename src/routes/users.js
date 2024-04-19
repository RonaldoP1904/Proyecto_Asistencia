const router = require('express').Router();

const Note = require('../models/user');

router.get('/users/edit/:id',async (req,res)=>{
    const note = await Note.findById(req.params.id).lean();
    console.log(note);
    res.render('users/edit',{note});    
});

router.post('/users/edit-user',async (req, res)=>{
    console.log(req.body);
    const {id, name, email} = req.body;
    const errors = [];

    if(!name){
        errors.push({text:'Ingrese un nombre'});
    }

    if(!email){
        errors.push({text:'Ingrese una email'});
    }

    if(errors.length>0){
        res.render('notes/new-note',{
            errors,
            name,
            email
        });
    }else{
        await Note.findByIdAndUpdate(id, {name,email});
        res.redirect('../principal')
    }
});

router.post('/users/delete-users/:id',async (req,res)=>{
    console.log(req.params.id);
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('../../principal');
})

module.exports = router;