const API_LOCADORA_SEGUROS_URL = "https://api.franciscosensaulas.com/api/v1/locadora/clientes";

const formSeguro = document.getElementById("form-seguro");

const campoTipo = document.getElementById("seguro-tipo");
const campoCobertura = document.getElementById("cobertura");
const campoAssistencia = document.getElementById("assistencia");
const campoStatus = document.getElementById("status");
const campoEmail = document.getElementById("email");
const campoObservacao = document.getElementById("observacao");
const campoContato = document.getElementById("contato-seguradora");
const campoValor = document.getElementById("valor-mes");

const botaoLimpar = document.getElementById("btn-limpar");

const urlParams = new URLSearchParams(window.location.search);
const idParaEditar = urlParams.get("id");

// ---------------- LIMPAR CAMPOS ----------------
function limparCampos() {
    campoTipo.value = "";
    campoCobertura.value = "";
    campoAssistencia.value = "";
    campoStatus.value = "";
    campoEmail.value = "";
    campoObservacao.value = "";
    campoContato.value = "";
    campoValor.value = "";
}

// ---------------- CADASTRAR ----------------
async function cadastrarSeguro(payload) {
    fetch(API_LOCADORA_SEGUROS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar seguro");
    }

    alert("Seguro cadastrado com sucesso!");
    limparCampos();

} catch (error) {
    console.error(error);
    alert("Erro ao cadastrar seguro.");
}


// ---------------- EDITAR ----------------
async function editarSeguro(payload) {
    try {
        const response = await fetch(`${API_LOCADORA_SEGUROS_URL}/${idParaEditar}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Erro ao editar seguro");
        }

        alert("Seguro atualizado com sucesso!");

    } catch (error) {
        console.error(error);
        alert("Erro ao atualizar seguro.");
    }
}

// ---------------- BUSCAR PARA EDIÇÃO ----------------
async function buscarSeguroPorId() {
    if (!idParaEditar) return;

    try {
        const response = await fetch(`${API_LOCADORA_SEGUROS_URL}/${idParaEditar}`);
        const data = await response.json();

        campoTipo.value = data.tipo || "";
        campoCobertura.value = data.cobertura_terceiros || "";
        campoAssistencia.value = data.assistencia_24h || "";
        campoStatus.value = data.status || "";
        campoEmail.value = data.email || "";
        campoObservacao.value = data.observacoes || "";
        campoContato.value = data.contato_seguradora || "";
        campoValor.value = data.valor_mensal || "";

    } catch (error) {
        console.error("Erro ao buscar seguro:", error);
    }
}

// ---------------- SUBMIT DO FORM ----------------
formSeguro.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!campoTipo.value || !campoValor.value) {
        alert("Preencha os campos obrigatórios (Tipo e Valor).");
        return;
    }

    const payload = {
        tipo: campoTipo.value,
        cobertura_terceiros: campoCobertura.value,
        assistencia_24h: campoAssistencia.value,
        status: campoStatus.value,
        email: campoEmail.value,
        observacoes: campoObservacao.value,
        contato_seguradora: campoContato.value,
        valor_mensal: Number(campoValor.value)
    };

    if (idParaEditar) {
        editarSeguro(payload);
    } else {
        cadastrarSeguro(payload);
    }
});

// ---------------- EVENTOS ----------------
if (botaoLimpar) {
    botaoLimpar.addEventListener("click", limparCampos);
}

// ---------------- INICIALIZAÇÃO ----------------
buscarSeguroPorId();