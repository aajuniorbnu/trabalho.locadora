const API_PAGAMENTOS_BASE_URL = "https://api.franciscosensaulas.com/api/v1/locadora/pagamentos";
const tbodyPagamentos = document.getElementById("lista-pagamentos");
const searchInput = document.getElementById("search-pagamentos");
const filterStatus = document.getElementById("filter-status");

let listaPagamentos = [];

function carregarPagamentos() {
    tbodyPagamentos.innerHTML = "";

    fetch(API_PAGAMENTOS_BASE_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar pagamentos: ${response.statusText}`);
            }
            return response.json();
        })
        .then(pagamentos => {
            listaPagamentos = pagamentos;
            exibirPagamentos(pagamentos);
        })
        .catch(erro => {
            console.error("Falha na requisição:", erro);
            tbodyPagamentos.innerHTML = `<tr><td colspan="7">Não foi possível carregar os pagamentos.</td></tr>`;
        });
}

function exibirPagamentos(pagamentos) {
    tbodyPagamentos.innerHTML = "";
    
    if (pagamentos.length === 0) {
        tbodyPagamentos.innerHTML = `<tr><td colspan="7" style="text-align: center;">Nenhum pagamento encontrado.</td></tr>`;
        return;
    }
    
    pagamentos.forEach(pagamento => criarLinha(pagamento));
}

function criarLinha(pagamento) {
    const tr = document.createElement("tr");

    // Extrair dados do cliente
    const nomeCliente = pagamento.cliente ? pagamento.cliente.nome : "N/A";
    
    // Formatar valor
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(pagamento.valor);

    // Formatar datas
    const dataVencimentoFormatada = new Date(pagamento.dataVencimento).toLocaleDateString('pt-BR');
    const dataPagamentoFormatada = pagamento.dataPagamento 
        ? new Date(pagamento.dataPagamento).toLocaleDateString('pt-BR')
        : "-";

    // Determinar status
    let status = "pendente";
    let statusIcon = "⏳";
    
    if (pagamento.dataPagamento) {
        status = "pago";
        statusIcon = "✅";
    } else if (new Date(pagamento.dataVencimento) < new Date()) {
        status = "atrasado";
        statusIcon = "❌";
    }

    tr.innerHTML = `
        <td>${pagamento.id}</td>
        <td>${nomeCliente}</td>
        <td>${valorFormatado}</td>
        <td>${dataVencimentoFormatada}</td>
        <td>${dataPagamentoFormatada}</td>
        <td><span class="status ${status}">${statusIcon} ${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
        <td>
            <div class="actions">
                <a href="pagamentos-form.html?id=${pagamento.id}" class="btn-icon edit" title="Editar">✏️</a>
                <button class="btn-icon del" title="Remover" onclick="confirmarExclusao(${pagamento.id})">🗑️</button>
            </div>
        </td>
    `;

    tbodyPagamentos.appendChild(tr);
}

function filtrarPagamentos() {
    let filtrados = listaPagamentos;

    // Filtrar por busca
    const termoBusca = searchInput.value.toLowerCase();
    if (termoBusca) {
        filtrados = filtrados.filter(p => {
            const nomeCliente = p.cliente ? p.cliente.nome.toLowerCase() : "";
            return nomeCliente.includes(termoBusca) || p.id.toString().includes(termoBusca);
        });
    }

    // Filtrar por status
    const statusFiltro = filterStatus.value;
    if (statusFiltro) {
        filtrados = filtrados.filter(p => {
            let status = "pendente";
            if (p.dataPagamento) {
                status = "pago";
            } else if (new Date(p.dataVencimento) < new Date()) {
                status = "atrasado";
            }
            return status === statusFiltro;
        });
    }

    exibirPagamentos(filtrados);
}

function confirmarExclusao(id) {
    const confirmar = confirm("Deseja realmente excluir este pagamento?");
    if (!confirmar) return;

    excluirPagamento(id);
}

function excluirPagamento(id) {
    fetch(`${API_PAGAMENTOS_BASE_URL}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao excluir pagamento");
        }
        alert("Pagamento excluído com sucesso!");
        carregarPagamentos();
    })
    .catch(erro => {
        console.error("Erro ao excluir:", erro);
        alert("Não foi possível excluir o pagamento");
    });
}

// Event listeners para filtros
searchInput.addEventListener("input", filtrarPagamentos);
filterStatus.addEventListener("change", filtrarPagamentos);

carregarPagamentos();

// Tema dark

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

// Carregar tema ao iniciar
(function() {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    updateThemeUI(true);
  }
})();
