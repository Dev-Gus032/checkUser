const botaoUsuarios = document.getElementById("carregarUsuarios");
const lista = document.getElementById("listaUsuarios");
const campoBusca = document.getElementById("busca");
const loading = document.getElementById("loading");

let usuarios = [];

botaoUsuarios.addEventListener("click", async () => {
  lista.innerHTML ="";
  loading.style.display = "block"

  try{
  const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
  usuarios = await resposta.json();
  exibirUsuarios(usuarios);
  }catch (erro){
    lista.innerHTML = "<li> erro ao carregar usuários.<li>";
  }

  loading.style.display = "none";
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

    <strong class="usuario-nome style"cursor:pointer; color:#007bff;">${usuario.name}</strong><br>
        ${usuario.email}<br>
        Cidade: ${usuario.address.city}<br>
        Empresa: ${usuario.company.name}
        <div class="detalhes" style="display:none; margin-top: 8px;">
        Telefone: ${usuario.phone}<br>
        Website: <a href="https://${usuario.website}" target="blank">${usuario.website}</a><br>
        Endereço: ${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}
        </div>
        `;

const nome = li.querySelector(".usuario-nome");
const detalhes = li.querySelector(".detalhes");

nome.addEventListener("click", ()=>{
  detalhes.style.display = detalhes.style.display === "none" ? "block" :  "none";
});
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
