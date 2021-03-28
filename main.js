const addButton = document.querySelector('.add_button');
var input = document.querySelector('.input');
const container = document.querySelector('.container');

var todos = [];

if (window.localStorage.getItem('todos') != undefined) {
	var todosJson = window.localStorage.getItem('todos');
	todos = JSON.parse(todosJson);
	saveTodos();
}

class Item {

	constructor(itemName) {
		this.createDiv(itemName);
	}

	createDiv(itemName) {
		let input = document.createElement('input');
		input.value = itemName;
		input.disabled = true;
		input.classList.add('item_input');
		input.type = "text";

		let itemBox = document.createElement('div');
		itemBox.classList.add('item');

		let editButton = document.createElement('button');
		editButton.innerHTML = "EDIT";
		editButton.classList.add('editButton');

		let removeButton = document.createElement('button');
		removeButton.innerHTML = "REMOVE";
		removeButton.classList.add('removeButton');

		container.appendChild(itemBox);

		itemBox.appendChild(input);
		itemBox.appendChild(editButton);
		itemBox.appendChild(removeButton);

		editButton.addEventListener('click', () => this.edit(input, editButton, itemName));

		removeButton.addEventListener('click', () => this.remove(itemBox, itemName));
	}

	edit(input, editButton, name) {
		input.disabled = !input.disabled;
		if (input.disabled == true) {
			editButton.innerHTML = "EDIT";
			let indexof = todos.indexOf(name);
			todos[indexof] = input.value;
			saveTodos();
		} else {
			editButton.innerHTML = "SAVE";

		}
	}

	remove(itemBox, name) {
		itemBox.parentNode.removeChild(itemBox);
		let index = todos.indexOf(name);
		todos.splice(index, 1);
		saveTodos();
	}
}

function check() {
	if(input.value != "") {
		new Item(input.value);
		todos.push(input.value);
		console.log("saving: " + input.value);
		console.log(todos);
		saveTodos();
		input.value = "";
	}
}

function saveTodos() {
	window.localStorage.setItem('todos', JSON.stringify(todos));
}

addButton.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
	if (e.which == 13) {
		check();
	}
})

for (var i = 0; i < todos.length; i++) {
	new Item(todos[i]);
}

