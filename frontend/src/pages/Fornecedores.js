import { useEffect, useState } from 'react';

import api from '../services/api';

function Fornecedores() {

    // =====================================
    // STATES
    // =====================================

    const [fornecedores, setFornecedores] = useState([]);

    const [editandoId, setEditandoId] = useState(null);

    const [form, setForm] = useState({
        nome_empresa: '',
        cnpj: '',
        endereco: '',
        telefone: '',
        email: '',
        contato_principal: ''
    });


    // =====================================
    // LISTAR FORNECEDORES
    // =====================================

    async function carregarFornecedores() {

        try {

            const response = await api.get(
                '/fornecedores'
            );

            setFornecedores(response.data);

        } catch (error) {

            console.log(error);

            alert(
                'Erro ao carregar fornecedores'
            );

        }

    }

    useEffect(() => {

        carregarFornecedores();

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

            // =====================================
            // EDITAR
            // =====================================

            if (editandoId !== null) {

                await api.put(
                    `/fornecedores/${editandoId}`,
                    form
                );

                alert(
                    'Fornecedor atualizado!'
                );

                setEditandoId(null);

            } else {

                // =====================================
                // CADASTRAR
                // =====================================

                await api.post(
                    '/fornecedores',
                    form
                );

                alert(
                    'Fornecedor cadastrado!'
                );

            }

            // =====================================
            // LIMPAR FORMULÁRIO
            // =====================================

            setForm({
                nome_empresa: '',
                cnpj: '',
                endereco: '',
                telefone: '',
                email: '',
                contato_principal: ''
            });

            // atualizar lista
            carregarFornecedores();

        } catch (error) {

            console.log(error);

            alert(
                'Erro ao salvar fornecedor'
            );

        }

    }


    // =====================================
    // EDITAR FORNECEDOR
    // =====================================

    function editarFornecedor(fornecedor) {

        setForm({
            nome_empresa:
                fornecedor.nome_empresa || '',

            cnpj:
                fornecedor.cnpj || '',

            endereco:
                fornecedor.endereco || '',

            telefone:
                fornecedor.telefone || '',

            email:
                fornecedor.email || '',

            contato_principal:
                fornecedor.contato_principal || ''
        });

        setEditandoId(fornecedor.id);

    }


    // =====================================
    // EXCLUIR FORNECEDOR
    // =====================================

    async function deletarFornecedor(id) {

        const confirmar = window.confirm(
            'Deseja realmente excluir este fornecedor?'
        );

        if (!confirmar) return;

        try {

            await api.delete(
                `/fornecedores/${id}`
            );

            alert(
                'Fornecedor deletado!'
            );

            carregarFornecedores();

        } catch (error) {

            console.log(error);

            alert(
                'Erro ao deletar fornecedor'
            );

        }

    }


    // =====================================
    // JSX
    // =====================================

    return (

        <div className="container mt-5">

            {/* =====================================
                TÍTULO
            ===================================== */}

            <h1 className="mb-4">

                Cadastro de Fornecedor

            </h1>


            {/* =====================================
                FORMULÁRIO
            ===================================== */}

            <form onSubmit={handleSubmit}>

                {/* NOME EMPRESA */}

                <input
                    type="text"
                    name="nome_empresa"
                    className="form-control mb-3"
                    placeholder="Nome da empresa"
                    value={form.nome_empresa}
                    onChange={handleChange}
                />


                {/* CNPJ */}

                <input
                    type="text"
                    name="cnpj"
                    className="form-control mb-3"
                    placeholder="CNPJ"
                    value={form.cnpj}
                    onChange={handleChange}
                />


                {/* ENDEREÇO */}

                <input
                    type="text"
                    name="endereco"
                    className="form-control mb-3"
                    placeholder="Endereço"
                    value={form.endereco}
                    onChange={handleChange}
                />


                {/* TELEFONE */}

                <input
                    type="text"
                    name="telefone"
                    className="form-control mb-3"
                    placeholder="Telefone"
                    value={form.telefone}
                    onChange={handleChange}
                />


                {/* EMAIL */}

                <input
                    type="email"
                    name="email"
                    className="form-control mb-3"
                    placeholder="E-mail"
                    value={form.email}
                    onChange={handleChange}
                />


                {/* CONTATO PRINCIPAL */}

                <input
                    type="text"
                    name="contato_principal"
                    className="form-control mb-3"
                    placeholder="Contato principal"
                    value={form.contato_principal}
                    onChange={handleChange}
                />


                {/* BOTÃO */}

                <button
                    type="submit"
                    className="btn btn-primary"
                >

                    {editandoId !== null
                        ? 'Atualizar'
                        : 'Cadastrar'}

                </button>

            </form>


            <hr />


            {/* =====================================
                LISTA
            ===================================== */}

            <h2 className="mb-4">

                Lista de Fornecedores

            </h2>


            {fornecedores.map((fornecedor) => (

                <div
                    key={fornecedor.id}
                    className="card p-3 mb-3"
                >

                    <h5>
                        {fornecedor.nome_empresa}
                    </h5>

                    <p>
                        <strong>CNPJ:</strong>{' '}
                        {fornecedor.cnpj}
                    </p>

                    <p>
                        <strong>Endereço:</strong>{' '}
                        {fornecedor.endereco}
                    </p>

                    <p>
                        <strong>Telefone:</strong>{' '}
                        {fornecedor.telefone}
                    </p>

                    <p>
                        <strong>E-mail:</strong>{' '}
                        {fornecedor.email}
                    </p>

                    <p>
                        <strong>Contato:</strong>{' '}
                        {fornecedor.contato_principal}
                    </p>


                    {/* BOTÕES */}

                    <div className="mt-2">

                        <button
                            type="button"
                            className="btn btn-warning me-2"
                            onClick={() =>
                                editarFornecedor(
                                    fornecedor
                                )
                            }
                        >

                            Editar

                        </button>


                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() =>
                                deletarFornecedor(
                                    fornecedor.id
                                )
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

export default Fornecedores;