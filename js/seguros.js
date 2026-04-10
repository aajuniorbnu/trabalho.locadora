const API_LOCADORA_SEGUROS_URL = "https://api.franciscosensaulas.com/api/v1/locadora/clientes";

const tabela = document.getElementById("tabela-seguros");

// ---------------- LISTAR ----------------
async function listarSeguros() {
    try {
        const response = await fetch(API_LOCADORA_SEGUROS_URL);
        const seguros = await response.json();

        tabela.innerHTML = "";

        seguros.forEach(seguro => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${seguro.tipo}</td>
                <td>R$ ${seguro.valor_mensal}</td>
                <td>${seguro.status}</td>
                <td>${seguro.cobertura_terceiros}</td>
                <td>${seguro.assistencia_24h}</td>
                <td>
                    <button onclick="editar(${seguro.id})">✏️</button>
                    <button onclick="excluir(${seguro.id})">🗑️</button>
                </td>
            `;

            tabela.appendChild(linha);
        });

    } catch (error) {
        console.error("Erro ao listar seguros:", error);
    }
}

// ---------------- EXCLUIR ----------------
async function excluir(id) {
    const confirmar = confirm("Deseja excluir este seguro?");

    if (!confirmar) return;

    try {
        const response = await fetch(`${API_LOCADORA_SEGUROS_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir");
        }

        alert("Seguro excluído com sucesso!");
        listarSeguros();

    } catch (error) {
        console.error(error);
        alert("Erro ao excluir seguro.");
    }
}

// ---------------- EDITAR ----------------
function editar(id) {
    window.location.href = `form-seguro.html?id=${id}`;
}

// ---------------- INICIALIZAÇÃO ----------------
listarSeguros();