// Carrega o tema salvo ao abrir a página
function carregarTema() {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "dark") {
        document.body.classList.add("dark");
        atualizarBotaoTema();
    }
}

// Alterna entre tema claro e escuro
function toggleTema() {
    document.body.classList.toggle("dark");
    
    // Salva a preferência do tema
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("tema", "dark");
    } else {
        localStorage.setItem("tema", "light");
    }
    
    atualizarBotaoTema();
}

// Atualiza o texto e ícone do botão de tema
function atualizarBotaoTema() {
    const themeIcon = document.getElementById("theme-icon");
    const themeText = document.getElementById("theme-text");
    
    if (document.body.classList.contains("dark")) {
        themeIcon.textContent = "☀️";
        themeText.textContent = "Modo Claro";
    } else {
        themeIcon.textContent = "🌙";
        themeText.textContent = "Modo Escuro";
    }
}

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

// Carrega o tema ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarTema);