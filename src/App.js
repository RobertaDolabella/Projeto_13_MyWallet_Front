import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './UserContext';
import TelaLogin from './components/Login/TelaLogin'
import TelaCadastro from './components/Cadastro/TelaCadastro'
import TelaInicial from './components/TelaInicial';
import TelaNovaEntrada from './components/TelaNovaEntrada';
import TelaNovaSaida from './components/TelaNovaSaida';
import TelaEditar from './components/TelaEditar';
import { useContext, useState } from 'react';   

function App() {

  const [cadastroUser, setCadastroUser] = useState({ nome: "nome",
  email: "email",
  senha: "senha"});

  const [controle, setControle] = useState(true)

  return (
    <BrowserRouter>

    <UserContext.Provider value={{cadastroUser, setCadastroUser,controle, setControle}}>

    <Routes>
      <Route path="/" element={< TelaLogin />}/>
      <Route path="/cadastro" element={< TelaCadastro />}/>
      <Route path="/mywallet" element={< TelaInicial />}/>
      <Route path="/entrada" element={< TelaNovaEntrada />}/>
      <Route path="/saida" element={< TelaNovaSaida />}/>
      <Route path="/editar" element={< TelaEditar />}/>
    </Routes>

    </UserContext.Provider>

    </BrowserRouter>

  )
}

export default App;
