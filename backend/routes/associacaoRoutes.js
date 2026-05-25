const express = require('express');

const router = express.Router();

const associacaoController = require('../controllers/associacaoController');

// associar
router.post(
    '/associar',
    associacaoController.associarFornecedor
);

// listar fornecedores do produto
router.get(
    '/produto/:produto_id',
    associacaoController.listarFornecedoresProduto
);

// desassociar
router.delete(
    '/desassociar',
    associacaoController.desassociarFornecedor
);

module.exports = router;
