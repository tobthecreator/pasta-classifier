let generateImages = true;
const numberOfColumns = 5;
let columnWidth = window.innerWidth / numberOfColumns;

const squareSize = 48;
let squares = [];

let shapes = [
	"rigatonni",
	"shell",
	"ferris",
	"bowtie",
	"ravioli",
	"twisty",
	"rotini",
	"macaronni",
];

function createSquare(columnIndex) {
	const square = document.createElement("img");

	const shape = shapes[Math.floor(Math.random() * shapes.length)];
	square.src = `/public/pasta/${shape}.png`; // Replace with your image path

	square.className = `absolute w-12 h-12 z-0`;

	const xPosition = columnIndex * columnWidth + (columnWidth - squareSize) / 2;
	square.style.left = xPosition + "px";

	const yPosition = -squareSize;
	console.log(yPosition);
	square.style.top = yPosition + "px";

	square.style.transform = `rotate(${Math.random() * 360}deg)`;

	document.body.appendChild(square);
	squares.push({ element: square, columnIndex: columnIndex });

	let yPos = yPosition;
	function fall() {
		yPos += 0.4; // Adjust the speed of falling
		square.style.top = yPos + "px";

		if (yPos < window.innerHeight) {
			requestAnimationFrame(fall);
		} else {
			square.remove();
		}
	}
	fall();
}

function generateSquaresInColumn(columnIndex) {
	if (!generateImages) return;

	function generateSquare() {
		createSquare(columnIndex);

		// Random interval between 2s and 5s
		setTimeout(generateSquare, Math.random() * 2000 + 3000);
	}
	generateSquare();
}

window.addEventListener("resize", () => {
	console.log("resize!!");
	columnWidth = window.innerWidth / numberOfColumns;

	squares.forEach((squareObj) => {
		const newXPosition =
			squareObj.columnIndex * columnWidth + (columnWidth - squareSize) / 2;
		squareObj.element.style.left = newXPosition + "px";
	});
});

document.addEventListener("visibilitychange", () => {
	console.log("visibilitychange!!!");

	generateImages = document.visibilityState === "visible";
});

for (let i = 0; i < numberOfColumns; i++) {
	setTimeout(generateSquaresInColumn(i), 1000);
}
