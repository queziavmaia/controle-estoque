````markdown
# Sistema de Controle de Estoque

Sistema web desenvolvido para gerenciamento de estoque, fornecedores e associação de produtos utilizando React no frontend, Node.js no backend e banco de dados SQLite.

---

# Tecnologias Utilizadas

## Frontend
- React.js
- Axios
- Bootstrap

## Backend
- Node.js
- Express.js

## Banco de Dados
- SQLite

---

# Funcionalidades

## Fornecedores
- Cadastro de fornecedores
- Listagem de fornecedores
- Edição de fornecedores
- Exclusão de fornecedores

## Produtos
- Cadastro de produtos
- Listagem de produtos
- Edição de produtos
- Exclusão de produtos

## Associação Produto x Fornecedor
- Associar fornecedor a produto
- Visualizar associações
- Desassociar fornecedor do produto

---

# Estrutura do Projeto

```bash
controle-estoque/
│
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── routes/
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   │
│   └── package.json
│
└── README.md
```

---

# Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2. Instalar dependências do Backend

Abra o terminal:

```bash
cd backend
npm install
```

---

## 3. Executar Backend

```bash
node app.js
```

Servidor rodando em:

```bash
http://localhost:3000
```

---

## 4. Instalar dependências do Frontend

Abra outro terminal:

```bash
cd frontend
npm install
```

---

## 5. Executar Frontend

```bash
npm start
```

Frontend rodando em:

```bash
http://localhost:3002
```

---

# Endpoints da API

## Fornecedores

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /fornecedores | Listar fornecedores |
| POST | /fornecedores | Criar fornecedor |
| PUT | /fornecedores/:id | Atualizar fornecedor |
| DELETE | /fornecedores/:id | Excluir fornecedor |

---

## Produtos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /produtos | Listar produtos |
| POST | /produtos | Criar produto |
| PUT | /produtos/:id | Atualizar produto |
| DELETE | /produtos/:id | Excluir produto |

---

## Associações

| Método | Endpoint | Descrição |
|---|---|---|
| POST | /associacoes/associar | Associar fornecedor ao produto |
| GET | /associacoes/produto/:produto_id | Listar associações |
| DELETE | /associacoes/desassociar | Desassociar fornecedor |

---

# Banco de Dados

O sistema utiliza SQLite com as seguintes tabelas:

- fornecedores
- produtos
- produto_fornecedor

---

# Funcionalidades Implementadas

- CRUD completo de fornecedores
- CRUD completo de produtos
- Associação muitos-para-muitos
- Integração frontend/backend
- API REST
- Banco SQLite
- Interface responsiva com Bootstrap

---

# Melhorias Futuras

- Upload de imagem de produto
- Login e autenticação
- Dashboard com métricas
- Controle de estoque mínimo
- Filtro e pesquisa
- Paginação

---

# Autor

Projeto desenvolvido por Quézia Maia.

````
