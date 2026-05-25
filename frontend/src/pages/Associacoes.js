import { useEffect, useState } from 'react';

import api from '../services/api';

function Associacoes() {

    // =====================================
    // STATES
    // =====================================

    const [produtos, setProdutos] = useState([]);

    const [fornecedores, setFornecedores] = useState([]);

    const [associacoes, setAssociacoes] = useState([]);

    const [produtoId, setProdutoId] = useState('');

    const [fornecedorId, setFornecedorId] = useState('');


    // =====================================
    // CARREGAR DADOS
    // =====================================

    useEffect(() => {

        carregarProdutos();

        carregarFornecedores();

    }, []);


    async function carregarProdutos() {

        try {

            const response =
                await api.get('/produtos');

            setProdutos(response.data);

        } catch (error) {

            console.log(error);

        }

    }


    async function carregarFornecedores() {

        try {

            const response =
                await api.get('/fornecedores');

            setFornecedores(response.data);

        } catch (error) {

            console.log(error);

        }

    }


    // =====================================
    // ASSOCIAR
    // =====================================

    async function associar() {

        if (!produtoId || !fornecedorId) {

            alert(
                'Selecione produto e fornecedor'
            );

            return;

        }

        try {

            await api.post(
                '/associacoes/associar',
                {
                    produto_id: produtoId,
                    fornecedor_id: fornecedorId
                }
            );

            alert(
                'Associação realizada!'
            );

            carregarAssociacoes();

        } catch (error) {

            console.log(error);

            alert(
                'Erro ao associar'
            );

        }

    }


    // =====================================
    // LISTAR ASSOCIAÇÕES
    // =====================================

    async function carregarAssociacoes() {

        if (!produtoId) return;

        try {

            const response =
                await api.get(
                    `/associacoes/produto/${produtoId}`
                );

            setAssociacoes(response.data);

        } catch (error) {

            console.log(error);

        }

    }


    // =====================================
    // DESASSOCIAR
    // =====================================

    async function desassociar(
        fornecedor_id
    ) {

        try {

            await api.delete(
                '/associacoes/desassociar',
                {
                    data: {
                        produto_id: produtoId,
                        fornecedor_id
                    }
                }
            );

            alert(
                'Fornecedor removido!'
            );

            carregarAssociacoes();

        } catch (error) {

            console.log(error);

            alert(
                'Erro ao desassociar'
            );

        }

    }


    // =====================================
    // JSX
    // =====================================

    return (

        <div className="container mt-5">

            <h1 className="mb-4">

                Associação Produto / Fornecedor

            </h1>


            {/* SELECT PRODUTO */}

            <select
                className="form-control mb-3"
                value={produtoId}
                onChange={(e) => {

                    setProdutoId(
                        e.target.value
                    );

                }}
            >

                <option value="">

                    Selecione um produto

                </option>

                {produtos.map((produto) => (

                    <option
                        key={produto.id}
                        value={produto.id}
                    >

                        {produto.nome}

                    </option>

                ))}

            </select>


            {/* SELECT FORNECEDOR */}

            <select
                className="form-control mb-3"
                value={fornecedorId}
                onChange={(e) => {

                    setFornecedorId(
                        e.target.value
                    );

                }}
            >

                <option value="">

                    Selecione um fornecedor

                </option>

                {fornecedores.map((fornecedor) => (

                    <option
                        key={fornecedor.id}
                        value={fornecedor.id}
                    >

                        {fornecedor.nome_empresa}

                    </option>

                ))}

            </select>


            {/* BOTÕES */}

            <button
                className="btn btn-primary me-2"
                onClick={associar}
            >

                Associar

            </button>


            <button
                className="btn btn-secondary"
                onClick={carregarAssociacoes}
            >

                Ver Associações

            </button>


            <hr />


            {/* LISTA */}

            <h2>

                Fornecedores associados

            </h2>


            {associacoes.map((item) => (

                <div
                    key={item.id}
                    className="card p-3 mb-3"
                >

                    <h5>
                        {item.nome_empresa}
                    </h5>

                    <p>
                        {item.email}
                    </p>


                    <button
                        className="btn btn-danger"
                        onClick={() =>
                            desassociar(item.id)
                        }
                    >

                        Desassociar

                    </button>

                </div>

            ))}

        </div>

    );

}

export default Associacoes;