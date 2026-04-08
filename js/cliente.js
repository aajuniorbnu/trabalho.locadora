const API_CLIENTE_BASE_URL = "https://api.franciscosensaulas.com/api/v1/locadora/clientes";
const tbodyClientes = document.getElementById("tbody-clientes" );

function carregarClientes() {
    tbodyClientes.innerHTML = ""; 
    fetch(API_CLIENTE_BASE_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar clientes: ${response.statusText}`);
            }
            return response.json();
        })
        .then(clientes => {
            clientes.forEach(cliente => criarLinha(cliente));
        })
        .catch(erro => {
            console.error("Falha na requisição:", erro);
            tbodyClientes.innerHTML = `<tr><td colspan="4">Não foi possível carregar os clientes.</td></tr>`;
        });
}

function criarLinha(cliente) {
    const tr = document.createElement("tr");
    
    tr.innerHTML = `
        <td>${cliente.id}</td>
        <td>${cliente.nome}</td>
        <td>${cliente.cpf}</td>
        <td>
            <div class="acoes">
                <button class="btn-editar">✏️</button>
                <button class="btn-excluir">🗑️</button>
            </div>
        </td>
    `;
    tbodyClientes.appendChild(tr);
}

carregarClientes();
