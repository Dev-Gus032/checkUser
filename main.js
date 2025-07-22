const botaoUsuarios = document.getElementById("carregarUsuarios");
const lista = document.getElementById("listaUsuarios");

botaoUsuarios.addEventListener("click", async () => {
  try{
  const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
  const usuarios = await resposta.json();

  lista.innerHTML = "";
  usuarios.forEach(usuario => {
    const item = document.createElement("li");
    item.textContent = `${usuario.name} (${usuario.email})`;
    lista.appendChild(item);
    });
  } catch (erro){
    console.error("Erro ao buscar usuários:", erro);
    lista.innerHTML = "<li>Erro ao carregar usuários.</li>";
  }
});

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
