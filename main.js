const botaoUsuarios = document.getElementById("carregarUsuarios");
const lista = document.getElementById("listaUsuarios");
const campoBusca = document.getElementById("busca");

let usuarios = [];

botaoUsuarios.addEventListener("click", async () => {
  const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
  usuarios = await resposta.json();
  exibirUsuarios(usuarios);
  });

campoBusca.addEventListener("input", ()=>{
  const termo = campoBusca.value.toLowerCase();
  const filtrados = usuarios.filter(usuario =>
    usuario.name.toLowerCase().includes(termo)
  );
  exibirUsuarios(filtrados);
});

function exibirUsuarios(listaDeUsuarios) {
  lista.innerHTML ="";
  listaDeUsuarios.forEach(usuario => {
    const li = document.createElement("li");
    li.innerHTML = `
    <strong>${usuario.name}</strong><br>
        ${usuario.email}<br>
        Cidade: ${usuario.address.city}<br>
        Empresa: ${usuario.company.name}`;
    lista.appendChild(li);
    });
}
const cepInput = document.getElementById("cep");
const buscarCep = document.getElementById("buscarCep");
const resultadoCep = document.getElementById("resultadoCep");

buscarCep.addEventListener("click", async () => {
  const cep = cepInput.value;

  if (cep.length !== 8) {
    resultadoCep.textContent = "CEP inválido";
    return;
  }

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      resultadoCep.textContent = "CEP não encontrado";
    } else {
      resultadoCep.innerHTML = `
        <p><strong>Rua:</strong> ${dados.logradouro}</p>
        <p><strong>Bairro:</strong> ${dados.bairro}</p>
        <p><strong>Cidade:</strong> ${dados.localidade}</p>
        <p><strong>UF:</strong> ${dados.uf}</p>
      `;
    }

  } catch (erro) {
    resultadoCep.textContent = "Erro ao buscar o CEP";
  }
});
