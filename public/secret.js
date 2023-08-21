import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://grintame-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const teamsInDB = ref(database, "teams")

const shoppingListEl = document.getElementById("shopping-list")

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
let secret = prompt('كلمة السر؟');
if (secret == '1212113')
    loadResults();
else
    alert('غلط');
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
    shoppingListEl.append(newEl);
    newEl.addEventListener("click", function () {
        alert('مبروك الفريق ' + item.name);
        location.href = "./index.html";
    })

}