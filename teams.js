const teamsDiv = document.getElementById("teams");
const backBtn = document.getElementById("backBtn");

const players = JSON.parse(localStorage.getItem("players"));
var
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
    fixNumbers = function (str) {
        if (typeof str === 'string') {
            for (var i = 0; i < 10; i++) {
                str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
            }
        }
        return str;
    };
const numTeams = parseInt(fixNumbers(localStorage.getItem("numTeams")));

if (!players || !numTeams) {
    window.location.href = "./index.html";
}

shuffle(players);
const teams = chunk(players, parseInt(numTeams));

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
