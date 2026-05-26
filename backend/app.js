const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("./database/createTables");

const {
  listarProdutos,
  cadastrarProduto,
  editarProduto,
  excluirProduto,
  buscarProdutoPorId
} = require("./controllers/produtoController");

const {
  listarFornecedores,
  cadastrarFornecedor,
  editarFornecedor,
  excluirFornecedor,
  buscarFornecedorPorId
} = require("./controllers/fornecedorController");

app.get("/", (req, res) => {
  res.send("API Controle de Estoque funcionando!");
});


// PRODUTOS

app.get("/produtos", listarProdutos);

app.get("/produtos/:id", buscarProdutoPorId);

app.post("/produtos", cadastrarProduto);

app.put("/produtos/:id", editarProduto);

app.delete("/produtos/:id", excluirProduto);


// FORNECEDORES

app.get("/fornecedores", listarFornecedores);

app.get("/fornecedores/:id", buscarFornecedorPorId);

app.post("/fornecedores", cadastrarFornecedor);

app.put("/fornecedores/:id", editarFornecedor);

app.delete("/fornecedores/:id", excluirFornecedor);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});