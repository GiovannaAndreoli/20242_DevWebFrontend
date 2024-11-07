const Professores = require("../models/Professores");

//todos os professores
exports.listarProfessores = async (req, res) => {
    try {
        const professores = await Professores.find();
        res.status(200).json(professores);
    } catch (error) {
        res.status(500).json({ error: error});
    }
};
//buscar professor por departamento
exports.listarProfessoresPorDepartamento = async (req, res) => {
    try {
        const professores = await Professores.find({ departamento: req.params.departamento });
        res.json(professores);
    } catch (err) {
        res.status(500).json({ error: 'Erro em buscar professores por departamento.' });
    }
};

// buscar professor por ID
exports.buscarProfessorPorId = async (req, res) => {
    try {
        const professor = await Professores.findById(req.params.id);
        if (!professor) return res.status(404).send('Id não existe');
        res.json(professor);
    } catch (err) {
        res.status(500).json({ error:'Erro em busca de  professores.' });
    }
};

// buscar turmas de um professor
exports.listarTurmasProfessor = async (req, res) => {
    try {
        const professor = await Professores.findOne({ id: req.params.id});
        if (!professor) return res.status(404).send('Id não existe');
        res.json(professor.turmas);
    } catch (err) {
        res.status(500).json({ error: 'Erro em busca de turmas do professor.' });
    }
};
// Atualizar dados do professor
exports.atualizarProfessor = async (req, res) => {
    const { nome, idade, departamento } = req.body;
    try {
        const professor = await Professores.findByIdAndUpdate(
            req.params.id,
            { nome, idade, departamento },
            { new: true }
        );
        if (!professor) return res.status(404).send('Id não existe');
        res.json(professor);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar professor.' });
    }
};
//adicionar turma para um professor
exports.inserirTurmaProfessor = async (req, res) => {
    try {
        const professor = await Professores.findById(req.params.id);
        if (!professor) {
            return res.status(404).json({ error: 'Erro em busca de  professores.' });
        }
        const novaTurma = req.body;
        professor.turmas.push(novaTurma);
        
        await professor.save();

        res.status(201).json(novaTurma);
    } catch (error) {
        res.status(500).json({ error: error });
    }
    
};
// Remover professor
exports.removerProfessor = async (req, res) => {
    try {
        const professor = await Professores.findByIdAndDelete(req.params.id);
        if (!professor) return res.status(404).send('Id não existe');
        res.json(professor);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao remover professor.' });
    }
};
