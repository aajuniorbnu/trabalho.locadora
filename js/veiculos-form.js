const API_VEICULOS = "https://api.franciscosensaulas.com/api/v1/locadora/veiculos";
const API_CATEGORIAS = "https://api.franciscosensaulas.com/api/v1/locadora/categorias";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

document.getElementById("btn-salvar").addEventListener("click", salvar);

function salvar() {
    const payload = {
        modelo: document.getElementById("modelo").value.trim(),
        placa: document.getElementById("placa").value.trim(),
        ano: Number(document.getElementById("ano").value),
        categoriaId: Number(document.getElementById("categoriaId").value),
        combustivel: document.getElementById("combustivel").value,
        status: document.getElementById("status").value,
        km: Number(document.getElementById("km").value || 0)
    };

    if (!payload.modelo || !payload.ano || !payload.categoriaId) {
        alert("Preencha os campos obrigatórios: modelo, ano e categoria.");
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
    .then(res => {
        if (!res.ok) return res.json().then(err => Promise.reject(err));
        return res.json();
    })
    .then(() => {
        alert("Veículo cadastrado com sucesso!");
        voltar();
    })
    .catch(err => {
        console.error("Erro ao cadastrar:", err);
        alert("Erro ao cadastrar: " + (err.message || err.error || JSON.stringify(err)));
    });
}

function editar(payload) {
    fetch(`${API_VEICULOS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) return res.json().then(err => Promise.reject(err));
        return res.json();
    })
    .then(() => {
        alert("Veículo atualizado com sucesso!");
        voltar();
    })
    .catch(err => {
        console.error("Erro ao editar:", err);
        alert("Erro ao atualizar: " + (err.message || err.error || JSON.stringify(err)));
    });
}

function carregarCategorias() {
    return fetch(API_CATEGORIAS)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao carregar categorias.");
            return res.json();
        })
        .then(categorias => {
            const select = document.getElementById("categoriaId");
            const options = categorias.map(c =>
                `<option value="${c.id}">${c.nome}</option>`
            ).join("");
            select.innerHTML = `<option value="">Selecione...</option>` + options;
        })
        .catch(err => {
            console.error("Erro ao carregar categorias:", err);
            alert("Não foi possível carregar as categorias.");
        });
}

function carregarVeiculo() {
    fetch(`${API_VEICULOS}/${id}`)
        .then(res => {
            if (!res.ok) throw new Error("Veículo não encontrado.");
            return res.json();
        })
        .then(veiculo => {
            document.getElementById("modelo").value = veiculo.modelo || "";
            document.getElementById("placa").value = veiculo.placa || "";
            document.getElementById("ano").value = veiculo.ano || "";
            document.getElementById("categoriaId").value = veiculo.categoriaId || "";
            document.getElementById("combustivel").value = veiculo.combustivel || "";
            document.getElementById("status").value = veiculo.status || "";
            document.getElementById("km").value = veiculo.km || 0;
        })
        .catch(err => {
            console.error("Erro ao carregar veículo:", err);
            alert("Não foi possível carregar os dados do veículo.");
        });
}

function voltar() {
    window.location.href = "/veiculos.html";
}

carregarCategorias().then(() => {
    if (id) carregarVeiculo();
});