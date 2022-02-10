//Hämtar element från DOM:en
const inputFieldFrontPage = document.querySelector("#frontPage");
const inputFieldBackPage = document.querySelector("#backPage");
const saveButton = document.querySelector(".saveButton");
const containerWithCards = document.querySelector(".cardsContainer");

//Om det finns något i local storage så hämtar vi det annars skapas en tom array.
const allCardsObject = localStorage.getItem("cards")
? JSON.parse(localStorage.getItem("cards"))
: [];

//Skapar ett tomt objekt där vi ska stoppa in framsidans text och baksidans text
let flashcardInfo = {
    front: "",
    back: ""
};

//Funktion som sparar användarns input i local storage i JSON format
function addCardsToLocalStorage() {

    allCardsObject.push(flashcardInfo = {
        frontpage: inputFieldFrontPage.value,
        backpage: inputFieldBackPage.value
    })

    localStorage.setItem("cards", JSON.stringify(allCardsObject));
    console.log(allCardsObject);
}

//Funktion som ritar ut korten för användaren
function writeTheCards() {

    let result = "";

    allCardsObject.forEach((item, index) => {
        result += `
        <div class="frontPage ${index}">
            <p class="wichSide">Front page</p>
            <p>${item.frontpage}</p>
            <button class="turnCard">Turn the card</button>
        </div>
        <div class="backPage ${index}">
            <p class="wichSide">Back page</p>
            <p>${item.backpage}</p>
            <button class="turnCard">Turn the card</button>
        </div>
    `
    })

    containerWithCards.innerHTML= result;
}

//Funktion som körs när vi klickar på knappen
saveButton.addEventListener("click", (e) => {
    e.preventDefault();

    addCardsToLocalStorage();

    writeTheCards();

})

if (localStorage.getItem("cards")) {
    writeTheCards();
}
