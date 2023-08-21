import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://grintame-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const teamsInDB = ref(database, "teams")

const goButtonEl = document.getElementById("go-button")
const backButtonEl = document.getElementById("back-button")

const shoppingListEl = document.getElementById("shopping-list")
const date = new Date();
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const year = date.getFullYear();

const formattedDate = `${day}/${month}/${year}`;
goButtonEl.addEventListener("click", function (_t) {
    alert('كده تمام .. بعد اللعب افتح اللينك السري واختار الفريق الفايز');
    let resultsJSON = localStorage.getItem('formation')
    let results = JSON.parse(resultsJSON);

    if (results) {
        for (var i = 0; i < results.length; i++) {
            let t = results[i];
            console.log(t[0]);
            let team = {
                game_date: formattedDate,
                name: "الفريق " + (i + 1),
                players: t,
                win: false
            }
            push(teamsInDB, team)
        }
    }
    location.href = "./index.html";
})
backButtonEl.addEventListener("click", function () {
    alert('هتعيد !!! .... ماشي . خلي بالك  بيتسجل ان حصل اعادة');
    location.href = "./index.html";

})
function loadResults() {
    let resultsJSON = localStorage.getItem('formation')
    let results = JSON.parse(resultsJSON);
    if (results) {
        for (var i = 0; i < results.length; i++) {
            appendTeam({ name: "الفريق " + (i + 1) });
            let t = results[i];
            console.log(t);
            t.forEach(element => {
                appendItemToShoppingListEl(element);
            });
        }
    } else {
        shoppingListEl.innerHTML = "No items in list... yet"
    }
}
loadResults();
function appendItemToShoppingListEl(item) {
    let itemValue = item
    let newEl = document.createElement("li")
    newEl.textContent = itemValue.name
    shoppingListEl.append(newEl)
}
function appendTeam(item) {
    let itemValue = item
    let newEl = document.createElement("li")
    newEl.className = "teamBtn"
    newEl.textContent = itemValue.name
    shoppingListEl.append(newEl)
}