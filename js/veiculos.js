const API = "https://api.franciscosensaulas.com/api/v1/locadora/veiculos";

function listarVeiculos() {
  fetch(API)
    .then(res => res.json())
    .then(lista => {

      const tabela = document.getElementById("tabelaVeiculos");
      tabela.innerHTML = "";

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
    });
}


function deletar(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      alert("Removido!");
      listarVeiculos();
    });
}


function editar(id) {
  window.location.href = `/veiculo-form.html?id=${id}`;
}

function novo() {
  window.location.href = `/veiculo-form.html`;
}


listarVeiculos();