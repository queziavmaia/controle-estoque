const express = require('express');

const cors = require('cors');

const app = express();


// =====================================
// DATABASE
// =====================================

require('./database/database');


// =====================================
// CONTROLLERS
// =====================================

const fornecedorController = require(
    './controllers/fornecedorController'
);

const produtoController = require(
    './controllers/produtoController'
);

const associacaoController = require(
    './controllers/associacaoController'
);


// =====================================
// MIDDLEWARES
// =====================================

app.use(cors());

app.use(express.json());


// =====================================
// ROTAS FORNECEDORES
// =====================================

// criar fornecedor
app.post(
    '/fornecedores',
    fornecedorController.criarFornecedor
);

// listar fornecedores
app.get(
    '/fornecedores',
    fornecedorController.listarFornecedores
);

// atualizar fornecedor
app.put(
    '/fornecedores/:id',
    fornecedorController.atualizarFornecedor
);

// deletar fornecedor
app.delete(
    '/fornecedores/:id',
    fornecedorController.deletarFornecedor
);


// =====================================
// ROTAS PRODUTOS
// =====================================

// criar produto
app.post(
    '/produtos',
    produtoController.criarProduto
);

// listar produtos
app.get(
    '/produtos',
    produtoController.listarProdutos
);

// atualizar produto
app.put(
    '/produtos/:id',
    produtoController.atualizarProduto
);

// deletar produto
app.delete(
    '/produtos/:id',
    produtoController.deletarProduto
);


// =====================================
// ROTAS ASSOCIAÇÕES
// =====================================

// associar fornecedor ao produto
app.post(
    '/associacoes/associar',
    associacaoController.associarFornecedor
);

// listar fornecedores associados ao produto
app.get(
    '/associacoes/produto/:produto_id',
    associacaoController.listarFornecedoresDoProduto
);

// desassociar fornecedor do produto
app.delete(
    '/associacoes/desassociar',
    associacaoController.desassociarFornecedor
);


// =====================================
// TESTE API
// =====================================

app.get('/', (req, res) => {

    res.send(
        'API Controle de Estoque funcionando!'
    );

});


// =====================================
// INICIAR SERVIDOR
// =====================================

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );

});