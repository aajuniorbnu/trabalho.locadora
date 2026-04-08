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