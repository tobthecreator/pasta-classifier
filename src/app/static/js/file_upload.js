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
	// Send the POST request to the Flask endpoint
	fetch("predict", {
		method: "POST",
		body: formData,
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("Success:", data);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

function clearImage() {
	document.getElementById("preview").innerHTML = "";
	document.getElementById("upload-file").value = "";
}
