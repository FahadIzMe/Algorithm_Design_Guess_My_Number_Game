const button = document.getElementById('btn');
const popup = document.getElementById('pop');
const closebtn = document.querySelector('.cross');
const mainContainer = document.querySelector('.container');

button.addEventListener('click', () => {
    popup.classList.add('openpopup');
    mainContainer.classList.add('blurred');
})

closebtn.addEventListener('click', () => {
    popup.classList.remove('openpopup');
    mainContainer.classList.remove('blurred');
})



