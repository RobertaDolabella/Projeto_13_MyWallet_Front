import axios from "axios"
import {useContext, useState } from "react"
import {useNavigate } from "react-router-dom"
import styled from 'styled-components';
import UserContext from "../UserContext";

export default function TelaNovaEntrada() {

    const [valor, setValor] = useState()
    const [descricao, setDescricao] = useState()

    const { controle, setControle } = useContext(UserContext)

    const navigate = useNavigate()

    const POST_URL = 'https://git.heroku.com/my-wallet-projeto-13-driven.git/adicionar'

    const userLocalSerializada = localStorage.getItem("user")
    const userLocal = JSON.parse(userLocalSerializada)
    const { token } = userLocal

    const autorizacao = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    function AdicionarCredito(event) {
        event.preventDefault();
        if(!descricao||!valor){
            alert("Todos os campos devem estar preenchidos")
            return
        }
        const body={
            descricao: descricao,
            valor: valor,
            tipo: false
        }

        const promisePostCredito = axios.post(POST_URL, body, autorizacao)
        promisePostCredito.then(()=>adicionado())
    }

    function adicionado(){
setControle(false)
navigate("/mywallet")
    }
    return (
        <ContainerPrincipal>
            <Cabecalho>
                <h1>Nova entrada</h1>
            </Cabecalho>
            <div>
            <form>
                <input placeholder=" Valor" onChange={(e) => setValor(e.target.value)}></input>
                <input placeholder=" Descrição" onChange={(e) => setDescricao(e.target.value)}></input>
                <button type="submit" onClick={AdicionarCredito}>
                    Salvar entrada
                </button>
            </form>
            </div>
         
        </ContainerPrincipal>
    )
}

const ContainerPrincipal = styled.div`
    width:100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #8C11BE;

h1{
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
}
div{
    padding:22px 24px 0px 24px;
    width:75vw;
    display: flex;
    flex-direction: column;
    justify-content: center;

}
input{
    margin-bottom:14px;
    width: 100%;
    height:6vh;
    background: #FFFFFF;
    border-radius: 5px;
    border: 0px;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;

}
button{

    margin-bottom:14px;
    width: 100%;
    height:6vh;
    background:#A328D6;
    border-radius: 5px;
    border: 0px;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
}
`
const Cabecalho = styled.div`
width:100vw;
display: flex;
flex-direction: row;
justify-content: space-around; `
