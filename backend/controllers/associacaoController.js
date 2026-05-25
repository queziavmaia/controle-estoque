const db = require('../database/database');


// associar fornecedor ao produto
exports.associarFornecedor = (req, res) => {

    const { produto_id, fornecedor_id } = req.body;

    // verificar associação existente
    const verificarSql = `
        SELECT * FROM produto_fornecedor
        WHERE produto_id = ?
        AND fornecedor_id = ?
    `;

    db.get(
        verificarSql,
        [produto_id, fornecedor_id],
        (err, row) => {

            if (err) {

                return res.status(500).json({
                    erro: err.message
                });

            }

            if (row) {

                return res.status(400).json({
                    erro: 'Fornecedor já associado'
                });

            }

            // criar associação
            const sql = `
                INSERT INTO produto_fornecedor (
                    produto_id,
                    fornecedor_id
                )
                VALUES (?, ?)
            `;

            db.run(
                sql,
                [produto_id, fornecedor_id],
                function (err) {

                    if (err) {

                        return res.status(500).json({
                            erro: err.message
                        });

                    }

                    res.status(201).json({
                        mensagem: 'Fornecedor associado com sucesso!',
                        id: this.lastID
                    });

                }
            );

        }
    );

};


// listar fornecedores do produto
exports.listarFornecedoresDoProduto = (req, res) => {

    const { produto_id } = req.params;

    const sql = `
        SELECT fornecedores.*
        FROM fornecedores
        INNER JOIN produto_fornecedor
        ON fornecedores.id = produto_fornecedor.fornecedor_id
        WHERE produto_fornecedor.produto_id = ?
    `;

    db.all(
        sql,
        [produto_id],
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


// desassociar fornecedor do produto
exports.desassociarFornecedor = (req, res) => {

    const { produto_id, fornecedor_id } = req.body;

    const sql = `
        DELETE FROM produto_fornecedor
        WHERE produto_id = ?
        AND fornecedor_id = ?
    `;

    db.run(
        sql,
        [produto_id, fornecedor_id],
        function (err) {

            if (err) {

                return res.status(500).json({
                    erro: err.message
                });

            }

            res.json({
                mensagem: 'Fornecedor desassociado com sucesso!'
            });

        }
    );

};