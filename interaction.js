var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
const coins = document.getElementById("coins");
const coinsLabel = document.getElementById("number-coins");
const coinsButton = document.getElementById("coins-button");
const handleImage = document.getElementById("handle");
const imagesContainer = document.getElementById("figures-container");
const historicalContainer = document.getElementById("historical-list");
const imagesArray = imagesContainer.getElementsByTagName("img");
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
        coins.value = 0;
        let li = document.createElement("li");
        li.innerHTML = "Has introducido monedas.";
        historicalContainer.appendChild(li);
    }
}

function quit() {
    const message = `Has conseguido un total de ${coinsWained} monedas`;
    coins.value = Number(coins.value) + coinsWained;
    window.alert(message);
    coinsLabel.innerHTML = 0;
    coins.disabled = false;
    coinsButton.disabled = false;
    let li = document.createElement("li");
    li.innerHTML = "Sacas todas las monedas.";
    historicalContainer.appendChild(li);
}
//Historical
function addHistoric() {

}

//Roll
function randomNumber() {
    return Math.round(Math.random()*9);
}

function calculateDollar(number) {
    const dollarValue = [1, 4, 10];
    const dollarTexts = ["¡Una MONEDA! Ganas 1 moneda", "¡Dos MONEDAS! Ganas 4 monedas", "¡Tres MONEDAS! Ganas 10 monedas"];
    coinsWained = coinsWained + dollarValue[number];
    let li = document.createElement("li");
    li.innerHTML = dollarTexts[number];
    historicalContainer.appendChild(li);
}

function calculateFruitAndVegetable(number, array) {
    let numberToAdd = 0;
    let feedbackText;
    if (array[0] === array[1] && array[1] === array[2]) {
        numberToAdd = 5;
        feedbackText = "¡Tres IGUALES! Ganas 5 monedas.";
    } else {
        if (array[0] === array[1] && array[0] !== "dollar") {
            numberToAdd = 2;
        }
        if (array[1] === array[2] && array[1] !== "dollar") {
            numberToAdd = 2;
        }
        if (array[0] === array[2] && array[2] !== "dollar") {
            numberToAdd = 2;
        }
    }
    if (numberToAdd === 2) {
        feedbackText = "¡Dos IGUALES! Ganas 2 monedas.";
        if (number === 1) {
            numberToAdd = 3;
            feedbackText = "¡Dos IGUALES y una MONEDA! Ganas 3 monedas.";
        }
    }
    let li = document.createElement("li");
    li.innerHTML = feedbackText;
    historicalContainer.appendChild(li);
    coinsWained = coinsWained + numberToAdd;
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
    coinsLabel.innerHTML = coinsLabel.innerHTML - 1;
    const imgArray = changeImages();
    const dollarsQuantity = imgArray.filter(figure => figure === "dollar");
    if (dollarsQuantity.length > 0) {
        calculateDollar(dollarsQuantity.length - 1);
    }
    if (dollarsQuantity.length < 3) {
        calculateFruitAndVegetable(dollarsQuantity.length, imgArray);
    }
}

//Slot management
handleImage.addEventListener("mousedown", clickHandle, false);
handleImage.addEventListener("click", finishClickHandle, false);

function insertCoin() {
    window.alert("Por favor, introduce monedas.");
}

function clickHandle() {
    if (coinsLabel.innerHTML > 0) {
        handleImage.src = "img/palancaDOWN.png";
        let li = document.createElement("li");
        li.innerHTML = "Gastas una moneda.";
        historicalContainer.appendChild(li);
        roll();
    } else {
        insertCoin();
    }
}


function finishClickHandle() {
    handleImage.src = "img/palancaUP.png";
}

