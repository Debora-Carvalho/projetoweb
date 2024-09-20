const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")
const { where } = require("sequelize")

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("primeira_pagina")
})

app.post("/atualizar", function(req, res){
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    },{
        where:{
            id: req.body.id
        }
    }).then(
        function(){
            res.redirect("/consultar")
            console.log("Dados atualizados com sucesso!")
        }
    )
})

app.get("/excluir/:id", function(req, res){
    post.findAll({where: {'id': req.params.id}}).then(function(posts){
        console.log("Dados excluídos com sucesso!")
        res.render("excluir",{posts})
    })
})


app.post("/confirmaexcluir", function(req, res){
    post.destroy({
        where:{
            id: req.body.id
        }
    }).then(
        function(){
            res.redirect("/consultar")
            console.log("Dados excluídos com sucesso!")
        }).catch(function(erro){
        res.send("Falha ao excluir os dados: " + erro)
    })
})

app.post("/cadastrar", function(req, res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function(){
        console.log("Dados cadastrados com sucesso")
        res.send("Dados cadastrados com sucesso")
        res.redirect("/")
    }).catch(function(erro){
        res.send("Falha ao cadastrar os dados: " + erro)
    })
})

app.get("/consultar", function(req,res){
    post.findAll().then(function(posts){
        res.render("consulta.handlebars", {posts})
        console.log(posts)
    })
    
})

app.get("/editar/:id", function(req,res){
    post.findAll({where: {'id': req.params.id}}).then(
function(posts){
    res.render("editar",{posts})
}
    )
})

app.listen(8081, function(){
    console.log("Servidor ativo!")
})