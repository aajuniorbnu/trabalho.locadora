const formPagamento = document.getElementById("form-pagamento");
const campoIdLocacao = document.getElementById("campo-id-locacao");
const campoCliente = document.getElementById("campo-cliente");
const campoValor = document.getElementById("campo-valor");
const campoDataVencimento = document.getElementById("campo-data-vencimento");
const campoDataPagamento = document.getElementById("campo-data-pagamento");

const urlParams = new URLSearchParams(window.location.search);
const idParaEditar = urlParams.get("id");

const botaoLimpar = document.getElementById("btn-limpar");
botaoLimpar.addEventListener("click", limparCampos);

formPagamento.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!campoIdLocacao.value || !campoCliente.value || !campoValor.value || !campoDataVencimento.value) {
        alert("Preencha os campos obrigatórios");
        return;
    }

    let dadosArmazenados = localStorage.getItem("pagamentos");
    let pagamentos = [];
    if (dadosArmazenados) {
        pagamentos = JSON.parse(dadosArmazenados);
    }

    let novoId = 1;
    if (pagamentos.length > 0) {
        novoId = pagamentos.length + 1;
    }

    let pagamento = {
        id: idParaEditar || novoId,
        idLocacao: campoIdLocacao.value,
        cliente: campoCliente.value,
        valor: campoValor.value,
        dataVencimento: campoDataVencimento.value,
        dataPagamento: campoDataPagamento.value
    };

    if (idParaEditar) {
        let novosPagamentos = [];
        for (let i = 0; i < pagamentos.length; i++) {
            if (pagamentos[i].id == idParaEditar) {
                novosPagamentos.push(pagamento);
            } else {
                novosPagamentos.push(pagamentos[i]);
            }
        }
        pagamentos = novosPagamentos;
        alert("Pagamento atualizado com sucesso");
    } else {
        pagamentos.push(pagamento);
        alert("Pagamento cadastrado com sucesso");
    }

    localStorage.setItem("pagamentos", JSON.stringify(pagamentos));
    window.location.href = "pagamentos.html";
});

function carregarPagamentoParaEditar() {
    let dadosArmazenados = localStorage.getItem("pagamentos");
    let pagamentos = [];
    if (dadosArmazenados) {
        pagamentos = JSON.parse(dadosArmazenados);
    }

    let pagamento = null;
    for (let i = 0; i < pagamentos.length; i++) {
        if (pagamentos[i].id == idParaEditar) {
            pagamento = pagamentos[i];
            break;
        }
    }

    if (pagamento) {
        campoIdLocacao.value = pagamento.idLocacao;
        campoCliente.value = pagamento.cliente;
        campoValor.value = pagamento.valor;
        campoDataVencimento.value = pagamento.dataVencimento;
        campoDataPagamento.value = pagamento.dataPagamento || "";
    }
}

function limparCampos() {
    campoIdLocacao.value = "";
    campoCliente.value = "";
    campoValor.value = "";
    campoDataVencimento.value = "";
    campoDataPagamento.value = "";
}

if (idParaEditar !== null) {
    carregarPagamentoParaEditar();
}

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
