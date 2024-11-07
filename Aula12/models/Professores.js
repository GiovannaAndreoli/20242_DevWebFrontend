const mongoose = require('mongoose');
const Professores = mongoose.model('Professores', {
    nome: String,
    idade: Number,
    departamento: String,
    turmas : Array,
},"professores");
module.exports = Professores;