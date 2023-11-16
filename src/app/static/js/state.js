let appState = {
	currentState: "upload",
};

renderState();

function changeState(newState) {
	appState.currentState = newState;
	renderState();
}

function renderState() {
	const ids = ["upload", "loading", "results"];

	document.getElementById(
		"debug-text"
	).textContent = `Current State: ${appState.currentState}`;

	ids.forEach((id) => {
		document.getElementById(id).style.display =
			appState.currentState === id ? "block" : "none";
	});
}

// Export functions if you're using modules
// export { changeState, renderState };
