const buttonAddTask = document.querySelector('#btn__add-task'),
	clearStorage = document.querySelector('#clear_storage'),
	elemListTask = document.querySelector('#list__task'),
	modalAddTask = document.querySelector('#modalAddTask'),
	modalEditTask = document.querySelector('#modalEditTask'),
	elemInputAddTask = document.querySelector('#modal__input-add-task'),
	elemButtonModalAddTask = document.querySelector('#modal__button-add-task'),
	elemInputEditTask = document.querySelector('#modal__input-edit-task'),
	elemButtonEditTask = document.querySelector('#modal__button-edit-task'),
	errorMessage = document.querySelector('#row__error');

clearStorage.addEventListener('click', () => {
	localStorage.clear();
	document.querySelectorAll('li').forEach(item => elemListTask.removeChild(item))
})
buttonAddTask.addEventListener('click', openModalAddTask);

elemButtonModalAddTask.addEventListener('click', setAddTask)


if (localStorage.length != 0) {
	getTaskLocalStorage()
}

function openModalAddTask() {
	modalAddTask.classList.toggle('active');
}

function getTaskLocalStorage() {

	const elemArrayTask = [];

	for(let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i)
		let task;
		task = JSON.parse(localStorage.getItem(key));

		elemArrayTask.push(task);
	}

	renderTask(elemArrayTask);
}

function renderTask(arrayTask) {
	elemListTask.innerHTML = '';

	arrayTask.forEach((task) => {
		let elemTask = `<li data-id='${task.id}' data-checked='${task.checked}' data-status='${task.status}' class="list__task-item">
			<div class="list__task-text">
				<span class='list__task-checked' id="toggel" >+</span>
				<p class="list__task-input">
				${task.title}
				</p>
				<p class="list__task-status">
				${task.status}
				</p>
			</div>
			<div class="list__task-btn">
				<button id="delete">Del</button>
				<button id="edit">Edit</button>
			</div>
		</li>`;


		elemListTask.insertAdjacentHTML('afterbegin', elemTask);
	})

	
}

function setAddTask() {
	errorMessage.innerText = '';
	let elemTask;

	if (elemInputAddTask.value === '') {
		errorMessage.innerText = 'Введите пожалуйста задачу!!!';
	} else if (statusText.innerText === 'Статус') {
		elemTask = {
			id: `${++localStorage.length}`,
			title: elemInputAddTask.value,
			status: '',
			checked: false,
		}

		localStorage.setItem(`${++localStorage.length}`, JSON.stringify(elemTask));
		getTaskLocalStorage();
		
	} else {
		elemTask = {
			id: `${++localStorage.length}`,
			title: elemInputAddTask.value,
			status: statusText.innerText,
			checked: false,
		}

		localStorage.setItem(`${++localStorage.length}`, JSON.stringify(elemTask));
		getTaskLocalStorage();
		
		}

	elemInputAddTask.value = '';
	statusText.innerText = 'Статус';

}

elemListTask.addEventListener('click', (event) => {
	let item = event.target.parentElement.parentElement;

	if (event.target.id === 'delete') {
		deleteElemTask(item);
	} else if (event.target.id === 'edit') {
		editElemTask(item);
	} else if (event.target.id === 'toggel'){
		toggelTask(item)
	}
})

function toggelTask(item) {
	const getTask = localStorage.getItem(`${item.dataset.id}`);
	const task = JSON.parse(getTask);

	task.checked = !task.checked;

	localStorage.setItem(`${item.dataset.id}`, JSON.stringify(task));
	getTaskLocalStorage();
}

function deleteElemTask(item) {
	localStorage.removeItem(`${item.dataset.id}`)

	getTaskLocalStorage();
}

function editElemTask(item) {
	const getTask = localStorage.getItem(`${item.dataset.id}`);
	const task = JSON.parse(getTask);

	elemInputEditTask.value = task.title;
	editText.innerText = task.status;

	openModalEditTask();

	elemButtonEditTask.addEventListener('click', eventButtonEditTask)

	function eventButtonEditTask() {
		task.title = elemInputEditTask.value;
		task.status = editText.innerText;

		localStorage.setItem(`${item.dataset.id}`, JSON.stringify(task));
		modalEditTask.classList.remove('active');
		getTaskLocalStorage();
	}
}

function openModalEditTask() {
	modalEditTask.classList.toggle('active');
}