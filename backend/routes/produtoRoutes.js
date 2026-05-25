const express = require('express');

const router = express.Router();

const produtoController = require('../controllers/produtoController');

// criar
router.post('/', produtoController.criarProduto);

// listar
router.get('/', produtoController.listarProdutos);

// atualizar
router.put('/:id', produtoController.atualizarProduto);

// deletar
router.delete('/:id', produtoController.deletarProduto);

module.exports = router;