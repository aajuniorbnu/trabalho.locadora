const API_LOCADORA_CLIENTES_URL ="https://api.franciscosensaulas.com//api/v1/locadora/clientes";
const tbodyAutores = document.getElementById("tbody-autores");
function carregarAutores() {
    fetch(API_LOCADORA_CLIENTES_URL)
        .then(dados => {
            return dados.json();
        })
        .then(autores => {
            for (let i = 0; i < autores.length; i++) {
                const autor = autores[i];
                criarLinha(autor);

            }
        })
}
