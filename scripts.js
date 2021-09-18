$(document).ready(function(){
    const inputs = document.querySelectorAll('.form-control, .form-select');

    for (let input of inputs) {
        input.addEventListener('focus', (event) => {
            input.parentNode.parentNode.querySelector('label').style.color = '#00897B';
        });

        input.addEventListener('blur', (event) => {
            input.parentNode.parentNode.querySelector('label').style.color = '#8B8B8B';
        });
    }

});




