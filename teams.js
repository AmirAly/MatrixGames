const teamsDiv = document.getElementById("teams");
const backBtn = document.getElementById("backBtn");

const players = JSON.parse(localStorage.getItem("players"));
const numTeams = parseInt(localStorage.getItem("numTeams"));

if (!players || !numTeams) {
  window.location.href = "./index.html";
}

shuffle(players);

const teams = chunk(players, numTeams);

let html = "";

teams.forEach((team, index) => {
  html += `<h2>Team ${index + 1}</h2>`;
  html += "<ul>";
  team.forEach((player) => {
    html += `<li>${player}</li>`;
  });
  html += "</ul>";
});

teamsDiv.innerHTML = html;

backBtn.addEventListener("click", () => {
  window.location.href = "./index.html";
});

function chunk(arr, size) {
    const chunkedArr = [];
    let index = 0;
    while (index < arr.length) {
      chunkedArr.push(arr.slice(index, index + size));
      index += size;
    }
    return chunkedArr;
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
    