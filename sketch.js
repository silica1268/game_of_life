const cols = 250;
const rows = cols;
var board, tempBoard;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  board = [];
  tempBoard = [];
  for (let i=0; i<cols; i++) {
    row = [];
    for (let j=0; j<rows; j++) {
      row.push(random(2) < 1/2 ? 1 : 0);
    }
    board.push(row);
  }
  tempBoard = structuredClone(board);
  frameRate(16);
}

function draw() {
  background(0);
  let cellSize = min(width, height)/max(cols, rows);
  let neighborDeltas = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
  for (let i=0; i<cols; i++) {
    for (let j=0; j<rows; j++) {
      if (board[i][j] == 1) rect(i*cellSize, j*cellSize, cellSize, cellSize);
      let nAlive = 0;
      neighborDeltas.forEach(deltaPair => {
        let pair = [i+deltaPair[0],j+deltaPair[1]];
        if (pair[0] >= 0 && pair[0] < cols && pair[1] >= 0 && pair[1] < rows) {
          nAlive += board[pair[0]][pair[1]];
        }
      });
      tempBoard[i][j] = ((nAlive == 3) || (board[i][j] == 1 && nAlive == 2)) ? 1 : 0;
    }
  }
  board = structuredClone(tempBoard);
}
