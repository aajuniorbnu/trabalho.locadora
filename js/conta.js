const botaoSair = document.getElementById("sair");
botaoSair.addEventListener("click", sair);

function sair() {
    const confirma = confirm("Deseja realmente sair da conta?")
    if (confirma) {
      localStorage.removeItem("logado");
      window.location.href = "dashboard.html"  
    } 
}