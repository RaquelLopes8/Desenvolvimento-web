
// function add() {
//   let listaDias = [];

//   let nome = document.getElementById("nome");
//   let dias = document.getElementsByClassName("form-check-input");
//   for (let i = 0; i < dias.length; i++) {
//     if (dias[i].checked) {
//       listaDias.push(dias[i].value);
//     }
//   }
//   let inicio = document.getElementById("inicio");
//   let fim = document.getElementById("fim");
//   let dosagem = document.getElementById("dosagem");
//   let hora = document.getElementById("hora");

//   const myHeaders = new Headers({
//     "Content-Type": "application/json",
//   })
//   let dados = {
//     nome: nome.value,
//     dias: listaDias,
//     data1: inicio.value,
//     data2: fim.value,
//     qtd: dosagem.value,
//     hora: hora.value
//   }
//   fetch('http://localhost:9999/cadastrar', {
//     method: "POST",
//     headers: myHeaders,
//     body: JSON.stringify(dados)
//   }).then((res) => {
//     console.log('legal');
//   }).catch((err) => {
//     console.log('não foi dessa vez');
//   })

// }

// let cadastrar = document.getElementById('cadastrar');
// cadastrar.addEventListener("click", function(){
//     add();
// });
let overlay = document.querySelector('.overlay');
overlay.addEventListener("click", function (event) {
  if (event.target != overlay) return
  overlay.classList.remove('mostrar');
})
function render(comprimidos, horario) {
  let modal = document.querySelector('.modal');

  let comprimidosFiltrados = []
  
  
    comprimidosFiltrados =  comprimidos.filter((compri) => {
      const hora = compri.hora.split(':')[0]
      const deDia = Number(hora) > 6 && Number(hora) < 18;

      if(horario == 'colorDia') {
        return deDia;
      }
      
      return !deDia;
    })

  if(!comprimidosFiltrados.length > 0) return;

  overlay.classList.add('mostrar');
  
  let lista = '';

  comprimidosFiltrados.forEach(compri => {
    lista += `<div class="listCompri">
    <p class="iconCompri">f</p>
    <p class="iconApagar" id="${compri._id}">e</p>
    <p class="txtCompri">${compri.nome}
        <br>
        ${compri.qtd}
        <br>
        ${compri.hora}
        <br>
        Início: ${compri.data1}
        <br>
        Término: ${compri.data2}
        
    </p>
    <hr>
  </div>`
  });
  
  modal.innerHTML = lista;
}

let modal = document.querySelector('.modal');

modal.addEventListener('click', (e) => {
  if(e.target.classList[0] == 'iconApagar'){
    delet(e.target.id);
    overlay.classList.remove('mostrar');
    return
  }
})
function delet(id){
  
  fetch('http://localhost:9999/deletar/' + id, {
    method: "DELETE"
  }).then((res) => {
    console.log(res);
    console.log('Deletado');
    alert("Comprimido excluído")
  }).catch((err) => {
    console.log('Erro ao deletar');
  })

}

// let deletars = document.querySelectorAll('.iconApagar');
// console.log(deletars);
let nome = document.getElementById('nome');
let dias = document.getElementsByClassName('contDias');
// console.log(dias);
for (let i = 0; i < dias.length; i++) {
  if (dias[i].addEventListener("click", function () {
    let diaSelec = dias[i].classList[2];
    let horario = dias[i].classList[1];

    console.log(horario);
    fetch('http://localhost:9999/listar/' + diaSelec, {
      method: "GET"
    }).then((result) => {
      return result.json();
    })
      .then((comprimidos) => {
        console.log(comprimidos);
        if (comprimidos.length > 0) {
          render(comprimidos, horario);
          

        }
      })
      .catch((err) => {
        console.log('não foi dessa vez', {err});
      })
    console.log(dias[i].classList[2]);
  })) {

  }
}





// new newCompri({
//     nome: 'Diazepan',
//     dias: 'Segunda, terça, quarta',
//     data1: '2010-01-01',
//     data2: '2011-01-01',
//     qtd: 1,
//     hora: '18:30'

// }).save().then((result) => {
//     console.log("Cadastrado!!")

// }).catch((err) => {
//     console.log("ERRO")
// })
// let hora = document.getElementById("hora");

// let bot = document.getElementById("botao");

// bot.addEventListener("click", function () {
//     console.log(hora.value);

// });
// console.log(hora.value);
