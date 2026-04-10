const API_LOCADORA_CLIENTES_URL = "https://api.franciscosensaulas.com//api/v1/locadora/veiculos";
const tbodyAutores = document.getElementById("tbody-autores");


function carregarveiculos(lista) {
    fetch(API_LOCADORA_CLIENTES_URL)
        .then(dados => {
            return dados.json();
        })
        let totalVeiculos = lista.API_LOCADORA_CLIENTES_URL.length;
        let veiculosDisponiveis = lista.API_LOCADORA_CLIENTES_URL.filter(veiculo => veiculo.status === "disponivel").length;
        let veiculosAlugados = lista.API_LOCADORA_CLIENTES_URL.filter(veiculo => veiculo.status === "alugado").length;

        document.getElementById("total-veiculos").textContent = totalVeiculos;
        document.getElementById("veiculos-disponiveis").textContent = veiculosDisponiveis;
        document.getElementById("veiculos-alugados").textContent = veiculosAlugados;
}
