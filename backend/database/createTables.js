const db = require('./database');

db.serialize(() => {

    // Tabela fornecedores
    db.run(`
        CREATE TABLE IF NOT EXISTS fornecedores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_empresa TEXT NOT NULL,
            cnpj TEXT UNIQUE NOT NULL,
            endereco TEXT NOT NULL,
            telefone TEXT NOT NULL,
            email TEXT NOT NULL,
            contato_principal TEXT NOT NULL
        )
    `);

    // Tabela produtos
    db.run(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            codigo_barras TEXT UNIQUE,
            descricao TEXT NOT NULL,
            quantidade INTEGER,
            categoria TEXT,
            validade TEXT,
            imagem TEXT
        )
    `);

    // Tabela associação
    db.run(`
        CREATE TABLE IF NOT EXISTS produto_fornecedor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            produto_id INTEGER,
            fornecedor_id INTEGER,

            FOREIGN KEY(produto_id) REFERENCES produtos(id),
            FOREIGN KEY(fornecedor_id) REFERENCES fornecedores(id)
        )
    `);

});

console.log('Tabelas criadas com sucesso');
