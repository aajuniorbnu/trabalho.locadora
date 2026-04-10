const API_LOCADORA_VEICULOS_URL = "https://api.franciscosensaulas.com/api/v1/locadora/veiculos";
const API_LOCADORA_CATEGORIAS_URL = "https://api.franciscosensaulas.com/api/v1/locadora/categorias";



async function carregarCategorias() {
    try {
        const response = await fetch(API_LOCADORA_CATEGORIAS_URL);
        const categorias = await response.json();

        const container = document.getElementById("lista-categorias");
        container.innerHTML = "";

        let html = "";

        categorias.forEach(categoria => {
            html += `
                <div class="card-item">
                    <h3> Modelo: ${categoria.nome}</h3>
                    <p> ${categoria.id}</p>
                </div>
            `;
        });

        container.innerHTML = html;

    } catch (error) {
        console.error("Erro ao carregar categorias:", error);
    }
}

async function carregarVeiculos() {
    try {
        const response = await fetch(API_LOCADORA_VEICULOS_URL);
        const veiculos = await response.json();

        document.getElementById("total-veiculos").textContent = veiculos.length;

    } catch (error) {
        console.error("Erro ao carregar veículos:", error);
    }
}


function listarCategorias() {
    fetch(API_LOCADORA_CATEGORIAS_URL)
        .then(res => res.json())
        .then(data => {
            const tabela = document.getElementById("tabelaCategorias");

            let html = "";

            data.forEach(categoria => {
                html += `
                <tr>
                    <td>${categoria.id}</td>
                    <td>${categoria.nome}</td>
                    <td>${categoria.descricao || "-"}</td>
                </tr>`;
            });

            tabela.innerHTML = html;
        })
        .catch(error => {
            console.error("Erro ao listar categorias:", error);
        });
}


carregarCategorias();
carregarVeiculos();
listarCategorias();