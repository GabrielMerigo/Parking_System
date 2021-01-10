let btn = document.getElementById('btn');
patio = false;
btn.addEventListener('click', cadastrarFormulario)

function cadastrarFormulario(e){
    let modeloCarro = document.getElementById('modeloCarro').value;
    let placaCarro = document.getElementById('placaVeiculo').value;
    let clearModel = document.querySelector(".model");
    let clearPlaca = document.querySelector(".placa");

    if(!modeloCarro || !placaCarro){
        alert('Por favor, Preencha os Campos.')
        return false;
    }

    let data = new Date();
    var hours = data.getHours();
    var minute = data.getMinutes();

    clearModel.value = ''
    clearPlaca.value = ''
    clearModel.focus();
    
    car = {
        modelo: modeloCarro,
        placa: placaCarro,
        hora: hours,
        minuto: minute
    }
    
    if(localStorage.getItem('patio') === null){
        let cars = [];
        cars.push(car);
        localStorage.setItem('patio',JSON.stringify(cars));
    }else{
        let cars = JSON.parse(localStorage.getItem('patio'));
        cars.push(car)
        localStorage.setItem('patio', JSON.stringify(cars));
    } 
    mostraPatio();
}

function removerVeiculo(placa){
    let carros = JSON.parse(localStorage.getItem('patio'));
    for(let i = 0; i < carros.length; i++){
        if(carros[i].placa == placa){
            carros.splice(i, 1);
        }
        
        localStorage.setItem('patio', JSON.stringify(carros))
    }
    mostraPatio();  
}


function mostraPatio(){
    let carros = JSON.parse(localStorage.getItem('patio'));
    let carrosResultado = document.getElementById('resultados');
    
    carrosResultado.innerHTML = '';

    for(let i = 0; i < carros.length; i++){
        let modelo = carros[i].modelo;
        let placa = carros[i].placa;
        let hora = carros[i].hora;
        let minutos = carros[i].minuto;
        carrosResultado.innerHTML += '<tr><td>'+modelo+
                                     '</td><td>'+placa+
                                     '</td><td>'+hora+':0'+minutos+
                                     '</td><td><button class="btn btn-danger" onclick="removerVeiculo(\'' + placa + '\')">Remover</button></td>'
                                    '</tr>';
                           
    }
}