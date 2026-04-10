const API_LOCACAO_BASE_URL = "https://api.franciscosensaulas.com/api/v1/locadora/locacoes";
const API_CLIENTE_BASE_URL = "https://api.franciscosensaulas.com/api/v1/locadora/clientes";

const formLocacoes = document.getElementById("form-locacao");
const campoDataLocacao = document.getElementById("campo-data-inicial");
const campoDataDevolucao = document.getElementById("campo-data-final");
const campoId = document.getElementById("campo-id");
const campoNome = document.getElementById("campo-nome");

// Buscar nome do cliente automaticamente ao digitar o ID
campoId.addEventListener("blur", () => {
    const id = campoId.value;
    if (id) {
        fetch(`${API_CLIENTE_BASE_URL}/${id}`)
            .then(response => {
                if (!response.ok) throw new Error("Cliente não encontrado");
                return response.json();
            })
            .then(cliente => {
                campoNome.value = cliente.nome;
            })
            .catch(() => {
                campoNome.value = "";
                alert("Cliente não encontrado com o ID: " + id);
            });
    }
});


const urlParams = new URLSearchParams(window.location.search);
const idParaEditar = urlParams.get("id");

const botaoLimpar = document.getElementById("btn-limpar");
botaoLimpar.addEventListener("click", limparCampos);

formLocacoes.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!campoDataLocacao.value || !campoDataDevolucao.value || !campoId.value) {
        alert("Preencha os campos obrigatórios (Data Inicial, Data Final e ID do Cliente).");
        return;
    }

    let payload = {
        "dataLocacao": `${campoDataLocacao.value}T00:00:00`,
        "dataDevolucao": `${campoDataDevolucao.value}T00:00:00`,
        "clienteId": parseInt(campoId.value)
        }

    if (idParaEditar === null) {
        cadastrarLocacao(payload);
    } else {
        editarLocacao(payload);
    }
});


function cadastrarLocacao(payload) {
    fetch(API_LOCACAO_BASE_URL, {
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
        alert("Locação cadastrada com sucesso");
    })
    .catch((erro) => {
        alert("Locação ja Cadastrada ");
    });
}

function editarLocacao(payload) {
    fetch(`${API_LOCACAO_BASE_URL}/${idParaEditar}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        alert("Locação atualizada com sucesso");
    })
    .catch(() => {
        alert("Erro ao atualizar Locação");
    });
}

function carregarLocacaoParaEditar() {
    fetch(`${API_LOCACAO_BASE_URL}/${idParaEditar}`)
        .then(response => response.json())
        .then(locacao => {
            campoDataLocacao.value = locacao.dataLocacao.split('T')[0]; // Apenas a data
            campoDataDevolucao.value = locacao.dataDevolucao.split('T')[0]; // Apenas a data
            campoId.value = locacao.clienteId;
            if (locacao.cliente) {
                campoNome.value = locacao.cliente.nome;
            }
        })
        .catch(() => {
            alert("Erro ao carregar Locação");
        });
}

function limparCampos() {
     campoDataLocacao.value = "";
     campoDataDevolucao.value = "";
     campoId.value = "";
     campoNome.value = "";

}

if (idParaEditar !== null) {
    carregarLocacaoParaEditar();
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