function request(call){
    let request = new XMLHttpRequest();
    let url = "";
    if (call === 'teams'){
        url = '../data/teams.json';
    }
    else if(call === "players"){
        url = "https://nba-players.herokuapp.com/players-stats-teams/" + team;
    }
    else if(call === "profile"){
        url = "https://nba-players.herokuapp.com/players/mcadoo/james_michael" + last_name + "/" + first_name;
    }
    
    else
        console.log("invalid call method");
    request.open('GET', url, true)
    request.onreadystatechange = function(e) {
        if(this.readyState == 4 && this.status == 200){
            let data = JSON.parse(this.response);
            createForm(data);
        }
    }
    request.send();
}

function createForm(data){
    var newDiv = document.createElement("div");
    document.body.appendChild(newDiv);
    var selectList = document.createElement("select");
    newDiv.appendChild(selectList);
    for (var i=0; i < data.teams.length; i++){
        var option = document.createElement("option");
        option.value = data.teams[i].abbreviation.toLowerCase();
        option.text = data.teams[i].teamName;
        selectList.appendChild(option);
    }
}

request('teams');