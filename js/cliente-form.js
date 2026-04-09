const API_CLIENTE_BASE_URL = "https://api.franciscosensaulas.com/api/v1/locadora/clientes";

const formCliente = document.getElementById("form-cliente");
const campoNome = document.getElementById("campo-nome");
const campoCpf = document.getElementById("campo-cpf");

const urlParams = new URLSearchParams(window.location.search);
const idParaEditar = urlParams.get("id");

const botaoLimpar = document.getElementById("btn-limpar");
botaoLimpar.addEventListener("click", limparCampos);

formCliente.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!campoNome.value || !campoCpf.value) {
        alert("Preencha os campos obrigatórios (Nome e CPF).");
        return;
    }

    let payload = {
        "nome": campoNome.value,
        "cpf": formatCpfForApi(campoCpf.value)
    };

    if (idParaEditar === null) {
        cadastrarCliente(payload);
    } else {
        editarCliente(payload);
    }
});

function formatCpfForApi(cpf) {
    return cpf.replace(/\D/g, "");
}

function cadastrarCliente(payload) {
    fetch(API_CLIENTE_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(async (response) => {
        const text = await response.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch {
            data = text;
        }

        if (!response.ok) {
            throw new Error(data?.message || JSON.stringify(data));
        }

        return data;
    })
    .then(() => {
        alert("Cliente cadastrado com sucesso");
    })
    .catch((erro) => {
        alert("Cliente ja Cadastrado ");
    });
}

function editarCliente(payload) {
    fetch(`${API_CLIENTE_BASE_URL}/${idParaEditar}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        alert("Cliente atualizado com sucesso");
    })
    .catch(() => {
        alert("Erro ao atualizar cliente");
    });
}

function carregarClienteParaEditar() {
    fetch(`${API_CLIENTE_BASE_URL}/${idParaEditar}`)
        .then(response => response.json())
        .then(cliente => {
            campoNome.value = cliente.nome;
            campoCpf.value = cliente.cpf;
        })
        .catch(() => {
            alert("Erro ao carregar cliente");
        });
}

function limparCampos() {
    campoNome.value = "";
    campoCpf.value = "";
}

if (idParaEditar !== null) {
    carregarClienteParaEditar();
}


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
