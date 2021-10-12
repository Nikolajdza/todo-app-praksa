'use strict';

const todos = {
	todoList: [
		{ todoText: 'Item 1', completed: false },
		{ todoText: 'Item 2', completed: false },
		{ todoText: 'Item 3', completed: false },
	],
	add(text) {
		this.todoList.push({ todoText: text, completed: false });
	},
	edit(position, text) {
		this.todoList[position].todoText = text;
	},
	remove(position) {
		this.todoList.splice(position, 1);
	},
	toggle(position) {
		this.todoList[position].completed = !this.todoList[position].completed;
	},
	allTrue() {
		for (let i = 0; i < this.todoList.length; i++) {
			if (!this.todoList[i].completed) {
				return false;
			}
		}
		return true;
	},
	toggleAll() {
		let toggleTo = !this.allTrue();
		for (let i = 0; i < this.todoList.length; i++) {
			this.todoList[i].completed = toggleTo;
		}
	},
};

displayTodos();

function displayTodos() {
	let todoList = document.getElementById('todo-ul');
	todoList.innerHTML = '';
	//
	for (let index in todos.todoList) {
		let li = createListItem(index);
		todoList.appendChild(li);
	}
}

function createEditInput(index) {
	const editInput = document.createElement('input');
	editInput.name = `edit-input`;
	editInput.placeholder = todos.todoList[index].todoText;
	editInput.style.display = 'none';
	return editInput;
}

const list = document.getElementById('todo-ul');
list.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.name === 'toggle') {
		toggleTodo(e.target.parentNode.id.split('-')[1]);
	} else if (e.target.name === 'remove') {
		removeTodo(e.target.parentNode.id.split('-')[1]);
	}
});

list.addEventListener('dblclick', (e) => {
	e.preventDefault();
	e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
	if (e.target.name === 'edit-input') {
		const oldText = e.target.value;
		const newEdit = e.target;
		newEdit.readOnly = false;
		newEdit.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				editTodo(newEdit.value, e.target.parentNode.id.split('-')[1]);
				newEdit.readOnly = true;
			} else if (e.key === 'Escape') {
				e.target.value = oldText;
				e.target.blur();
				newEdit.readOnly = true;
				return;
			}
		});
		newEdit.addEventListener('blur', (e) => {
			e.target.readOnly = true;
		});
	}
});

function createListItem(index) {
	const todoId = `todo-`;
	const li = document.createElement('li');
	const removeButton = createRemoveButton();
	const toggleButton = createToggleButton(index);
	const inputText = createInput(index);
	li.id = `${todoId}${index}`;
	li.appendChild(toggleButton);
	li.appendChild(inputText);
	li.appendChild(removeButton);
	return li;
}

function createInput(index) {
	const inputText = document.createElement('input');
	inputText.name = `edit-input`;
	inputText.type = 'text';
	inputText.value = todos.todoList[index].todoText;
	inputText.readOnly = true;
	return inputText;
}

function editTodo(newText, position) {
	if (newText) {
		todos.edit(position, newText);
		displayTodos();
	}
}

function createToggleButton(index) {
	const toggleButton = document.createElement('button');
	toggleButton.name = `toggle`;
	toggleButton.innerText = todos.todoList[index].completed ? '✅' : '⚪';
	return toggleButton;
}

function createRemoveButton() {
	const removeButton = document.createElement('button');
	removeButton.name = `remove`;
	removeButton.innerText = '❌';
	return removeButton;
}

function toggleTodo(position) {
	todos.toggle(position);
	displayTodos();
}

function removeTodo(position) {
	todos.remove(position);
	displayTodos();
}

let toggleAllButton = document.getElementById('toggle-all-button');
toggleAllButton.addEventListener('click', () => {
	todos.toggleAll();
	displayTodos();
});

let addInput = document.getElementById('add-input');
addInput.addEventListener('keypress', (e) => {
	if (e.key === 'Enter' && addInput.value) {
		todos.add(addInput.value);
		addInput.value = '';
	}
	displayTodos();
});

let toggleButton = document.getElementById('toggle-button');
