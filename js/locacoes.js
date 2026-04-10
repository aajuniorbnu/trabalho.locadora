const API_LOCACOES_BASE_URL = "https://api.franciscosensaulas.com/api/v1/locadora/locacoes";
const tbodyLocacoes = document.getElementById("lista-locacoes");

function carregarLocacoes() {
    tbodyLocacoes.innerHTML = "";

    fetch(API_LOCACOES_BASE_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar locações: ${response.statusText}`);
            }
            return response.json();
        })
        .then(locacoes => {
            locacoes.forEach(locacao => criarLinha(locacao));
        })
        .catch(erro => {
            console.error("Falha na requisição:", erro);
            tbodyLocacoes.innerHTML = `<tr><td colspan="6">Não foi possível carregar as locações.</td></tr>`;
        });
}

function criarLinha(locacao) {
    const tr = document.createElement("tr");

    // Extrair dados do cliente (objeto aninhado retornado pela API)
    const nomeCliente = locacao.cliente ? locacao.cliente.nome : "N/A";
    const cpfCliente = locacao.cliente ? locacao.cliente.cpf : "N/A";

    // Formatar datas para exibição (DD/MM/AAAA)
    const dataLocacaoFormatada = new Date(locacao.dataLocacao).toLocaleDateString('pt-BR');
    const dataDevolucaoFormatada = new Date(locacao.dataDevolucao).toLocaleDateString('pt-BR');

    tr.innerHTML = `
          <td>${locacao.id}</td>
          <td>${nomeCliente}</td>
          <td>${cpfCliente}</td>
          <td>${dataLocacaoFormatada}</td>
          <td>${dataDevolucaoFormatada}</td>
          <td>
              <div class="actions">
                  <a href="locacoes-form.html?id=${locacao.id}" class="btn-icon edit" title="Editar">✏️</a>
                  <button class="btn-icon del" title="Remover" onclick="confirmarExclusao(${locacao.id})">🗑️</button>
              </div>
          </td>
    `;

    tbodyLocacoes.appendChild(tr);
}

function confirmarExclusao(id) {
    const confirmar = confirm("Deseja realmente excluir esta locação?");
    if (!confirmar) return;

    excluirLocacao(id);
}

function excluirLocacao(id) {
    fetch(`${API_LOCACOES_BASE_URL}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao excluir locação");
        }
        alert("Locação excluída com sucesso!");
        carregarLocacoes();
    })
    .catch(erro => {
        console.error("Erro ao excluir:", erro);
        alert("Não foi possível excluir a locação");
    });
}

carregarLocacoes();

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
