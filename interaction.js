var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
const dollarTexts = ["¡Una MONEDA! Ganas 1 moneda", "¡Dos MONEDAS! Ganas 4 monedas", "¡Tres MONEDAS! Ganas 10 monedas"];
const coins = document.getElementById("coins");
const coinsLabel = document.getElementById("number-coins");
const coinsButton = document.getElementById("coins-button");
const handleImage = document.getElementById("handle");
const imagesContainer = document.getElementById("figures-container");
const historicalContainer = document.getElementById("historical-list");
const imagesArray = imagesContainer.getElementsByTagName("img");
let feedbackText;

//Coins management
document.getElementById("form").addEventListener("submit", processForm, false);
document.getElementById("leave").addEventListener("click", quit, false);

function processForm(event) {
	event.preventDefault();
    if (coins.value > 0) {
        coins.disabled = true;
        coinsButton.disabled = true;
        coinsLabel.innerHTML = Number(coins.value);
        coins.value = 0;
        let li = document.createElement("li");
        li.innerHTML = `Has introducido ${coinsLabel.innerHTML} monedas.`;
        historicalContainer.appendChild(li);
    }
}

function quit() {
    const message = `Has conseguido un total de ${coinsLabel.innerHTML} monedas`;
    window.alert(message);
    coins.value = coinsLabel.innerHTML;
    coinsLabel.innerHTML = 0;
    coins.disabled = false;
    coinsButton.disabled = false;
    let li = document.createElement("li");
    li.innerHTML = "Sacas todas las monedas.";
    historicalContainer.appendChild(li);
}

//Roll
function randomNumber() {
    return Math.round(Math.random()*9);
}

function calculateDollar(number) {
    const dollarValue = [1, 4, 10];
    feedbackText = dollarTexts[number - 1];
    return dollarValue[number - 1];
}

function calculateFruitAndVegetable(array) {
    let numberToAdd = 0;
    if (array[0] === array[1] && array[1] === array[2]) {
        numberToAdd = 5;
        feedbackText = "¡Tres IGUALES! Ganas 5 monedas.";
    } else {
        if (array[0] === array[1] || array[1] === array[2] || array[0] === array[2]) {
            numberToAdd = 2;
            feedbackText = "¡Dos IGUALES! Ganas 2 monedas.";
        }
    }
    return numberToAdd;
}

function calculateScore(number, array) {
    let numberToAdd;
    if (number <= 1) {
        numberToAdd = calculateFruitAndVegetable(array) 
    }
    if (number === 1 && numberToAdd === 2) {
        numberToAdd = 3;
        feedbackText = "¡Dos IGUALES y una MONEDA! Ganas 3 monedas.";
    } else {
        if (number >= 1) {
            numberToAdd = calculateDollar(number);
        }
    }
    if (feedbackText) {
        let li = document.createElement("li");
        li.innerHTML = feedbackText;
        historicalContainer.appendChild(li);
        coinsLabel.innerHTML = Number(coinsLabel.innerHTML) + numberToAdd;
    }
}

function changeImages() {
    let imgArray = [];
    for (let i = 0; i < 3; i++) {
        const number = randomNumber();
        imagesArray[i].src = `img/${listaImagenes[number]}.png`;
        imgArray.push(listaImagenes[number]);
    }
    return imgArray;
}

function roll() {
    feedbackText = undefined;
    coinsLabel.innerHTML = coinsLabel.innerHTML - 1;
    const imgArray = changeImages();
    const dollarsQuantity = imgArray.filter(figure => figure === "dollar");
    calculateScore(dollarsQuantity.length, imgArray)
}

//Slot management
handleImage.addEventListener("mousedown", clickHandle, false);
handleImage.addEventListener("click", finishClickHandle, false);

function insertCoin() {
    window.alert("Por favor, introduce monedas.");
}

function clickHandle() {
    handleImage.src = "img/palancaDOWN.png";
}

function finishClickHandle() {
    handleImage.src = "img/palancaUP.png";
    if (coinsLabel.innerHTML > 0) {
        let li = document.createElement("li");
        li.innerHTML = "Gastas una moneda.";
        historicalContainer.appendChild(li);
        roll();
    } else {
        insertCoin();
    }
}