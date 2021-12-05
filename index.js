console.log('Index');

//Load Boards from file or manually
const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];

//   /create variable

var timer;
var timeRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;

window.onload = function () {
    //Run Start game function when button is clicked
    id("start_btn").addEventListener("click", startGame);


}
function startGame() {
    console.log('Game Start');
    //Choose board Diffculty
    let board;
    if (id("diff_1").checked) {
        board = easy[0];

    }
    else if (id("diff_2").checked) {
        board = medium[0];

    }
    else {
        board = hard[0];

    }
    // Set lives to 2 and enable selecting number and tiles
    lives = 3;
    disableSelect = false;
    id("lives").textContent = "Lives Remaining : 3";
    generateBoard(board);
    // start the timer
    setTimer();
    //sets theme based on input
    if(id("theme_1").checked){
        qs("body").classList.remove('dark');
    }
    else{
        qs("body").classList.add('dark');
    }
    //show Number Container
    id("number_container").classList.remove("hidden")
}

function generateBoard(board) {
    console.log('generateBoard');

    //clear previous board
    clearPrevious();
    //Let used to increment tile ids
    let idCount = 0;
    //create 81 tiles

    for (let i = 0; i < 81; i++) {
        let tile = document.createElement("p");
        if (board.charAt(i) != "-") {
            //set tile to text to correctanswer
            tile.textContent = board.charAt(i)
        }
        else {
            // add click event listner to the tile
        }

        //Assign a tile id
        tile.id=idCount;
        //Increment for next tile
        idCount ++;
        //Add title class to all tiles
        tile.classList.add('tile');
        if((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)){
            tile.classList.add('bottomBorder');

        }
        if((tile.id+1)%9==3 || (tile.id+1)%9==6){
            tile.classList.add('rightBorder');

        }
        //Add tile to board
        id("board").appendChild(tile)

    }

}
function clearPrevious() {
    console.log('clearPrevious');

    //access all of the tiles
    let tiles = qsa('.tile');
    // remove each Tile

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].remove();
    }
    // if timer there is a clear timer
    if (timer) {
        clearTimeout(timer);
    }
    //Deselect any numbers
    for (let i = 0; i < id("number_container").children.length; i++) {
        id("number_container").children[i].classList.remove("selected");

    }
    //clear Selected variable
    selectedTile = null;
    selectedNum = null
}

function setTimer(){
    //setr timer remaining based on input
    if(id("timer_1").checked) timeRemaining=60;
    if(id("timer_2").checked) timeRemaining=300;
    if(id("timer_3").checked) timeRemaining=600;

    //sets the timer for first seconnd

    id("timer").textContent=timeConversion(timeRemaining);
    //sets timer to update every seconnd
    timer=setInterval(function(){
        timeRemaining--;
        
        //if no timer remaini9ng end the game
        if(timeRemaining===0) endGame();
        id("timer").textContent=timeConversion(timeRemaining);
    },1000)
}

//convert secons into MM:SS format
function timeConversion(time){

    let minutes=Math.floor(time/60);
    if(minutes<10) minutes="0"+minutes;
    let seconds=time%60;
    if(seconds<10) seconds="0"+seconds;

    return minutes + ":" + seconds;


}


function setThemeOnChange(){
    
    //sets theme based on input
    if(id("theme_1").checked){
        qs("body").classList.remove('dark');
    }
    else{
        qs("body").classList.add('dark');
    }
}
//Helper Function
function qs(selector) {
    return document.querySelector(selector);
}
function qsa(selector) {
    return document.querySelectorAll(selector);
}
function id(id) {
    return document.getElementById(id)
}