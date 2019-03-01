var g, gf, fg, f, fc, cf, c = false;
function getHTTPObject() {
    var xmlhttp;
    // branch for native XMLHttpRequest object
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    // branch for IE/Windows ActiveX version
    else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        return false;
    }

    return xmlhttp;
}

var http = getHTTPObject(); // We create the HTTP Object

function request(call, param) {
    var url = "";
    if (call === 'teams') {
        url = 'https://data.nba.net/data/10s/prod/v1/2018/teams.json';
    }
    else if (call === "roster") {
        url = "https://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=2018-19&TeamID=" + param;
    }
    else if (call === "stats") {
        names = param.split(" ");
        first_name = names[0];
        last_name = names[1];
        url = "https://nba-players.herokuapp.com/players/" + last_name + "/" + first_name;
    }

    else {
        console.log("invalid call method");
    }
    http.open('GET', url, true)
    http.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            createForm(data, call);
        }
    }
    http.send();
}

function createForm(data, call, param) {

    if (call === "teams") {
        console.log("teams worms")
        var newDiv = document.createElement("div");
        newDiv.id = "tDiv";
        document.body.appendChild(newDiv);
        var selectList = document.createElement("select");
        selectList.id = "teams"
        newDiv.appendChild(selectList);
        data = data.league.standard;
        for (var i = 0; i < data.length; i++) {
            if (data[i].isNBAFranchise) {
                var option = document.createElement("option");
                option.value = data[i].teamId;
                option.text = data[i].fullName;
                selectList.appendChild(option);
            }
        }
        //selectList.onchange = request("roster", this.selectedIndex);
    }
    if (call === "roster") {
        var newDiv = document.createElement("div");
        newDiv.id = "rDiv";
        document.body.appendChild(newDiv);
        var selectList = document.createElement("select");
        selectList.id = "roster";
        newDiv.appendChild(selectList);
        data = data.resultSets[0].rowSet;
        for (var i = 0; i < data.length; i++) {
            var position = data[i][5];
            dumbParsing(position, selectList);
        }
    }
    if (call === "players") {
        for (var i = 0; i < data.length; i++) {
            if (data[i][5] == param)
                var option = document.createElement("option");
            option.value = data[i][0];
            option.text = data[i][3];
            selectList.appendChild(option);
        }
    }
}
function dumbParsing(position, selectList){
    
    if (position == "G" && !g) {
        var option = document.createElement("option");
        option.value = position;
        option.text = "Guard";
        g = true;
        selectList.appendChild(option);
    }
    else if (position == "G-F" && !gf) {
        var option = document.createElement("option");
        option.value = position;
        option.text = "Guard-Forward";
        gf = true;
        selectList.appendChild(option);
    }
    else if (position == "F-G" && !fg) {
        var option = document.createElement("option");
        option.value = position;
        option.text = "Forward-Guard";
        fg = true;
        selectList.appendChild(option);
    }
    else if (position == "F" && !f) {
        var option = document.createElement("option");
        option.value = position;
        option.text = "Forward";
        f = true;
        selectList.appendChild(option);
    }
    else if (position == "F-C" && !fc) {
        var option = document.createElement("option");
        option.value = position;
        option.text = "Forward-Center";
        fc = true;
        selectList.appendChild(option);
    }
    else if (position == "C-F" && !cf) {
        var option = document.createElement("option");
        option.value = position;
        option.text = "Center-Forward";
        cf = true;
        selectList.appendChild(option);
    }
    else if (position == "C" && !c) {
        var option = document.createElement("option");
        option.value = position;
        option.text = "Center";
        c = true;
        selectList.appendChild(option);
    }
    else {
        console.log("skip");
    }
}

//request('teams');
request('roster', '1610612761');