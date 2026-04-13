const express = require('express');
const router = express.Router();

const ClientesController = require('../controllers/clientesController');

router.get('/', ClientesController.listarTodos);

router.get('/nome/:nome', ClientesController.buscarPorNome);

router.get('/:id', ClientesController.buscarPorId);

router.post('/', ClientesController.criar);

router.put('/:id', ClientesController.atualizar);

router.delete('/:id', ClientesController.deletar);

module.exports = router;
