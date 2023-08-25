import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://grintame-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const playersInDB = ref(database, "players")
const teamsInDB = ref(database, "teams")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const goButtonEl = document.getElementById("go-button")
const shoppingListEl = document.getElementById("shopping-list")
const totalPlayers = document.getElementById("totalPlayers")
let allPlayers = []
localStorage.clear();
inputFieldEl.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        addPlayer();
    }
})
function addPlayer() {
    let inputValue = inputFieldEl.value;
    if (inputValue.length < 3)
        return;
    const pl = query(playersInDB, orderByChild('name'), equalTo(inputValue));
    onValue(pl, function (_data) {
        if (_data.exists()) {
        }
        else {
            push(playersInDB, { name: inputValue, played: 0, wins: 0 })
        }
    })
    clearInputEl();
}
addButtonEl.addEventListener("click", function () {
    addPlayer();
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
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            allPlayers.push(currentItem[1]);
            appendItemToShoppingListEl(currentItem);
        }
        totalPlayers.innerHTML = "عدد النجوم : " + allPlayers.length;

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
    let score = 0;
    if (itemValue.played > 0)
        score = itemValue.wins / itemValue.played;
    score = score * 100;
    let stars = 5;
    if (score < 20)
        stars = 1;
    else if (score < 40)
        stars = 2;
    else if (score < 60)
        stars = 3;
    else if (score < 80)
        stars = 4;
    newEl.innerHTML = '<span>' + itemValue.name + '</span>' + '<img class="rating" src="./' + stars + '.png">';

    newEl.addEventListener("touchmove", function () {
        newEl.remove();
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i].name == newEl.textContent)
                allPlayers.splice(i, 1);
        }
        totalPlayers.innerHTML = "عدد النجوم : " + allPlayers.length;
    })
    newEl.addEventListener("click", function () {
        newEl.remove();
        for (var i = 0; i < allPlayers.length; i++) {
            if (allPlayers[i].name == newEl.textContent)
                allPlayers.splice(i, 1);
        }
        totalPlayers.innerHTML = "عدد النجوم : " + allPlayers.length;
    })

    newEl.addEventListener('dblclick', function (e) {
        //location.href = "player.html?id=" + itemID
    });
    newEl.addEventListener('touchend', function (e) {
        //location.href = "player.html?id=" + itemID
    });

    shoppingListEl.append(newEl);
}
