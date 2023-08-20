const playerForm = document.getElementById("playerForm");
const playerName = document.getElementById("playerName");
const startBtn = document.getElementById("startBtn");
const playerList = document.getElementById("playerList");
addToHomescreen();

let players = JSON.parse(localStorage.getItem("players")) || [];

function renderPlayers() {
    let html = "";
    players.forEach((player, index) => {
        html += `<li><input type='text' value='${player}' id='player${index}'> <span onclick="remove(${index})">X</span> </li>`;
    });
    playerList.innerHTML = html;

}
renderPlayers();
function remove(_i){
    players.splice(_i,1);
    localStorage.setItem("players", JSON.stringify(players));
    renderPlayers();
}
playerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let exist = false;
    players.forEach(element => {
        if (element == playerName.value) {
            alert(element + ' مكتوب قبل كده ')
            exist = true;
        }
    });
    if (exist == true)
        return;
    else {
        players.push(playerName.value);
        localStorage.setItem("players", JSON.stringify(players));
        playerName.value = "";
        renderPlayers();
    }
});

playerList.addEventListener("leave", (e) => {
    const index = parseInt(e.target.id.replace("player", ""));
    players[index] = e.target.value;
    localStorage.setItem("players", JSON.stringify(players));
});

startBtn.addEventListener("click", () => {
    const numTeams = prompt("كل فرقه كام لعيب ؟");
    if (numTeams) {
        localStorage.setItem("numTeams", numTeams);
        window.location.href = "./teams.html";
    }
});
