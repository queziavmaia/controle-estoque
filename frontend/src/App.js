import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';

import Fornecedores from './pages/Fornecedores';

import Produtos from './pages/Produtos';

import Associacoes from './pages/Associacoes';


function App() {

    return (

        <div>

            <Navbar />

            <Fornecedores />

            <Produtos />

            <Associacoes />

        </div>

    );

}

export default App;