let generateImages = true;
const numberOfColumns = 5;
let columnWidth = window.innerWidth / numberOfColumns;

const imgSize = 48;
let imgs = [];

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
	const img = document.createElement("img");

	const shape = shapes[Math.floor(Math.random() * shapes.length)];
	img.src = BASE_URL + shape + ".png"; // Use the BASE URL here

	img.className = `absolute w-12 h-12 z-0`;

	const xPosition = columnIndex * columnWidth + (columnWidth - imgSize) / 2;
	img.style.left = xPosition + "px";

	const yPosition = -imgSize;
	img.style.top = yPosition + "px";

	img.style.transform = `rotate(${Math.random() * 360}deg)`;

	document.body.appendChild(img);
	imgs.push({ element: img, columnIndex: columnIndex });

	let yPos = yPosition;
	function fall() {
		yPos += 0.4; // Adjust the speed of falling
		img.style.top = yPos + "px";

		if (yPos < window.innerHeight) {
			requestAnimationFrame(fall);
		} else {
			img.remove();
		}
	}
	fall();
}

function generateSquaresInColumn(columnIndex, generateImages, imgCount) {
	if (!generateImages) return;

	if (imgCount > 100) return;

	function generateSquare() {
		createSquare(columnIndex);

		// Random interval between 2s and 5s
		setTimeout(generateSquare, Math.random() * 2000 + 3000);
	}
	generateSquare();
}

window.addEventListener("resize", () => {
	columnWidth = window.innerWidth / numberOfColumns;

	squares.forEach((squareObj) => {
		const newXPosition =
			squareObj.columnIndex * columnWidth + (columnWidth - squareSize) / 2;
		squareObj.element.style.left = newXPosition + "px";
	});
});

document.addEventListener("visibilitychange", () => {
	generateImages = document.visibilityState === "visible";
});

for (let i = 0; i < numberOfColumns; i++) {
	setTimeout(generateSquaresInColumn(i, generateImages, imgs.length), 1000);
}
