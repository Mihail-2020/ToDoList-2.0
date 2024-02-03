const optionMenu = document.querySelector('.status__menu'),
		statusOption = document.querySelectorAll('.statis__option'),
		options = document.querySelectorAll('.option'),
		statusText = document.querySelector('.status__text'),
        editMenu = document.querySelector('.edit__menu'),
        statusEditOption = document.querySelectorAll('.edit__option'),
        editText = document.querySelector('.edit__text'),
        editOptions = document.querySelectorAll('.edit-option');

statusOption.forEach(status => {
    status.addEventListener('click', () => optionMenu.classList.toggle('active'));
})

options.forEach(option => {
    option.addEventListener('click', () => {
        const selectOption = option.querySelector('.option__text').innerText;
        statusText.innerText = selectOption;

        optionMenu.classList.remove('active');
    })
})

statusEditOption.forEach(status => {
    status.addEventListener('click', () => editMenu.classList.toggle('active'));
})

editOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectOption = option.querySelector('.edit-option__text').innerText;
        editText.innerText = selectOption;

        editMenu.classList.remove('active');
    })
})