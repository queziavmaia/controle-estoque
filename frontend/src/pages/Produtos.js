import { useEffect, useState } from 'react';

import api from '../services/api';

function Produtos() {

    // =====================================
    // STATES
    // =====================================

    const [produtos, setProdutos] = useState([]);

    const [editandoId, setEditandoId] = useState(null);

    const [form, setForm] = useState({
        nome: '',
        codigo_barras: '',
        descricao: '',
        quantidade: '',
        categoria: '',
        validade: ''
    });


    // =====================================
    // LISTAR PRODUTOS
    // =====================================

    async function carregarProdutos() {

        try {

            const response = await api.get(
                '/produtos'
            );

            setProdutos(response.data);

        } catch (error) {

            console.log(error);

            alert(
                'Erro ao carregar produtos'
            );

        }

    }

    useEffect(() => {

        carregarProdutos();

    }, []);


    // =====================================
    // HANDLE INPUT
    // =====================================

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }


    // =====================================
    // CADASTRAR / EDITAR
    // =====================================

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            // EDITAR
            if (editandoId !== null) {

                await api.put(
                    `/produtos/${editandoId}`,
                    form
                );

                alert(
                    'Produto atualizado!'
                );

                setEditandoId(null);

            } else {

                // CADASTRAR
                await api.post(
                    '/produtos',
                    form
                );

                alert(
                    'Produto cadastrado!'
                );

            }

            // limpar formulário
            setForm({
                nome: '',
                codigo_barras: '',
                descricao: '',
                quantidade: '',
                categoria: '',
                validade: ''
            });

            // atualizar lista
            carregarProdutos();

        } catch (error) {

            console.log(error);

            alert(
                'Erro ao salvar produto'
            );

        }

    }


    // =====================================
    // EDITAR PRODUTO
    // =====================================

    function editarProduto(produto) {

        setForm({
            nome:
                produto.nome || '',

            codigo_barras:
                produto.codigo_barras || '',

            descricao:
                produto.descricao || '',

            quantidade:
                produto.quantidade || '',

            categoria:
                produto.categoria || '',

            validade:
                produto.validade || ''
        });

        setEditandoId(produto.id);

    }


    // =====================================
    // EXCLUIR PRODUTO
    // =====================================

    async function deletarProduto(id) {

        const confirmar = window.confirm(
            'Deseja realmente excluir este produto?'
        );

        if (!confirmar) return;

        try {

            await api.delete(
                `/produtos/${id}`
            );

            alert(
                'Produto deletado!'
            );

            carregarProdutos();

        } catch (error) {

            console.log(error);

            alert(
                'Erro ao deletar produto'
            );

        }

    }


    // =====================================
    // JSX
    // =====================================

    return (

        <div className="container mt-5">

            <h1 className="mb-4">

                Cadastro de Produto

            </h1>


            {/* FORMULÁRIO */}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="nome"
                    className="form-control mb-3"
                    placeholder="Nome do produto"
                    value={form.nome}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="codigo_barras"
                    className="form-control mb-3"
                    placeholder="Código de barras"
                    value={form.codigo_barras}
                    onChange={handleChange}
                />


                <textarea
                    name="descricao"
                    className="form-control mb-3"
                    placeholder="Descrição"
                    value={form.descricao}
                    onChange={handleChange}
                />


                <input
                    type="number"
                    name="quantidade"
                    className="form-control mb-3"
                    placeholder="Quantidade"
                    value={form.quantidade}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="categoria"
                    className="form-control mb-3"
                    placeholder="Categoria"
                    value={form.categoria}
                    onChange={handleChange}
                />


                <input
                    type="date"
                    name="validade"
                    className="form-control mb-3"
                    value={form.validade}
                    onChange={handleChange}
                />


                <button
                    type="submit"
                    className="btn btn-success"
                >

                    {editandoId !== null
                        ? 'Atualizar'
                        : 'Cadastrar'}

                </button>

            </form>


            <hr />


            {/* LISTA */}

            <h2 className="mb-4">

                Lista de Produtos

            </h2>


            {produtos.map((produto) => (

                <div
                    key={produto.id}
                    className="card p-3 mb-3"
                >

                    <h5>
                        {produto.nome}
                    </h5>

                    <p>
                        <strong>Código:</strong>{' '}
                        {produto.codigo_barras}
                    </p>

                    <p>
                        <strong>Descrição:</strong>{' '}
                        {produto.descricao}
                    </p>

                    <p>
                        <strong>Quantidade:</strong>{' '}
                        {produto.quantidade}
                    </p>

                    <p>
                        <strong>Categoria:</strong>{' '}
                        {produto.categoria}
                    </p>

                    <p>
                        <strong>Validade:</strong>{' '}
                        {produto.validade}
                    </p>


                    <div className="mt-2">

                        <button
                            type="button"
                            className="btn btn-warning me-2"
                            onClick={() =>
                                editarProduto(produto)
                            }
                        >

                            Editar

                        </button>


                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() =>
                                deletarProduto(produto.id)
                            }
                        >

                            Excluir

                        </button>

                    </div>

                </div>

            ))}

        </div>

    );

}

export default Produtos;