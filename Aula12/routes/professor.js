const express = require('express');
const router = express.Router();
const professoresController = require('../controllers/professoresController');

router.get('/', professoresController.listarProfessores);
router.get('/:id', professoresController.buscarProfessorPorId);
router.post('/', professoresController.inserirTurmaProfessor);
router.put('/:id', professoresController.atualizarProfessor);
router.get('/:id/turmas', professoresController.listarTurmasProfessor);
router.post('/:id/turmas', professoresController.inserirTurmaProfessor);
router.get('/departamento/:departamento', professoresController.listarProfessoresPorDepartamento);
router.delete('/:id', professoresController.removerProfessor);

module.exports = router;
