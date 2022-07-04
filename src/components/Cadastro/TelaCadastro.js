import axios from "axios"
import { useContext, useState} from "react"
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';



export default function TelaCadastro(){

    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [senhacorreta, setSenhacorreta] = useState(true);

    let infoCadastro;
    
    const navigate = useNavigate()

    let digitando; 
    console.log("2")
    function confrimacaoDeSenha(e){
        digitando = e.target.value
        for(let i =0; i<senha.length; i++){
            console.log("4")
            if(digitando[i]!==senha[i]){
                setSenhacorreta(false)
            }
        }
        return  digitando
    }

    function verificarDados(){
        console.log(digitando)
        
        if(!nome||!email||!senha||!digitando){
            alert("É necessário que todos os campos sejam preenchidos!")
            return
        }
        if(digitando!==senha){
            alert("Por favor, verifique a sua senha")
            return
        }
        else{
            infoCadastro = {
                "nome": nome,
                "email": email,
                "senha": senha
            }

            CadastrarDadosUser()
        }
    }

    function CadastrarDadosUser(){
        console.log("entrou no cadastrar")

        console.log(infoCadastro)
    
        const POST_URL = 'http://localhost:5000/cadastrar'
        const promiseCadastrar = axios.post(POST_URL, infoCadastro)
    
        promiseCadastrar.then(()=>VoltarParaLogin())
        promiseCadastrar.catch((e)=>alert(`Erro ao cadastrar o usário. ${e.status}`))
    
        
    
    }

    function VoltarParaLogin(){
        navigate('/')
    }
    return(
        <ContainerPrincipal>
        <h1>My Walltet</h1>
        <ContainerInput>
        <input placeholder="Nome" onChange={(e)=>setNome(e.target.value)} value={nome} type="name" required></input>
            <input placeholder="E-mail" onChange={(e)=>setEmail(e.target.value)} value={email} type="email" required></input>
            <input placeholder="Senha" onChange={(e)=>setSenha(e.target.value)} value={senha} type="password" required></input>
            <Confirmacao senhacorreta={senhacorreta} placeholder="Confirme a senha" onChange={(e)=>confrimacaoDeSenha(e)}  type="password" required></Confirmacao>
            <button onClick={verificarDados}>Cadastrar</button>
        </ContainerInput>
        <Login onClick={VoltarParaLogin}> Já tem uma conta? Entre agora!</Login>

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
    font-family: 'Raleway', sans-serif;;
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
    border-color:rgba(0,0,0,0);
}
`
const Confirmacao = styled.input`
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
border-color: ${(props)=>props.senhacorreta=== true? `rgba(0,0,0,0)`: `red`}
`
const Login = styled.button`

font-family: 'Raleway', sans-serif;
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 18px;
color: #FFFFFF;
background-color: rgba(0,0,0,0);
border:0px;
`