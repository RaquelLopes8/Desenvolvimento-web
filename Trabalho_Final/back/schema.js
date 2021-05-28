const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/portaComprimidos', {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then((result) => {
        console.log("conectado")
    }).catch((err) => {
        console.log(err)
    });

const comprSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    dias: {
        type: [String]
    },
    data1: {
        type: String
    },
    data2: {
        type: String
    },
    qtd: {
        type: Number
    },
    hora: {
        type: String
    }
})

const compriModel = mongoose.model('comprimido', comprSchema);

module.exports = compriModel;