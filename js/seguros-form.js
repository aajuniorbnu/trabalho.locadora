const API_LOCADORA_SEGUROS_URL = "https://api.franciscosensaulas.com/api/v1/locadora/clientes";

const formSeguro = document.getElementById("form-seguro");

const campoTipo = document.getElementById("seguro-tipo");
const campoCobertura = document.getElementById("cobertura");
const campoAssistencia = document.getElementById("assistencia");
const campoStatus = document.getElementById("status");
const campoEmail = document.getElementById("email");
const campoObservacao = document.getElementById("observacoes");
const campoContato = document.getElementById("contato-seguradora");
const campoValor = document.getElementById("valor-mes");

const urlParams = new URLSearchParams(window.location.search);
const idParaEditar = urlParams.get("id");


function limparCampos() {
    formSeguro.reset();
}

async function cadastrarSeguro(payload) {
    try {
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
        window.location.href = "/seguros.html";

    } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar seguro.");
    }
}

async function editarSeguro(payload) {
    try {
        const response = await fetch(`${API_LOCADORA_SEGUROS_URL}/${idParaEditar}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });


        alert("Seguro atualizado com sucesso!");
        window.location.href = "/seguros.html";

    } catch (error) {
        console.error(error);
        alert("Erro ao atualizar seguro.");
    }
}

async function buscarSeguroPorId() {
    if (!idParaEditar) return;

    try {
        const response = await fetch(`${API_LOCADORA_SEGUROS_URL}/${idParaEditar}`);
        const data = await response.json();

        campoTipo.value = data.tipo || "";
        campoCobertura.value = data.cobertura || "";
        campoAssistencia.value = data.assistencia || "";
        campoStatus.value = data.status || "";
        campoEmail.value = data.email || "";
        campoObservacao.value = data.observacoes || "";
        campoContato.value = data.contato || "";
        campoValor.value = data.valor_mensal || "";

    } catch (error) {
        console.error("Erro ao buscar seguro:", error);
    }
}


// ---------------- SUBMIT ----------------
formSeguro.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!campoTipo.value || !campoValor.value) {
        alert("Preencha os campos obrigatórios");
        return;
    }

    const payload = {
        tipo: campoTipo.value,
        cobertura: campoCobertura.value,
        assistencia: campoAssistencia.value,
        status: campoStatus.value,
        email: campoEmail.value,
        observacoes: campoObservacao.value,
        contato: campoContato.value,
        valor_mensal: Number(campoValor.value)
    };

    if (idParaEditar) {
        editarSeguro(payload);
    } else {
        cadastrarSeguro(payload);
    }
});
