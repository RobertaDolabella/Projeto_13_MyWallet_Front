import { useState } from "react"
import styled from 'styled-components';
import axios from "axios";
import { GerarTransacoes } from "../GerarTransacoes";
import { useNavigate } from "react-router-dom";


export default function TelaLogin() {

    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    const navigate = useNavigate();

    const userInfo = { email, senha }
    const POST_URL = 'https://git.heroku.com/my-wallet-projeto-13-driven.git/login'

    function enviarDadosUser() {


        const promiseLogin = axios.post(POST_URL,userInfo)
        promiseLogin.then((response) => gerarHeaders(response))
        promiseLogin.catch((response) => alert(response.status))
    }

    function gerarHeaders(response) {

        const APIInfo = response.data

        const serelizaçãoAPIInfo = JSON.stringify(APIInfo)
        localStorage.setItem("user", serelizaçãoAPIInfo)

        IrParaTelaInicial()

    }


function IrParaTelaInicial() {

        navigate("/mywallet")

}

function IrParaTelaCadastrar() {
    console.log("entrou na funcao ir para tela cadastro")

    console.log("leu onavigate")

    navigate('/cadastro')

}

return (
    <ContainerPrincipal>
        <h1>My Walltet</h1>
        <ContainerInput>
            <input placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email} type="email" required></input>
            <input placeholder="Senha" onChange={(e) => setSenha(e.target.value)} value={senha} type="password" required></input>
            <button onClick={enviarDadosUser}>Entrar</button>
        </ContainerInput>
        <Cadastrar onClick={IrParaTelaCadastrar}>Primeira vez? Cadastre-se!</Cadastrar>

    </ContainerPrincipal>
)
}

const ContainerPrincipal = styled.div`
    width:100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #8C11BE;

h1{
    font-family: 'Saira Stencil One', cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom:24px;
}
`
const ContainerInput = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

input{
    width:100%;
    height:46px;
    background: #FFFFFF;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom:13px;
}

button{
    width:100%;
    height:46px;
    text-align: center;
    margin-bottom:36px;
    background: #A328D6;
    border-radius: 5px;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
    border:0px;
}
`
const Cadastrar = styled.button`

font-family: 'Raleway', sans-serif;
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 18px;
color: #FFFFFF;
background-color: rgba(0,0,0,0);
border:0px;
`