const API_LOCADORA_SEGUROS_URL = "https://api.franciscosensaulas.com/api/v1/locadora/clientes";

const tabela = document.getElementById("tabela-seguros");


async function listarSeguros() {
    try {
        const response = await fetch(API_LOCADORA_SEGUROS_URL);

        if (!response.ok) {
            throw new Error("Erro ao buscar seguros");
        }

        const seguros = await response.json();

        tabela.innerHTML = "";

        seguros.forEach(seguro => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${seguro.tipo || ""}</td>
                <td>R$ ${seguro.valor_mensal || 0}</td>
                <td>${seguro.status || ""}</td>
                <td>${seguro.cobertura || ""}</td>
                <td>${seguro.assistencia || ""}</td>
                <td>${seguro.observacoes || ""}</td>
                <td>
                    <button class="btn-icon" onclick="editar(${seguro.id})">✏️</button>
                    <button class="btn-icon" onclick="excluir(${seguro.id})">🗑️</button>
                </td>
            `;

            tabela.appendChild(linha);
        });

    } catch (error) {
        console.error("Erro ao listar seguros:", error);
        alert("Erro ao carregar seguros");
    }
}


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


function editar(id) {
    window.location.href = `seguros-form.html?id=${id}`;
}


listarSeguros();