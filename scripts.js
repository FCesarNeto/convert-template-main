//Cotação de moedas do dia

const USD = 5.71
const EUR = 6.17
const GBP = 7.42

//Obtendo os elementos do formulario.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente numeros.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Capturando o evento de submit do formulario.
form.onsubmit = (event) => {
  event.preventDefault () //Impende o recarregamento automatico da pagina.

  switch(currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break

    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break

    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break 
  }
}

// Função para converter a moeda
function convertCurrency(amount, price, symbol) {
  try {
    //Exibindo a cotacao da moeda selecionada
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    //Calcula o total
    let total = amount * price 
    console.log(isNaN(total))
    
    // Verifica se o resultado não é um numero.
    if (isNaN(total)) {
      return alert("Por favor, digite o valor corretamente para converter.")
    }

    //Formatar o valor total.
    total = formatCurrencyBRL(total).replace("R$","")
    
    //Exibe o resultado total
    result.textContent = `${total} Reais`

    //Aplica a classe que exibe o footer para mostrar o resultado
    footer.classList.add("show-result")
  } catch (error) {
    //Remove a classe do footer removendo ele da tela.
    footer.classList.remove("show-result")

    console.log(error)
    alert("Não foi possivel converter, tente novamente mais tarde.")
  }
}

function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style:"currency",
    currency: "BRL",
  })
}
