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



