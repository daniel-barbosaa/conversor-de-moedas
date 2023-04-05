const converterButton = document.getElementById("btn-converter")
const value = document.getElementById("value")
const valueReal = document.getElementById("currency-value-text")
const convertedValue = document.getElementById("converted-value")
const selectedCurrency = document.getElementById("selected-currency")
const country = document.getElementById("country")
const currencyText = document.getElementById("currency-text")


// FUNÇÕES 

// const dolar = 5.19
// const euro = 5.48
// const bitcoin = 115.475

const converterCoin = async () => {

    const date = await fetch(' https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL').then((res) => res.json())

    const dolar = date.USDBRL.high
    const euro = date.EURBRL.high
    const bitcoin = date.BTCBRL.high

    let valueDolar = (value.value / dolar)
    let valueEuro = (value.value / euro)
    let valueBitcoin = (value.value / bitcoin)

    if(value.value === ""){
        value.classList.add("error")
        value.placeholder = 'Digite um valor'
        return
    }

    valueReal.innerHTML = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value.value)

    const dolarSelected = (selectedCurrency.value === "US$ Dólar americano")
    const euroSelected = (selectedCurrency.value === "€ Euro")
    const bitcoinSelected = (selectedCurrency.value === "₿ Bitcoin")


    if (dolarSelected) {
        convertedValue.innerHTML = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(valueDolar)
    }

    if (euroSelected) {
        convertedValue.innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(valueEuro)
    }

    if (bitcoinSelected) {
        convertedValue.innerHTML = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BTC' }).format(valueBitcoin)
    }

    value.value = ""
}

const changeCoin = () => {


    const dolarSelected = (selectedCurrency.value === "US$ Dólar americano")
    const euroSelected = (selectedCurrency.value === "€ Euro")
    const bitcoinSelected = (selectedCurrency.value === "₿ Bitcoin")


    if (dolarSelected) {
        country.src = "assets/eua.png"
        currencyText.innerHTML = "Dólar americano"
    }

    if (euroSelected) {
        country.src = "assets/euro.png"
        currencyText.innerHTML = "Euro"
    }

    if (bitcoinSelected) {
        country.src = "assets/bitcoin.png"
        currencyText.innerHTML = "Bitcoin"
    }

    value.placeholder = "R$ 10.000,00"
    value.classList.remove("error")
}

// EVENTOS

converterButton.addEventListener("click", converterCoin)
selectedCurrency.addEventListener("change", changeCoin)