function add() {
    let listaDias = [];
  
    let nome = document.getElementById("nome");
    let dias = document.getElementsByClassName("form-check-input");
    for (let i = 0; i < dias.length; i++) {
      if (dias[i].checked) {
        listaDias.push(dias[i].value);
      }
    }
    let inicio = document.getElementById("inicio");
    let fim = document.getElementById("fim");
    let dosagem = document.getElementById("dosagem");
    let hora = document.getElementById("hora");
  
    const myHeaders = new Headers({
      "Content-Type": "application/json",
    })
    let dados = {
      nome: nome.value,
      dias: listaDias,
      data1: inicio.value,
      data2: fim.value,
      qtd: dosagem.value,
      hora: hora.value
    }
    fetch('http://localhost:9999/cadastrar', {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(dados)
    }).then((res) => {
      console.log('legal');
      alert("Comprimido adicionado");
    }).catch((err) => {
      console.log('não foi dessa vez');
    })
  
  }
  

let cadastrar = document.getElementById('cadastrar');
cadastrar.addEventListener("click", function(){
    add();
});