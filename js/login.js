const campoEmail = document.getElementById("email");

const campoSenha = document.getElementById("senha");

const botaoLogin = document.getElementById("entrar");
botaoLogin.addEventListener("click", entrar);

function entrar() {

    const email = campoEmail.value;
    const senha = campoSenha.value;

    if (senha === "12345" && email === "batatinha@gmail.com") {
        alert("Login efetuado com sucesso");
        window.location.href = 'veiculos.html';
        document.getElementById("fazer-login").style.display = "none"
        document.getElementById("login-feito").style.display = "flex"
    } else {
        alert("Email ou senha incorretos!");
    }

}