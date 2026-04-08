const campoEmail = document.getElementById("email");
const campoCpf = document.getElementById("cpf");
const campoSenhaNova = document.getElementById("senha-nova");
const campoConfirmarSenha = document.getElementById("senha-confirmar");

const botaoRedefinirSenha = document.getElementById("redefinir-senha");
botaoRedefinirSenha.addEventListener("click", redefinirSenha);

function redefinirSenha() {
    const email = campoEmail.value;
    const senhaNova = campoSenhaNova.value;
    const senhaRepetida = campoConfirmarSenha.value;

    if (localStorage.getItem("senhaNova") !== "") {
        if (email !== "batatinha@gmail.com") {
            alert("Email não cadastrado");
            return;
        } else if (senhaNova !== senhaRepetida || senhaNova === "") {
            alert("A confirmação de senha esta diferente da senha nova");
            return;
        } else if (senhaNova === localStorage.getItem("senhaNova")) {
            alert("A nova senha não deve ser igual a anterior")
        } else {
            alert("Senha alterada com sucesso!");
            localStorage.setItem("senhaNova", senhaNova)
            window.location.href = "login.html"
        }
    } else {
        if (email !== "batatinha@gmail.com") {
            alert("Email não cadastrado");
            return;
        } else if (senhaNova !== senhaRepetida || senhaNova === "") {
            alert("A confirmação de senha esta diferente da senha nova");
            return;
        } else if (senhaNova === "12345") {
            alert("A nova senha não deve ser igual a anterior")
        } else {
            alert("Senha alterada com sucesso!");
            localStorage.setItem("senhaNova", senhaNova)
            window.location.href = "login.html"
        }
    }
}