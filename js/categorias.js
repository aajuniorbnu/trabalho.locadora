const API_CAT = "https://api.franciscosensaulas.com/api/v1/locadora/categorias";
let editandoId = null;

function salvarCategoria() {
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;

  if (!nome) {
    alert("Nome obrigatório");
    return;
  }

  const metodo = editandoId ? "PUT" : "POST";
  const url = editandoId ? `${API_CAT}/${editandoId}` : API_CAT;

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, descricao })
  })
  .then(() => {
    listarCategorias();
    limparCampos();
    mostrarMensagem("Categoria salva com sucesso!", "sucesso");
  });
}

function editarCategoria(id) {
  fetch(`${API_CAT}/${id}`)
    .then(res => res.json())
    .then(categoria => {
      document.getElementById("nome").value = categoria.nome;
      document.getElementById("descricao").value = categoria.descricao;
      editandoId = categoria.id;
    });
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
      let html = "";

      data.forEach(categoria => {
        html += `
        <tr>
          <td>${categoria.id}</td>
          <td>${categoria.nome}</td>
          <td>${categoria.descricao}</td>
          <td>
            <button class="btn-icon" onclick="editarCategoria(${categoria.id})">✏️</button>
            <button class="btn-icon" onclick="deletarCategoria(${categoria.id})">🗑️</button>
          </td>
        </tr>`;
      });      tabela.innerHTML = html;
    });
}

function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("descricao").value = "";
  editandoId = null;
}

function mostrarMensagem(texto, tipo) {
  const div = document.getElementById("mensagem");
  div.innerHTML = `<div class="alerta alerta-${tipo}">${texto}</div>`;

  setTimeout(() => {
    div.innerHTML = "";
  }, 3000);
}

listarCategorias();
