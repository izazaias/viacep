document.getElementById("consultar").addEventListener("click", () => {
  const cep = document.getElementById("cep").value;

  consultarCep(cep);
});

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

    console.log(data);
    console.log(typeof data);

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
