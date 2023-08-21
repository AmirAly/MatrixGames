import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://grintame-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const playersInDB = ref(database, "players")
const teamsInDB = ref(database, "players")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const goButtonEl = document.getElementById("go-button")
const shoppingListEl = document.getElementById("shopping-list")
const totalPlayers = document.getElementById("totalPlayers")
let allPlayers = []
localStorage.clear();
inputFieldEl.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        let inputValue = inputFieldEl.value;

        push(playersInDB, { name: inputValue, played: 0, wins: 0 })

        clearInputEl()
    }
})

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    push(playersInDB, { name: inputValue, played: 0, wins: 0 })

    clearInputEl()
})
goButtonEl.addEventListener("click", function () {
    let playersPerTeam = prompt('كام لعيب في كل فريق ؟');
    let SortedPlayers = randomizeArray(allPlayers, playersPerTeam);
    localStorage.setItem("formation", JSON.stringify(SortedPlayers))
    location.href = './result.html'
})
function randomizeArray(list, size) {
    const randomized = [];
    while (list.length) {
        randomized.push(list.splice(0, size).sort(() => Math.random() - 0.5));
    }
    return randomized;
}
onValue(playersInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        allPlayers = [];
        shoppingListEl.innerHTML = ""
        totalPlayers.innerHTML = "عدد النجوم : " + allPlayers.length
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            allPlayers.push(currentItem[1]);
            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items in list... yet"
    }
})

function clearInputEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = itemValue.name

    newEl.addEventListener("click", function () {
        newEl.remove();
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i].name == newEl.textContent)
                allPlayers.splice(i, 1);
        }
        totalPlayers.innerHTML = "عدد النجوم : " + allPlayers.length
        console.log(allPlayers);

    })

    shoppingListEl.append(newEl)
}