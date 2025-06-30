document.getElementById('service-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const valorConta = parseFloat(document.getElementById('total').value);
  const taxaServico = parseFloat(document.getElementById('taxa').value);

  if (isNaN(valorConta) || isNaN(taxaServico)) {
    alert('Por favor, insira valores válidos.');
    return;
  }

  const valorTaxa = (valorConta * taxaServico) / 100;
  const totalComTaxa = valorConta + valorTaxa;

  document.getElementById('valorTaxa').textContent = `R$ ${valorTaxa.toFixed(2)}`;
  document.getElementById('valorTotal').textContent = `R$ ${totalComTaxa.toFixed(2)}`;
  document.getElementById('resultado').style.display = 'block';
});
