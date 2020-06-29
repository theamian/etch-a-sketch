
//https://stackoverflow.com/questions/1766861/find-the-exact-height-and-width-of-the-viewport-in-a-cross-browser-way-no-proto
function getViewport() {

  var viewPortWidth;
  var viewPortHeight;

  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth != 'undefined') {
    viewPortWidth = window.innerWidth,
    viewPortHeight = window.innerHeight
  }

  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (typeof document.documentElement != 'undefined'
  && typeof document.documentElement.clientWidth !=
  'undefined' && document.documentElement.clientWidth != 0) {
      viewPortWidth = document.documentElement.clientWidth,
      viewPortHeight = document.documentElement.clientHeight
  }

  // older versions of IE
  else {
    viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
    viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
  }
  return [viewPortWidth, viewPortHeight];
  }

function paint() {
  if (lightness < 0) {lightness = 0};
  hue = Math.floor(Math.random() * 360);
  this.setAttribute("style", `background-color: hsl(${hue}, 100%, ${lightness}%);`);
  lightness -= 10;
}

function sizePrompting() {
  let grid;
  do {
    grid = prompt("Please select the number of rows and columns", "16");
  }
  while (isNaN(+grid));
  return +grid;
}

const main = document.getElementById("mainContainer");
const reset = document.getElementById("reset");
const width = getViewport()[0];
const height = getViewport()[1];
let lightness = 100;

function mainFunction(gridSize) {
  if (width > height) {
      cellSize = height / gridSize;
  }
  else {
      cellSize = width / gridSize;
  }

  containerSize = cellSize * gridSize;

  main.setAttribute("style", `width: ${containerSize}px; height: ${containerSize}px; grid-template-columns: repeat(${gridSize}, ${cellSize}px); grid-template-rows: repeat(${gridSize}, ${cellSize}px);`);

  for(let i = 0; i < Math.pow(gridSize, 2); i++) {
      let cell = document.createElement("div");
      cell.addEventListener("mouseover", paint);
      main.appendChild(cell);
  }
}

function resetting() {
  main.textContent = '';
  grid = sizePrompting();
  lightness = 100;
  mainFunction(grid);
}

let gridSize = 16;

mainFunction(gridSize);

reset.addEventListener("click", resetting);


