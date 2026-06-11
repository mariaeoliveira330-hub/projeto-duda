import { useNavigate } from "react-router-dom"

export const NotFound=()=>{
    const navigate = useNavigate();

    return (
        <div>
            <h1>404</h1>
            <p>Página não encontrada</p>
            <button onClick={()=> navigate("login")} >Voltar para o início</button>
    </div>
    )
}