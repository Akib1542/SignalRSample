//create connection
var cloakSpan = document.getElementById("cloakCounter");
var wandSpan = document.getElementById("wandCounter");
var stoneSpan = document.getElementById("stoneCounter");

// basically a connection string where we build a connection
var connectionDeathlyhallows = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/deathlyhallows").build();

//connect to methods that hub invokes aka that receive notifications from hub
connectionDeathlyhallows.on("updateDeathlyHallowsCount", (cloak, stone, wand) => {
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();
});

//invoke hub methods aka send notification to hub

//start connection
function fulfilled() {

    connectionDeathlyhallows.invoke("GetRaceStatus").then((raceCounter) => {
        console.log("Connection to User Hub Successfu11l!");
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();
    });
    //do something on start
    console.log("Connection to User Hub Successful!");
}

function rejected() {
    //rejected logs
}

connectionDeathlyhallows.start().then(fulfilled, rejected);