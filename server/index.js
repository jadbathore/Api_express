const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = 3000;

app.set('view engine','ejs')

mongoose.connect('mongodb://127.0.0.1:27017/film_data')
const mongooseSchema = mongoose.Schema(
    {
        name:String,
        duration:String,
        Director:String,
        scriptwriter:String,
    },{ autoCreate: false, autoIndex: true}
)
const FilmModel = new mongoose.model('Film_Model',mongooseSchema)

app.get('/item/',(req,res)=>{
res.render('template')
})

app.post('/item/:film/:duration/:director/:scriptwriter',(req,res)=>
{
        const add = new FilmModel(
        {
            name:req.params.film,
            duration:req.params.duration,
            Director:req.params.director,
            scriptwriter:req.params.scriptwriter,
        })
    add.save();
    res.json({
        result:'ok'
    })
})

app.get('/item/:film',async(req,res) => {
    const film = req.params.film;
    const select = await FilmModel.findOne({'name':film})
        if(select != null)
        {
            res.json(select)
        } else {
            res.status(404).json(`aucun film nommé '${film}' n'a été trouver`)
        }
    })

//     
app.post('/item/:film',async(req,res)=>{
    const film = req.params.film;
    const select = await API.findOne({'name':film})
    select.then((select))
})

app.listen(port,()=>{
    console.log(`server is running on port : ${port}`)
})