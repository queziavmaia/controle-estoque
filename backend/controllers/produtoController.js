const db = require("../database/database");

const listarProdutos = (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);
  });
};

const cadastrarProduto = (req, res) => {
  const {
    nome,
    codigo_barras,
    descricao,
    quantidade,
    categoria,
    validade,
    imagem
  } = req.body;

  db.run(
    `
    INSERT INTO produtos
    (nome, codigo_barras, descricao, quantidade, categoria, validade, imagem)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      nome,
      codigo_barras,
      descricao,
      quantidade,
      categoria,
      validade,
      imagem
    ],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        mensagem: "Produto cadastrado com sucesso",
        id: this.lastID
      });
    }
  );
};

const editarProduto = (req, res) => {
  const { id } = req.params;

  const {
    nome,
    codigo_barras,
    descricao,
    quantidade,
    categoria,
    validade,
    imagem
  } = req.body;

  db.run(
    `
    UPDATE produtos
    SET
      nome = ?,
      codigo_barras = ?,
      descricao = ?,
      quantidade = ?,
      categoria = ?,
      validade = ?,
      imagem = ?
    WHERE id = ?
    `,
    [
      nome,
      codigo_barras,
      descricao,
      quantidade,
      categoria,
      validade,
      imagem,
      id
    ],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensagem: "Produto atualizado com sucesso"
      });
    }
  );
};

const excluirProduto = (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM produtos WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensagem: "Produto excluído com sucesso"
      });
    }
  );
};

const buscarProdutoPorId = (req, res) => {
  const { id } = req.params;

  db.get(
    "SELECT * FROM produtos WHERE id = ?",
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!row) {
        return res.status(404).json({
          mensagem: "Produto não encontrado"
        });
      }

      res.json(row);
    }
  );
};

module.exports = {
  listarProdutos,
  cadastrarProduto,
  editarProduto,
  excluirProduto,
  buscarProdutoPorId
};
