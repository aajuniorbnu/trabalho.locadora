const API = "https://api.franciscosensaulas.com/api/v1/locadora/veiculos";

function listarVeiculos() {
    fetch(API)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao carregar veículos.");
            return res.json();
        })
        .then(lista => {
            const tabela = document.getElementById("tabelaVeiculos");
            tabela.innerHTML = "";

            if (lista.length === 0) {
                tabela.innerHTML = `<tr><td colspan="6">Nenhum veículo cadastrado.</td></tr>`;
                return;
            }

            lista.forEach((veiculo, i) => {
                tabela.innerHTML += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${veiculo.modelo}</td>
                        <td>${veiculo.ano}</td>
                        <td>${veiculo.categoria ? veiculo.categoria.nome : "-"}</td>
                        <td>
                            <span class="status-badge s-${veiculo.status}">
                                ${veiculo.status}
                            </span>
                        </td>
                        <td>
                            <button onclick="editar(${veiculo.id})">✏️</button>
                            <button onclick="deletar(${veiculo.id})">🗑</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => alert("Não foi possível carregar os veículos."));
}

function deletar(id) {
    if (!confirm("Tem certeza que deseja remover este veículo?")) return;

    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) throw new Error();
            alert("Veículo removido com sucesso!");
            listarVeiculos();
        })
        .catch(() => alert("Não foi possível remover o veículo."));
}

function editar(id) {
    window.location.href = `veiculo-form.html?id=${id}`;
}

function novo() {
    window.location.href = `veiculo-form.html`;
}

listarVeiculos();