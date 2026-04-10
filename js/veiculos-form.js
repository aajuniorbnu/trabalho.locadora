const API_VEICULOS = "https://api.franciscosensaulas.com/api/v1/locadora/veiculos";
const API_CATEGORIAS = "https://api.franciscosensaulas.com/api/v1/locadora/categorias";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const botaoSalvar = document.getElementById("btn-salvar");
botaoSalvar.addEventListener("click", salvar);


function salvar() {

    const payload = {
        modelo: document.getElementById("modelo").value,
        placa: document.getElementById("placa").value,
        ano: Number(document.getElementById("ano").value),
        categoriaId: Number(document.getElementById("categoriaId").value),
        combustivel: document.getElementById("combustivel").value,
        status: document.getElementById("status").value,
      
    };

    if (!payload.modelo || !payload.ano) {
        alert("Preencha os campos obrigatórios");
        return;
    }

    if (id) {
        editar(payload);
    } else {
        cadastrar(payload);
    }
}


function cadastrar(payload) {
    fetch(API_VEICULOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(() => {
        alert("Cadastrado!");
        voltar();
    })
    .catch(err => {
        console.error(err);
        alert("Erro ao cadastrar");
    });
}


function editar(payload) {
    fetch(`${API_VEICULOS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(() => {
        alert("Atualizado!");
        voltar();
    });
}

function carregarVeiculo() {
    fetch(`${API_VEICULOS}/${id}`)
    .then(res => res.json())
    .then(veiculo => {
        document.getElementById("modelo").value = veiculo.modelo;
        document.getElementById("placa").value = veiculo.placa || "";
        document.getElementById("ano").value = veiculo.ano;
        document.getElementById("categoriaId").value = veiculo.categoriaId;
        document.getElementById("combustivel").value = veiculo.combustivel || "";
        document.getElementById("status").value = veiculo.status || "";
        document.getElementById("km").value = veiculo.km || 0;
    });
}

function carregarCategorias() {
    fetch(API_CATEGORIAS)
    .then(res => res.json())
    .then(categorias => {
        const select = document.getElementById("categoriaId");

        select.innerHTML = `<option value="">Selecione...</option>`;

        categorias.forEach(categoria => {
            select.innerHTML += `<option value="${categoria.id}">${categoria.nome}</option>`;
        });
    });
}

function voltar() {
    window.location.href = "/veiculos.html";
}


carregarCategorias();
if (id) carregarVeiculo();