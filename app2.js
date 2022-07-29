// data entry section >>

let saveData = [];
let progress = document.getElementById("progress").id;

function collectData() {
	let add = document.getElementById("entry__confirm");
	let inputArea = document.getElementById("entry__input");

	add.addEventListener("click", () => {
		console.log(inputArea.value);
		generateElement(inputArea.value, progress);
	});
}
collectData();

// generating element section >>

function generateElement(input, containerID) {
	let movingItem = document.createElement("div");
	let text = document.createElement("div");
	var remove = document.createElement("i");

	movingItem.appendChild(text);
	movingItem.appendChild(remove);

	text.textContent = input;
	movingItem.classList = "data";
	remove.classList = "fa-solid fa-trash";
	remove.classList.add("icon");

	document.getElementById(containerID).appendChild(movingItem);

	// Drag element >>
	movingItem.setAttribute("draggable", "true");

	// dymanic element id >>
	let elements = document.querySelectorAll(".data");
	elements.forEach((e, i) => {
		e.setAttribute("id", "elem " + (i + 1).toString());
	});

	movingItem.addEventListener("dragstart", activateElement);

	// element data object>>
	let data = {
		id: movingItem.id,
		value: movingItem.textContent,
		container: movingItem.parentElement.id,
	};
	saveData.push(data);
	updateLocal(saveData);

	clearData();
}

function activateElement(e) {
	e.dataTransfer.setData("text", this.id);
}

(function activateContainer() {
	let holders = document.querySelectorAll(".container__card-data");
	console.log(holders);
	holders.forEach((h) => {
		h.addEventListener("dragover", activeHold);
		h.addEventListener("drop", activeDrop);
	});
})();

// Activate containers >>
function activeHold(h) {
	h.preventDefault();
}
function activeDrop(h) {
	let draggedId = h.dataTransfer.getData("text");
	let draggedItem = document.getElementById(draggedId);

	this.appendChild(draggedItem);
	updateLocal(saveData);

	saveData.forEach((c, i) => {
		if (c.id == draggedItem.id) {
			c.container = draggedItem.parentElement.id;
		}
	});
	updateLocal(saveData);
}

// store data in local storage >>
function updateLocal(arr) {
	localStorage.setItem("Data", JSON.stringify(arr));
}

// update the UI & get the data >>
(function () {
	let storedData = JSON.parse(localStorage.getItem("Data"));
	storedData.forEach((e, i) => {
		generateElement(e.value, e.container);
	});
})();

function clearData() {
	var trashIcon = document.querySelectorAll(".icon");
	trashIcon.forEach((e, i) => {
		e.addEventListener("click", () => {
			e.parentElement.remove();
			// saveData.splice(this.id, 1);
			// console.log(localStorage.removeItem("project " + i.toString()));
			console.log(e);
		});
	});
}
