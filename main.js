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
}

//Funktion som ritar ut korten för användaren
function writeTheCards() {

    let result = "";

    allCardsObject.forEach((item, index) => {
        result += `
        <div class="theCard">
            <div class="frontPage ${index}">
                <p class="wichSide">Front page</p>
                <p>${item.frontpage}</p>
                <button class="turnCard frontPageBtn ${index}">Turn the card</button>
            </div>
            <div class="backPage ${index} hidden">
                <p class="wichSide">Back page</p>
                <p>${item.backpage}</p>
                <button class="turnCard backPageBtn ${index}">Turn the card</button>
            </div>
        </div>
    `
    })

    containerWithCards.innerHTML= result;

    turnCard(); //Kör funktionen så att turnCard funkar
}

//Funktion som körs när vi klickar på knappen
saveButton.addEventListener("click", (e) => {
    e.preventDefault();

    addCardsToLocalStorage();

    writeTheCards();

    inputFieldBackPage.value = "";
    inputFieldFrontPage.value = "";

})

function turnCard() {
    const turnCardButton = document.querySelectorAll(".turnCard");

    turnCardButton.forEach(btn =>  {
        btn.addEventListener("click", (e) => {

            const buttonClassPage = e.target.classList[1];
            //Hämtar knappens klass för sida den är på
            const buttonClassIndex = e.target.classList[2];
            //Hämtar knappens index för vilket kort den är på

            const allCardsElem = document.querySelectorAll(".theCard");
            //Hämtar alla kort 

            const rightCardElem = allCardsElem[buttonClassIndex];
            //Hämtar det kortet som har knappens klass index

            const rightCardFrontPage = rightCardElem.childNodes[1];
            //Hämtar framsidan på rätt kort

            const rightCardBackPage = rightCardElem.childNodes[3];
            //Hämtar baksidan på rätt kort


            if (buttonClassPage == "frontPageBtn") {
                   
                if (rightCardBackPage.classList.contains("hidden")) {

                    rightCardBackPage.classList.remove("hidden");
                    rightCardFrontPage.classList.add("hidden");

                } else {

                    rightCardFrontPage.classList.add("hidden");

                }

            } else {

                if (rightCardFrontPage.classList.contains("hidden")) {

                    rightCardFrontPage.classList.remove("hidden");
                    rightCardBackPage.classList.add("hidden");

                } else {

                    rightCardBackPage.classList.add("hidden");
                    
                }
            }
            
        })
    })
}

//Om localstorage innehåller "cards" så rita upp korten som finns
if (localStorage.getItem("cards")) {
    writeTheCards();
}
