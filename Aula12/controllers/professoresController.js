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
        const departamento = req.params.departamento.toLowerCase(); 

        const professores = await Professores.find({
            $expr: { $eq: [{ $toLower: "$departamento" }, departamento] } 
        });

        res.json(professores);
    } catch (err) {
        console.error("Erro ao buscar professores por departamento:", err); 
        res.status(500).json({ error: 'Erro em buscar professores por departamento.' });
    }
};

// buscar professor por ID
exports.buscarProfessorPorId = async (req, res) => {
    try {
        const professor = await Professores.findOne({ id: req.params.id });
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
        const professor = await Professores.findOneAndUpdate(
            { id: req.params.id }, // Busca pelo campo "id"
            { nome, idade, departamento },
            { new: true } // Retorna o documento atualizado
        );
        if (!professor) return res.status(404).send('Id não existe');
        res.json(professor);
    } catch (err) {
        console.error("Erro ao atualizar professor:", err); // Log do erro
        res.status(500).json({ error: 'Erro ao atualizar professor.' });
    }
};
//adicionar turma para um professor
exports.inserirTurmaProfessor = async (req, res) => {
    try {
        const professor = await Professores.findOne({ id: req.params.id }); 
        
        if (!professor) {
            return res.status(404).json({ error: 'Id do professor não existe.' });
        }

        const novaTurma = req.body;
        professor.turmas.push(novaTurma);
        
        await professor.save();

        res.status(201).json(novaTurma);
    } catch (error) {
        console.error("Erro ao inserir turma:", error); 
        res.status(500).json({ error: 'Erro ao inserir turma.' });
    }
};
// Remover professor
exports.removerProfessor = async (req, res) => {
    try {
        const professor = await Professores.findOneAndDelete(req.params.id);
        if (!professor) return res.status(404).send('Id não existe');
        res.json(professor);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao remover professor.' });
    }
};
