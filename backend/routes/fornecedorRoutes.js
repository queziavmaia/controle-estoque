const express = require('express');

const router = express.Router();

const fornecedorController = require('../controllers/fornecedorController');

// criar
router.post('/', fornecedorController.criarFornecedor);

// listar
router.get('/', fornecedorController.listarFornecedores);

// atualizar
router.put('/:id', fornecedorController.atualizarFornecedor);

// deletar
router.delete('/:id', fornecedorController.deletarFornecedor);

module.exports = router;
