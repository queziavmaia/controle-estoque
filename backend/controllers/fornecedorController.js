const db = require('../database/database');


// =====================================
// CRIAR FORNECEDOR
// =====================================

exports.criarFornecedor = (req, res) => {

    const {
        nome_empresa,
        cnpj,
        endereco,
        telefone,
        email,
        contato_principal
    } = req.body;

    // validar campos
    if (
        !nome_empresa ||
        !cnpj ||
        !endereco ||
        !telefone ||
        !email ||
        !contato_principal
    ) {

        return res.status(400).json({
            erro: 'Preencha todos os campos'
        });

    }

    // verificar CNPJ duplicado
    const verificarSql = `
        SELECT * FROM fornecedores
        WHERE cnpj = ?
    `;

    db.get(
        verificarSql,
        [cnpj],
        (err, row) => {

            if (err) {

                return res.status(500).json({
                    erro: err.message
                });

            }

            if (row) {

                return res.status(400).json({
                    erro: 'CNPJ já cadastrado'
                });

            }

            // inserir fornecedor
            const sql = `
                INSERT INTO fornecedores (
                    nome_empresa,
                    cnpj,
                    endereco,
                    telefone,
                    email,
                    contato_principal
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.run(
                sql,
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

                        return res.status(500).json({
                            erro: err.message
                        });

                    }

                    res.status(201).json({
                        mensagem: 'Fornecedor cadastrado com sucesso!',
                        id: this.lastID
                    });

                }
            );

        }
    );

};


// =====================================
// LISTAR FORNECEDORES
// =====================================

exports.listarFornecedores = (req, res) => {

    const sql = `
        SELECT * FROM fornecedores
    `;

    db.all(
        sql,
        [],
        (err, rows) => {

            if (err) {

                return res.status(500).json({
                    erro: err.message
                });

            }

            res.json(rows);

        }
    );

};


// =====================================
// ATUALIZAR FORNECEDOR
// =====================================

exports.atualizarFornecedor = (req, res) => {

    const { id } = req.params;

    const {
        nome_empresa,
        cnpj,
        endereco,
        telefone,
        email,
        contato_principal
    } = req.body;

    const sql = `
        UPDATE fornecedores
        SET
            nome_empresa = ?,
            cnpj = ?,
            endereco = ?,
            telefone = ?,
            email = ?,
            contato_principal = ?
        WHERE id = ?
    `;

    db.run(
        sql,
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

                return res.status(500).json({
                    erro: err.message
                });

            }

            res.json({
                mensagem: 'Fornecedor atualizado com sucesso!'
            });

        }
    );

};


// =====================================
// DELETAR FORNECEDOR
// =====================================

exports.deletarFornecedor = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM fornecedores
        WHERE id = ?
    `;

    db.run(
        sql,
        [id],
        function (err) {

            if (err) {

                return res.status(500).json({
                    erro: err.message
                });

            }

            res.json({
                mensagem: 'Fornecedor deletado com sucesso!'
            });

        }
    );

};