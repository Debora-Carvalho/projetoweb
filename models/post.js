const db = require("./banco")

const Agendamentos = db.sequelize.define('agendamentos',{
    nome:{
        type: db.Sequelize.STRING
    },
    telefone:{
        type: db.Sequelize.STRING
    },
    origem:{
        type: db.Sequelize.STRING
    },
    data_contato:{
        type: db.Sequelize.DATEONLY
    },
    observacao:{
        type: db.Sequelize.TEXT
    }
})

//Agendamentos.sync({force:true}) aqui estou criando uma tabela, depois que criar devo deixar comentada

module.exports = Agendamentos