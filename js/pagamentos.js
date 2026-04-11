const tbodyPagamentos = document.getElementById("lista-pagamentos");

let listaPagamentos = [];

function carregarPagamentos() {
    tbodyPagamentos.innerHTML = "";
    
    let dadosArmazenados = localStorage.getItem("pagamentos");
    if (dadosArmazenados) {
        listaPagamentos = JSON.parse(dadosArmazenados);
    } else {
        listaPagamentos = [];
    }
    
    for (let i = 0; i < listaPagamentos.length; i++) {
        criarLinha(listaPagamentos[i]);
    }
    registrarEventosExcluir();
}

function criarLinha(pagamento) {
    const tr = document.createElement("tr");

    const dataVencimentoFormatada = new Date(pagamento.dataVencimento).toLocaleDateString('pt-BR');
    let dataPagamentoFormatada = "-";
    if (pagamento.dataPagamento) {
        dataPagamentoFormatada = new Date(pagamento.dataPagamento).toLocaleDateString('pt-BR');
    }

    let status = "Não pago";
    if (pagamento.dataPagamento) {
        status = "Pago";
    }

    tr.innerHTML = `
        <td>${pagamento.id}</td>
        <td>${pagamento.cliente}</td>
        <td>R$ ${pagamento.valor}</td>
        <td>${dataVencimentoFormatada}</td>
        <td>${dataPagamentoFormatada}</td>
        <td>${status}</td>
        <td>
            <div class="actions">
                <a href="pagamentos-form.html?id=${pagamento.id}" class="btn-icon edit" title="Editar">✏️</a>
                <button class="btn-icon del botao-excluir" data-id="${pagamento.id}" title="Remover">🗑️</button>
            </div>
        </td>
    `;

    tbodyPagamentos.appendChild(tr);
}

function registrarEventosExcluir() {
    const botoes = document.getElementsByClassName("botao-excluir");

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].addEventListener("click", confirmarExclusao);
    }
}

function confirmarExclusao(event) {
    const confirmar = confirm("Deseja realmente excluir este pagamento?");
    if (!confirmar) return;

    let id = event.target.getAttribute("data-id");

    if (!id && event.target.parentNode) {
        id = event.target.parentNode.getAttribute("data-id");
    }

    excluirPagamento(id);
}

function excluirPagamento(id) {
    let dadosArmazenados = localStorage.getItem("pagamentos");
    let pagamentos = [];
    if (dadosArmazenados) {
        pagamentos = JSON.parse(dadosArmazenados);
    }
    
    let novosPagamentos = [];
    for (let i = 0; i < pagamentos.length; i++) {
        if (pagamentos[i].id != id) {
            novosPagamentos.push(pagamentos[i]);
        }
    }
    
    localStorage.setItem("pagamentos", JSON.stringify(novosPagamentos));
    carregarPagamentos();
}

carregarPagamentos();

function toggleTema() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  
  body.classList.toggle('dark');
  
  const isDark = body.classList.contains('dark');
  let tema = 'light';
  if (isDark) {
    tema = 'dark';
  }
  localStorage.setItem('theme', tema);
  
  updateThemeUI(isDark);
}

function updateThemeUI(isDark) {
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  
  if (themeIcon) {
    if (isDark) {
      themeIcon.innerText = '☀️';
    } else {
      themeIcon.innerText = '🌙';
    }
  }
  
  if (themeText) {
    if (isDark) {
      themeText.innerText = 'Modo Claro';
    } else {
      themeText.innerText = 'Modo Escuro';
    }
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
