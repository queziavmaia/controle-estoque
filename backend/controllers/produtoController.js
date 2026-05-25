const db = require('../database/database');


// =====================================
// CRIAR PRODUTO
// =====================================

exports.criarProduto = (req, res) => {

    const {
        nome,
        codigo_barras,
        descricao,
        quantidade,
        categoria,
        validade,
        imagem
    } = req.body;

    // validar campos obrigatórios
    if (
        !nome ||
        !codigo_barras ||
        !descricao ||
        !quantidade ||
        !categoria
    ) {

        return res.status(400).json({
            erro: 'Preencha todos os campos obrigatórios'
        });

    }

    // verificar código duplicado
    const verificarSql = `
        SELECT * FROM produtos
        WHERE codigo_barras = ?
    `;

    db.get(
        verificarSql,
        [codigo_barras],
        (err, row) => {

            if (err) {

                return res.status(500).json({
                    erro: err.message
                });

            }

            if (row) {

                return res.status(400).json({
                    erro:
                        'Código de barras já cadastrado'
                });

            }

            // inserir produto
            const sql = `
                INSERT INTO produtos (
                    nome,
                    codigo_barras,
                    descricao,
                    quantidade,
                    categoria,
                    validade,
                    imagem
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            db.run(
                sql,
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

                        return res.status(500).json({
                            erro: err.message
                        });

                    }

                    res.status(201).json({
                        mensagem:
                            'Produto cadastrado com sucesso!',
                        id: this.lastID
                    });

                }
            );

        }
    );

};


// =====================================
// LISTAR PRODUTOS
// =====================================

exports.listarProdutos = (req, res) => {

    const sql = `
        SELECT * FROM produtos
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
// ATUALIZAR PRODUTO
// =====================================

exports.atualizarProduto = (req, res) => {

    const { id } = req.params;

    const {
        nome,
        codigo_barras,
        descricao,
        quantidade,
        categoria,
        validade
    } = req.body;

    const sql = `
        UPDATE produtos
        SET
            nome = ?,
            codigo_barras = ?,
            descricao = ?,
            quantidade = ?,
            categoria = ?,
            validade = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [
            nome,
            codigo_barras,
            descricao,
            quantidade,
            categoria,
            validade,
            id
        ],
        function (err) {

            if (err) {

                return res.status(500).json({
                    erro: err.message
                });

            }

            res.json({
                mensagem:
                    'Produto atualizado com sucesso!'
            });

        }
    );

};


// =====================================
// DELETAR PRODUTO
// =====================================

exports.deletarProduto = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM produtos
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
                mensagem:
                    'Produto deletado com sucesso!'
            });

        }
    );

};
