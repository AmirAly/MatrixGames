import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue, update, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { uploadBase64Pic } from "./uploads.js"

const appSettings = {
    databaseURL: "https://grintame-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket:'grintame.appspot.com'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const playersInDB = ref(database, "players")

const playerPic = document.getElementById("playerPic");
const uploadPic = document.getElementById("uploadPic");
const playerName = document.getElementById("playerName");
const playerScore = document.getElementById("playerScore");
const playedtxt = document.getElementById("playedtxt");
const wintxt = document.getElementById("wintxt");
const losetxt = document.getElementById("losetxt");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
let player = {};

playerPic.addEventListener("click", function () {
    document.getElementById('uploadPic').click();
})
uploadPic.addEventListener("change", function (element) {
    console.log(element);
    var file = uploadPic.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        const updates = {};
        player.picture = reader.result;
        console.log(player);
        updates['/players/-' + id] = player;
        update(ref(database), updates)
    }
    reader.readAsDataURL(file);
})
playerPic.src = 'player.png';
const scoreUpdates = query(playersInDB, orderByChild(id));
onValue(scoreUpdates, function (_data) {
    let results = Object.entries(_data.val());
    let p = results[0][1];
    player = p;
    console.log(p);
    playerName.textContent = p.name;
    let score = 0;
    if (p.played > 0)
        score = p.wins / p.played;
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
    playerScore.src = stars + ".png";
    if (p.picture)
        playerPic.src = p.picture;
    playedtxt.textContent = "لعب : " + p.played
    wintxt.textContent = "فوز : " + p.wins
    losetxt.textContent = "خساره : " + (p.played - p.wins)
})
