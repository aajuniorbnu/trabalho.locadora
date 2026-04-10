const API_LOCADORA_VEICULOS_URL = "https://api.franciscosensaulas.com//api/v1/locadora/veiculos";
const tbodyAutores = document.getElementById("tbody-autores");

function carregarVeiculos() {
    fetch(API_LOCADORA_VEICULOS_URL)
        .then(res => res.json())
        .then(lista => {

            let totalVeiculos = lista.length;

            let veiculosAlugados = lista.filter(
                veiculo => veiculo.status === "alugado"
            ).length;

            let veiculosDisponiveis = lista.filter(
                veiculo => veiculo.status === "disponivel"
            ).length;

            document.getElementById("total-veiculos").textContent = totalVeiculos;
            document.getElementById("veiculos-disponiveis").textContent = veiculosDisponiveis;
            document.getElementById("veiculos-alugados").textContent = veiculosAlugados;
        })
        .catch(error => {
            console.error("Erro ao carregar veículos:", error);
        });
}