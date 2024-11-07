const alunoModel = require('../models/aluno');

// Lógica para obter todos os alunos
exports.obterTodos = async (req, res) => {
    try {
        const usuarios = await alunoModel.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.obterPorRa = async (req, res) => {
    try {
        const aluno = await alunoModel.findOne({ ra: req.params.ra });
        if (aluno) {
            res.status(200).json(aluno);
        } else {
            res.status(400).json({ message: 'Aluno não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}
exports.obterDisciplinasPorRa = async (req, res) => {
    try {
        const aluno = await alunoModel.findOne({ ra: req.params.ra });
        if (aluno) {
            res.status(200).json(aluno.disciplinas);
        } else {
            res.status(400).json({ message: 'Aluno não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

