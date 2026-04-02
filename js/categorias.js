const API_CAT = "https://api.franciscosensaulas.com/swagger/locadora/";
let editandoId = null;

function salvarCategoria() {
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;

  if (!nome) return alert("Nome obrigatório");

  const metodo = editandoId ? "PUT" : "POST";
  const url = editandoId ? `${API_CAT}/${editandoId}` : API_CAT;

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, descricao })
  })
  .then(() => {
    listarCategorias();
    editandoId = null;
  });
}

function editarCategoria(categoria) {
  document.getElementById("nome").value = categoria.nome;
  document.getElementById("descricao").value = categoria.descricao;
  editandoId = categoria.id;
}

function deletarCategoria(id) {
  fetch(`${API_CAT}/${id}`, { method: "DELETE" })
    .then(() => listarCategorias());
}

function listarCategorias() {
  fetch(API_CAT)
    .then(res => res.json())
    .then(data => {
      const tabela = document.getElementById("tabelaCategorias");
      tabela.innerHTML = "";
      data.forEach(categoria => {
        tabela.innerHTML += `
        <tr>
          <td>${categoria.id}</td>
          <td>${categoria.nome}</td>
          <td>${categoria.descricao}</td>
          <td>
            <button onclick='editarCategoria(${JSON.stringify(categoria)})'>✏️</button>
            <button onclick='deletarCategoria(${categoria.id})'>🗑️</button>
          </td>
        </tr>`;
      });
    });
}

listarCategorias();