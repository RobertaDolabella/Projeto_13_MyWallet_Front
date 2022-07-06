import { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import UserContext from "../UserContext"
import { useContext } from "react"
export function GerarTransacoes({setLista}) {
    const userLocalSerializada = localStorage.getItem("user")
    const userLocal = JSON.parse(userLocalSerializada)

    const [listaTransacoes, setListaTransacoes] = useState([])
    const [itemDeletado, setItemDeletado] = useState()
    const [saldo, setSaldo] = useState()


    const { controle, setControle } = useContext(UserContext)

    const { token } = userLocal

    const autorizacao = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const URLAPI = 'https://my-wallet-projeto-13-driven.herokuapp.com/mywallet'

    useEffect(() => {
        const promiseGet = axios.get(URLAPI,autorizacao)
        promiseGet.then((response) =>gerarLista(response))
        promiseGet.catch((response) => alert(`Código do erro${response.error}`))
    }, [controle])
function gerarLista(response){
    setListaTransacoes(response.data)
    if(listaTransacoes.length===0){
        setLista(true)
    }
    if(listaTransacoes.length!==0){
        setLista(false)
    }
    calcularSaldo()
}
console.log(listaTransacoes)
    function excluirTransacao(element) {

        setItemDeletado(element.id_transacao)
      
        const promiseDelete = axios.delete(`${URLAPI}/${element.id_transacao}`,autorizacao)
        promiseDelete.then((response)=>gerarLista(response))
        promiseDelete.catch(()=>alert("Não foi possivel cancelar a sua transação :/"))

    }
    function calcularSaldo(){
        let aux= 0
        listaTransacoes.forEach((element)=> {
            if(element.tipo===false){
                aux = element.valorNumero + aux
            }
            if(element.tipo===true){
                aux = aux - (element.valorNumero)
            }
            })     
            console.log(aux)
            setSaldo(aux)
            setControle(true)
  }
    return (

        <ContainerTransacoes>
            {listaTransacoes.map((element) =>
                <div>
                    <Tempo>{element.tempo}</Tempo>
                    <Descricao>{element.descricao}</Descricao>
                    <Valor debito={element.tipo}>{element.valorTexto}</Valor>
                    <button onClick={()=> excluirTransacao(element)}>
                        <ion-icon name="close"></ion-icon>
                        </button>
                </div>
            )}
            <Saldo>
                <h2>Saldo</h2>
                <h2>{saldo}</h2>
            </Saldo>
        </ContainerTransacoes>
    )
}

const ContainerTransacoes = styled.div`
    position: relative;
    padding:22px 24px 0px 24px;
    width:75vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    border-radius: 5px;
    
    div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    button{
        width:4vw;
        border: 0px;
        background: rgba(0,0,0,0);
    }`

    const Tempo = styled.h4`
    width: 10vw;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;`

const Descricao = styled.h3`
    width: 25vw;
    margin-left:6px;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;`

const Valor = styled.h3`
    width: 15vw;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: right;
    color: ${(props)=>props.debito=== true? ` #C70000`: `#03AC00`}`

    const Saldo = styled.div`
    position: absolute;
    width:75vw;
    bottom: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    `

