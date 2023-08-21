
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, update, onValue, remove, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://grintame-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
let updated = false;
const date = new Date();
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const year = date.getFullYear();

const formattedDate = `${day}/${month}/${year}`;
const app = initializeApp(appSettings)
const database = getDatabase(app)
const playersInDB = ref(database, "players")
const teamsInDB = ref(database, "teams")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

let allteams = [];

inputFieldEl.value = formattedDate;
function findPlayers() {
    let inputValue = inputFieldEl.value;
    const pl = query(teamsInDB, orderByChild('game_date'), equalTo(inputValue));
    onValue(pl, function (_data) {
        if (_data.exists()) {
            let results = Object.entries(_data.val());
            if (results) {
                for (var i = 0; i < results.length; i++) {
                    let t = results[i][1];
                    allteams.push(t);
                    appendTeam(t);
                    t.players.forEach(element => {
                        appendItemToShoppingListEl(element);
                    });
                }
            } else {
                shoppingListEl.innerHTML = "No items in list... yet"
            }
        }
    })
}
addButtonEl.addEventListener("click", function () {
    findPlayers();
})
function appendItemToShoppingListEl(item) {
    let itemValue = item
    let newEl = document.createElement("li")
    newEl.textContent = itemValue.name
    shoppingListEl.append(newEl)
}
let updatedPlayers = [];
function appendTeam(item) {
    let itemValue = item
    let newEl = document.createElement("li")
    newEl.className = "teamBtn"
    newEl.textContent = itemValue.name
    shoppingListEl.append(newEl);
    newEl.addEventListener("click", function () {
        allteams.forEach(team => {
            console.log(team);
            team.players.forEach(element => {
                const scoreUpdates = query(playersInDB, orderByChild('name'), equalTo(element.name));
                onValue(scoreUpdates, function (_data) {
                    if (_data) {
                        let results = Object.entries(_data.val());
                        for (var i = 0; i < results.length; i++) {
                            let player = results[i][1];
                            let playerId = results[i][0];
                            if (updatedPlayers.find(x => x == playerId))
                                continue
                            player.played = player.played + 1;
                            if (team.name == item.name)
                                player.wins = player.wins + 1;
                            const updates = {};
                            updatedPlayers.push(playerId);
                            updates['/players/' + playerId] = player;
                            update(ref(database), updates)
                        }
                    }
                })
            })
        });
        alert("مبروك يا نجوم");
        localStorage.clear();
        location.href = "./index.html";
    })
}