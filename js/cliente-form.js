const API_CLIENTE_BASE_URL = "https://api.franciscosensaulas.com/api/v1/locadora/clientes";

const formCliente = document.getElementById("form-cliente");
const campoNome = document.getElementById("campo-nome");
const campoCpf = document.getElementById("campo-cpf");
const campoEmail = document.getElementById("campo-email");


formCliente.addEventListener("submit", (event) => {
    console.log("🔥 SUBMIT DISPARADO");
    
    event.preventDefault();

    if (!campoNome.value || !campoCpf.value) {
        alert("Preencha os campos obrigatórios (Nome e CPF).");
        return;
    }

    let payload = {
        "nome": campoNome.value,
        "cpf": formatCpfForApi(campoCpf.value),
    };
    
    cadastrarCliente(payload);
});

function formatCpfForApi(cpf) {
    return cpf.replace(/\D/g, "");
}

function cadastrarCliente(payload) {
    console.log("📤 Enviando:", payload);

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
            console.error("🔴 ERRO API:", data);
            throw new Error(data?.message || JSON.stringify(data));
        }

        return data;
    })
    .then(() => {
        alert("Cliente cadastrado com sucesso");
    })
    .catch((erro) => {
        console.error("❌ ERRO:", erro);
        alert("Erro: " + erro.message);
    });
}