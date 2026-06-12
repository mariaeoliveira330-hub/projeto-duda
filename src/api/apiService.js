import api from "../services/api";
export const consultarMoto = async()=>{
    const response = await api.get("/motos");
    return response.data
};
export const cadastrarMoto=async ()=> {
    const response = await api.post("/motos");
     return response.data
};
export const atualizarMoto = async(id, moto)=>{
    const response = await api.put("/motos${id}", moto);
    return response.data
};

export const apagarMoto = async(id, moto)=>{
    const response = await api.delete("/motos${id}");
     return response.data
};





export const consultarVeiculo = async()=>{
    const response = await api.get("/veiculos");
    return response.data
};
export const cadastrarVeiculo=async ()=> {
    const response = await api.post("/veiculos");
     return response.data
};
export const atualizarVeiculo = async(id, Veiculo)=>{
    const response = await api.put("/veiculos${id}", veiculo);
    return response.data
};
export const apagarVeiculo = async(id, veiculo)=>{
    const response = await api.delete("/veiculos${id}");
     return response.data
}
