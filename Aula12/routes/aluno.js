const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.get('/', alunoController.obterTodos);
router.get('/:ra', alunoController.obterPorRa);
router.get('/:ra/disciplinas', alunoController.obterDisciplinasPorRa);

module.exports = router;
