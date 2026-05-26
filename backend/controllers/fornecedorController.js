const db = require("../database/database");

const listarFornecedores = (req, res) => {
  db.all("SELECT * FROM fornecedores", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);
  });
};

const cadastrarFornecedor = (req, res) => {
  const {
    nome_empresa,
    cnpj,
    endereco,
    telefone,
    email,
    contato_principal
  } = req.body;

  db.run(
    `
    INSERT INTO fornecedores
    (nome_empresa, cnpj, endereco, telefone, email, contato_principal)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      nome_empresa,
      cnpj,
      endereco,
      telefone,
      email,
      contato_principal
    ],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        mensagem: "Fornecedor cadastrado com sucesso",
        id: this.lastID
      });
    }
  );
};

const editarFornecedor = (req, res) => {
  const { id } = req.params;

  const {
    nome_empresa,
    cnpj,
    endereco,
    telefone,
    email,
    contato_principal
  } = req.body;

  db.run(
    `
    UPDATE fornecedores
    SET
      nome_empresa = ?,
      cnpj = ?,
      endereco = ?,
      telefone = ?,
      email = ?,
      contato_principal = ?
    WHERE id = ?
    `,
    [
      nome_empresa,
      cnpj,
      endereco,
      telefone,
      email,
      contato_principal,
      id
    ],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensagem: "Fornecedor atualizado com sucesso"
      });
    }
  );
};

const excluirFornecedor = (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM fornecedores WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensagem: "Fornecedor excluído com sucesso"
      });
    }
  );
};

const buscarFornecedorPorId = (req, res) => {
  const { id } = req.params;

  db.get(
    "SELECT * FROM fornecedores WHERE id = ?",
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!row) {
        return res.status(404).json({
          mensagem: "Fornecedor não encontrado"
        });
      }

      res.json(row);
    }
  );
};

module.exports = {
  listarFornecedores,
  cadastrarFornecedor,
  editarFornecedor,
  excluirFornecedor,
  buscarFornecedorPorId
};