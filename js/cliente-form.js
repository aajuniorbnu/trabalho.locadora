const API_CLIENTE_BASE_URL = "https://api.franciscosensaulas.com/api/v1/locadora/clientes";

const formCliente = document.getElementById("form-cliente" );

const campoNome = document.getElementById("campo-nome");
const campoCpf = document.getElementById("campo-cpf");
const campoDataNascimento = document.getElementById("campo-data-nascimento");
const campoEmail = document.getElementById("campo-email");
const campoTelefone = document.getElementById("campo-telefone");

formCliente.addEventListener("submit", (event) => {
    event.preventDefault();


    if (!campoNome.value || !campoCpf.value) {
        alert("Preencha os campos obrigatórios (Nome e CPF).");
        return;
    }

    let payload = {
        "nome": campoNome.value,
        "cpf": campoCpf.value,
        "dataNascimento": campoDataNascimento.value,
        "email": campoEmail.value,
        "telefone": campoTelefone.value
    };

    cadastrarCliente(payload);
});

function cadastrarCliente(payload) {
    fetch(API_CLIENTE_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message || 'Erro na requisição') });
        }
        return response.json();
    })
    .then(data => {
        console.log("Cliente cadastrado com sucesso:", data);
        alert("Cliente cadastrado com sucesso!");

    })
    .catch(erro => {
        console.error("Falha ao cadastrar cliente:", erro);
        alert(`Não foi possível cadastrar o cliente: ${erro.message}`);
    });
}
