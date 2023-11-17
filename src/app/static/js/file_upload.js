document
	.getElementById("upload-file")
	.addEventListener("change", handleFileSelect, false);
document
	.getElementById("clear-button")
	.addEventListener("click", clearImage, false);

function handleFileSelect(event) {
	console.log("handleFileSelect triggered");
	const file = event.target.files[0];

	// Prepare to send the POST request
	const formData = new FormData();
	formData.append("image", file);

	console.log("Sending POST request...");

	changeState("loading");

	// Send the POST request to the Flask endpoint
	fetch("predict", {
		method: "POST",
		body: formData,
	})
		.then((response) => response.json())
		.then((data) => {
			populateResults(sortObjectByValues(data));
			changeState("results");
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

function clearImage() {
	document.getElementById("preview").innerHTML = "";
	document.getElementById("upload-file").value = "";
}

function sortObjectByValues(obj) {
	const array = Object.keys(obj).map((key) => {
		return { pasta: key, value: obj[key] };
	});

	array.sort((a, b) => b.value - a.value);

	return array;
}

function populateResults(data) {
	console.log(JSON.stringify(data, null, 2));
	const resultsContainer = document.getElementById("results");
	resultsContainer.innerHTML = "";

	const topPasta = Object.keys(data)[0];
	const topTitle = document.createElement("h1");
	topTitle.className = "text-4xl font-bold text-center mb-5";
	topTitle.textContent = topPasta.pasta;
	resultsContainer.appendChild(topTitle);

	for (const { pasta, value } of data) {
		const rowDiv = document.createElement("div");
		rowDiv.className = "flex items-center space-x-2";

		const pastaNameDiv = document.createElement("div");
		pastaNameDiv.className = "text-sm font-medium w-1/4";
		pastaNameDiv.textContent = pasta;

		const progressBarContainer = document.createElement("div");
		progressBarContainer.className = "w-2/4";

		const progressBar = document.createElement("div");
		progressBar.className = "bg-orange-200 h-4 rounded-full";
		progressBar.style.width = `${value * 100}%`; // Set width based on value

		progressBarContainer.appendChild(progressBar);

		const percentageDiv = document.createElement("div");
		percentageDiv.className = "text-sm w-1/4 text-right";
		percentageDiv.textContent = `${Math.round(value * 100)}%`;

		// Append all elements to the row
		rowDiv.appendChild(pastaNameDiv);
		rowDiv.appendChild(progressBarContainer);
		rowDiv.appendChild(percentageDiv);

		// Append the row to the results container
		resultsContainer.appendChild(rowDiv);
	}
}
