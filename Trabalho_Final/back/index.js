const express = require('express');
const newcompriModel = require('./schema');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/cadastrar", (req, res) =>{
    console.log(req.body);
    new newcompriModel(
        req.body
    ).save().then((result) => {
        console.log("Cadastrado!!");
        res.send(result)

    }).catch((err) => {
        console.log("ERRO")
        res.status(400).send("Erro");
    })
})
app.get("/listar/:dia", (req, res) =>{
    console.log(req.body);
    newcompriModel.find({dias: req.params.dia}).then((result) => {
        console.log("listados");
        console.log(req.params.dia);
        console.log(result);
        res.send(result)

    }).catch((err) => {
        console.log("ERRO em listar")
        res.status(400).send("Erro");
    })
})
app.delete("/deletar/:id", (req, res) =>{
    newcompriModel.findByIdAndRemove(req.params.id).
    then((result) =>{
        res.send('Deletado')
    })
    .catch((err) =>{
        console.log("ERRo ao deletar");
    })
})

app.listen(9999, function(){
    console.log("Deu certo");
})
