import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import UserContext from '../UserContext'
import { GerarTransacoes } from "./GerarTransacoes.js";
import SemLista from "./SemLIsta";

export default function TelaInicial() {

    const userLocalSerializada = localStorage.getItem("user")
    const userLocal = JSON.parse(userLocalSerializada)

    const { token, nome } = userLocal
    const [lista, setLista] =useState(true)
    const navigate = useNavigate()

    const autorizacao = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const POST_URL = 'https://my-wallet-projeto-13-driven.herokuapp.com/logout'


    function IrParaNovaEntrada() {
        navigate("/entrada")
    }

    function IrParaNovaSaida() {
        navigate("/saida")
    }

    function logout(){
        const serelizaçãoAPIInfo = JSON.stringify({})
        localStorage.setItem("user", {})
        navigate("/")
    }

    return (
        <ContainerPrincipal>
            <Cabecalho>
                <h1>Olá, {nome}</h1>
                <button onClick={logout}><ion-icon name="exit-outline"></ion-icon></button>
            </Cabecalho>
         < GerarTransacoes />
            <ContainerButton>
                <Adicionar onClick={IrParaNovaEntrada}>
                    <Botao>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <h3>Nova<br></br>Entrada</h3>
                    </Botao>
                </Adicionar>
                <Adicionar onClick={IrParaNovaSaida}>
                    <Botao>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <h3>Nova<br></br> Saída</h3>
                    </Botao>
                </Adicionar>
            </ContainerButton>

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
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
}
`
const Cabecalho = styled.div`
    box-sizing: border-box;
    width:100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
    align-items: center;
    padding: 25px 24px 0px 24px;
    ion-icon{
        font-size:28px;
        color: #FFFFFF;
    }
    button{
        border: 0px;
        background: rgba(0,0,0,0);
    }
`


const ContainerButton = styled.div`
box-sizing: border-box;
width:100vw;
height: 25vh;
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 14px 24px 16px 24px;
`



const Adicionar = styled.button`
    width:42vw;
    height: 14vh;
    display: flex;
    background: #A328D6;
    border-radius: 5px;
    border: 0px;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;

}`


const Botao = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: flex-start;
    text-align: left;
    padding-top:12px;
    padding-left: 12px;
    ion-icon{
        font-size:24px


`

// padding-bottom: 16px;
// padding-left: 24px;
// padding-right: 24px;`