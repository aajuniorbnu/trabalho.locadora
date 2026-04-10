const API_CLIENTE_BASE_URL = "https://api.franciscosensaulas.com/api/v1/locadora/clientes";
const tbodyClientes = document.getElementById("tbody-clientes");

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
            registrarEventosExcluir();
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
            <div class="actions">
                <a href="clientes-form.html?id=${cliente.id}" 
                   class="btn-icon edit" 
                   title="Editar">
                   ✏️
                </a>

                <button class="btn-icon del botao-excluir" 
                        data-id="${cliente.id}" 
                        title="Remover">
                        🗑️
                </button>
            </div>
        </td>
    `;

    tbodyClientes.appendChild(tr);
}

function registrarEventosExcluir() {
    const botoes = document.getElementsByClassName("botao-excluir");

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].addEventListener("click", confirmarExclusao);
    }
}

function confirmarExclusao(event) {
    const confirmar = confirm("Deseja realmente excluir este cliente?");
    if (!confirmar) return;

    let id = event.target.getAttribute("data-id");

    if (!id && event.target.parentNode) {
        id = event.target.parentNode.getAttribute("data-id");
    }

    excluirCliente(id);
}

function excluirCliente(id) {
    fetch(`${API_CLIENTE_BASE_URL}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao excluir cliente");
        }
        carregarClientes();
    })
    .catch(erro => {
        console.error("Erro ao excluir:", erro);
        alert("Não foi possível excluir o cliente");
    });
}

carregarClientes();

// busca


// tema dark 

function toggleTema() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  
  body.classList.toggle('dark');
  
  const isDark = body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  updateThemeUI(isDark);
}


function updateThemeUI(isDark) {
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  
  if (themeIcon) {
    themeIcon.innerText = isDark ? '☀️' : '🌙';
  }
  
  if (themeText) {
    themeText.innerText = isDark ? 'Modo Claro' : 'Modo Escuro';
  }
}


function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark';
  
  if (isDark) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  
  updateThemeUI(isDark);
}

document.addEventListener('DOMContentLoaded', initTheme);
