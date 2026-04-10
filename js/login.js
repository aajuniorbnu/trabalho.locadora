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

const campoSenha = document.getElementById("senha");

const botaoLogin = document.getElementById("entrar");
botaoLogin.addEventListener("click", entrar);

function entrar() {

    const email = campoEmail.value;
    const senha = campoSenha.value;

    if (localStorage.getItem("senhaNova") !== "") {
        if (senha === localStorage.getItem("senhaNova") && email === "batatinha@gmail.com") {
            alert("Login efetuado com sucesso");
            localStorage.setItem("logado", "true");
            const logado = localStorage.getItem("logado");
            window.location.href = 'dashboard.html';
        } else {
            alert("Email ou senha incorretos!");
        }
    } else {
        if (senha === "12345" && email === "batatinha@gmail.com") {
            alert("Login efetuado com sucesso");
            localStorage.setItem("logado", "true");
            const logado = localStorage.getItem("logado");
            window.location.href = 'dashboard.html';
        } else {
            alert("Email ou senha incorretos!");
        }
    }
}

// Carrega o tema ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarTema);