//Variable declaration
const coins = document.getElementById("coins");
const coinsLabel = document.getElementById("number-coins");
const coinsButton = document.getElementById("coins-button");
let coinsWained = 0;

//Coins management
document.getElementById("form").addEventListener("submit", processForm, false);
document.getElementById("leave").addEventListener("click", quit, false);

function processForm(event) {
	event.preventDefault();
    if (coins.value > 0) {
        coins.disabled = true;
        coinsButton.disabled = true;
        coinsLabel.innerHTML = coins.value;
    }
}

function quit() {
    const message = `Has conseguido un total de ${coinsWained} monedas`;
    coinsLabel.innerHTML = 0;
    coins.value = Number(coins.value) + coinsWained;
    window.alert(message);
    coins.disabled = false;
    coinsButton.disabled = false;
}
