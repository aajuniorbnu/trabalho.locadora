const API_VEI = "https://api.franciscosensaulas.com/api/v1/locadora/veiculos";
let editandoVeiculo = null;

function carregarCategoriasSelect() {
  fetch(API_CAT)
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("categoriaId");
      select.innerHTML = "";
      data.forEach(categoria => {
        select.innerHTML += `<option value='${categoria.id}'>${categoria.nome}</option>`;
      });
    });
}

function salvarVeiculo() {
  const modelo = document.getElementById("modelo").value;
  const ano = document.getElementById("ano").value;
  const categoriaId = document.getElementById("categoriaId").value;

  if (!modelo || !ano) 
    return alert("Preencha os campos");

  const metodo = editandoVeiculo ? "PUT" : "POST";
  const url = editandoVeiculo ? `${API_VEI}/${editandoVeiculo}` : API_VEI;

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modelo, ano, categoriaId })
  })
  .then(() => {
    listarVeiculos();
    editandoVeiculo = null;
  });
}

function editarVeiculo(v) {
  document.getElementById("modelo").value = v.modelo;
  document.getElementById("ano").value = v.ano;
  document.getElementById("categoriaId").value = v.categoriaId;
  editandoVeiculo = v.id;
}

function deletarVeiculo(id) {
  fetch(`${API_VEI}/${id}`, { method: "DELETE" })
    .then(() => listarVeiculos());
}

function listarVeiculos() {
  fetch(API_VEI)
    .then(res => res.json())
    .then(data => {
      const tabela = document.getElementById("tabelaVeiculos");
      tabela.innerHTML = "";
      data.forEach(veiculo => {
        tabela.innerHTML += `
        <tr>
          <td>${veiculo.id}</td>
          <td>${veiculo.modelo}</td>
          <td>${veiculo.ano}</td>
          <td>${veiculo.categoria?.nome}</td>
          <td>
            <button onclick='editarVeiculo(${JSON.stringify(veiculo)})'>✏️</button>
            <button onclick='deletarVeiculo(${veiculo.id})'>🗑️</button>
          </td>
        </tr>`;
      });
    });
}

carregarCategoriasSelect();
listarVeiculos();
