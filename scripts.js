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

    function Departamento(){
        $.getJSON('https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json', function(data){
            data.forEach(function(obj){
                $('#department').append($('<option>' ,{
                    'value': obj.departamento,
                    'text': obj.departamento
                }));
            })

        });

    }

    Departamento();

    function Municipio()
    {
        $('#municipio').empty();
       let dpto = $("#department").val();
        $.getJSON('https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json', function(data)
        {
            data.forEach(function(obj)
            {
                if(obj.departamento===dpto)
                {
                    let mnp = obj.ciudades;
                    mnp.forEach(element => $('#municipio').append($('<option>',{
                        'value': element,
                        'text': element
                    })));
                }
            })
        });
    }
    
    $("#department").on("change",Municipio);

    
});

const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);

    console.log(formObj);

    const name = document.getElementById('name');
    const lastname = document.getElementById('lastname');
    const country = document.getElementById('country');
    const department = document.getElementById('department');
    const municipio = document.getElementById('municipio');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');

    validation(
        name, [formObj['name'] == '', formObj['name'].length > 25], ['Campo obligatorio', 'Longitud máxima: 25']
    );

    validation(
        lastname, [formObj['lastname'] == '', formObj['lastname'].length > 25], ['Campo obligatorio', 'Longitud máxima: 25']
    );

    validation(
        country, [formObj['country'] == ''], ['Campo obligatorio']
    );

    validation(
        department, [formObj['department'] == ''], ['Campo obligatorio']
    );

    validation(
        municipio, [formObj['municipio'] == ''], ['Campo obligatorio']
    );

    validation(
        username, [
            formObj['username'] == '',
            formObj['username'].length > 20,
            formObj['username'].length < 10,
            formObj['username'].match(/^[a-zA-Z0-9]+$/)==null
        ], [
            'Campo obligatorio',
            'La longitud debe estar entre 10 y 20 carácteres',
            'La longitud debe estar entre 10 y 20 carácteres',
            'El nombre de usuario no debe tener carácteres especiales'
        ]
    );

    validation(
        password, [
            formObj['password'] == '',
            formObj['password'].length > 20,
            formObj['password'].length < 10,
            formObj['password'].match(new RegExp('(?=.*[!#%/&])'))==null
        ], [
            'Campo obligatorio',
            'La longitud debe estar entre 10 y 20 carácteres',
            'La longitud debe estar entre 10 y 20 carácteres',
            'La contraseña debe contener al menos de uno de estos carácteres especiales #,%,/,&'
        ]
    );

    validation(
        password2, [
            formObj['password2'] == '',
            formObj['password2'] != formObj['password']
        ], [
            'Campo obligatorio',
            'Las contraseñas deben coincidir'
        ]
    );
});

function validation(input, conditions, messages) {
    for (let i in conditions) {
        let condition = conditions[i];

        if (condition) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            input.parentNode.querySelector('.invalid-feedback').innerText = messages[i];
            break;
        } else {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
            input.parentNode.querySelector('.invalid-feedback').innerText = '';
        }
    }
}



