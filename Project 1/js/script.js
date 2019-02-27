function request(call, param) {
    let request = new XMLHttpRequest();
    let url = "";
    if (call === 'teams') {
        url = 'https://data.nba.net/data/10s/prod/v1/2018/teams.json';
    }
    else if (call === "roster") {
        url = "https://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=2018-19&TeamID=" + param;
    }
    else if (call === "stats") {
        url = "https://nba-players.herokuapp.com/players/" + last_name + "/" + first_name;
    }

    else {
        console.log("invalid call method");
    }
    request.open('GET', url, true)
    request.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            createForm(data, call);
        }
    }
    request.send();
}

function createForm(data, call, param) {
    var newDiv = document.createElement("div");
    document.body.appendChild(newDiv);
    var selectList = document.createElement("select");
    newDiv.appendChild(selectList);
    if (call === "teams") {
        data = data.league.standard;
        for (var i = 0; i < data.length; i++) {
            if (data[i].isNBAFranchise) {
                var option = document.createElement("option");
                option.value = data[i].teamId;
                option.text = data[i].fullName;
                selectList.appendChild(option);
            }
        }
        selectList.onchange = request("roster", this.selectedIndex);
    }
    if (call === "roster") {
        data = data.resultSets['rowSet'];
        for (var i = 0; i < data.length; i++) {
            var option = document.createElement("option");
            option.value = data[i][5];
            option.text = data[i][5];
            selectList.appendChild(option);
        }
        selectList.onchange = createForm(data, "players", this.selectedIndex)

    }
    if (call === "players") {
        for (var i = 0; i < data.length; i++) {
            if(data[i][5] == param)
            var option = document.createElement("option");
            option.value = data[i][0];
            option.text = data[i][3];
            selectList.appendChild(option);
        }
    }
}

request('teams');