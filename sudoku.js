var numSelected = null;
var tileSelected = null;
var board ;




var errors = 0;

var solution;

window.onload = function() {
    fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution}}}')
  .then(response => response.json())
  .then(data => {
    // Do something with the data
    console.log(data);
    // console.log(data.newboard);
    board = data.newboard.grids[0].value
    solution = data.newboard.grids[0].solution;
    setGame();
  })
  .catch(error => console.error(error));

    
}

function setGame() {

    for(let i=1;i<=9;i++){
        //<div id="i>"</div>
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    for(let i=1;i<=9;i++){
        for(let j=1;j<=9;j++){

            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            if(board[i-1][j-1]!="0"){
                tile.innerText = board[i-1][j-1];
                tile.classList.add("tile-start");
            }
            if(i==3||i==6){
                tile.classList.add("horizontal-line");
            }
            if(j==3||j==6){
                tile.classList.add("vertical-line");
            }

            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }

    }

}

function selectNumber(){
    if(numSelected != null){
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile(){

    if(numSelected){
        if(this.innerText != "")
            return;
        let coords = this.id.split("-");
        let row = parseInt(coords[0])-1;
        let col = parseInt(coords[1])-1;
        console.log(numSelected);
        console.log(solution[row][col]);
        if(solution[row][col]==numSelected.innerText){
            
            this.innerText = solution[row][col];

        }
        else{
            errors +=1;
            document.getElementById("errors").innerText = errors;
        }
    }


}