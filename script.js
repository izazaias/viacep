// Busca o elemento com o id "cep" e adiciona um evento de clique ao botão "consultar"
// Quando o botão é clicado, chama a função consultarCep com o valor do campo de entrada
// de CEP como argumento
document.getElementById("consultar").addEventListener("click", () => {
  const cep = document.getElementById("cep").value;

  consultarCep(cep);
});

// Função asíncrona que consulta o CEP na API ViaCEP
// Recebe o CEP como argumento e faz uma requisição para a API
// Se a requisição for bem-sucedida, exibe os dados do endereço na página
// Se o CEP não for encontrado, exibe uma mensagem de erro
// Se ocorrer um erro na requisição, exibe uma mensagem de erro
// A função também valida se o CEP tem 8 dígitos e se é um número
// Se o CEP não for válido, exibe uma mensagem de erro
// A função usa o método fetch para fazer a requisição e o método json() para converter a resposta em JSON
// A função também usa o método innerHTML para atualizar o conteúdo do elemento "resultado"
// A função também usa o método isNaN() para verificar se o CEP é um número
async function consultarCep(cep) {
  const resultadoDiv = document.getElementById("resultado");

  resultadoDiv.innerHTML = "";

  if (cep.length !== 8 || isNaN(cep)) {
    resultadoDiv.innerHTML = "Por favor, digite um CEP válido com 8 digitos.";
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.error) {
      resultadoDiv.innerHTML = "CEP não encontrado.";
    } else {
      resultadoDiv.innerHTML = `
        <p><strong>Endereço:</strong> ${data.logradouro}</p>
        <p><strong>Bairro:</strong> ${data.bairro}</p>
        <p><strong>Localidade:</strong> ${data.localidade}</p>
        <p><strong>Estado:</strong> ${data.uf}</p>
        `;
    }
  } catch (error) {
    resultadoDiv.innerHTML = "Erro ao consultar o CEP. Tente novamente.";
  }
}
