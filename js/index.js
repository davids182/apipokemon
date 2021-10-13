window.onload = function(){
    

    const Base_URL = 'https://pokeapi.co/api/v2/pokemon/';

    /*
    elemento do getElements(element)
    nome = Name
    .nome = Class
    #nome = ID
    abaixo vamos capturar um elemento pelo nome da classe do documento HTML
    */
    search_input = getElements('.search-input');
    search_button = getElements('.search-button');
    content = getElements('.pokemon');
    error_message = getElements('.error');

    var pokemon_name;
    var pokemon;
    var card_item;

        search_button.addEventListener('click', event => {
        pokemon_name = search_input.value.toLowerCase().trim(); //variável recebe o valor do input do HMTL e converte as letras para minúsculo e sem espaços em branco
        start_app(pokemon_name);
    
    });

    function start_app(pokemon_name){
        request_api(Base_URL, pokemon_name);

        setTimeout(function(){  //aguarda o tempo em milisegundos para executar a function
        
            if(pokemon.detail) { // se tiver um detail dentro da variavel pokemon significa que existe erro

                error_message.style.display = 'block';
                content.style.display = 'none';
               

            } else{ // se não tiver um detail significa que foi sucesso

                error_message.style.display = 'none';
                content.style.display = 'flex';
                content.innerHTML = create_content();

            }
        }, 1000); // parametro de tempo

    }

    function create_content(){
        card_item = `
        <div class="pokemon_picture"> 
        <img src="${pokemon.sprites.front_default}" alt="Imagem do ${pokemon.name}">
        </div>
        <div class="pokemon_info">
        <h2 class="name"> Nome: ${pokemon.name}</h2>
        <h3 class="number"> Número: ${pokemon.id}</h3>
        <h3 class="type"> Tipo: ${pokemon.types.map(item => '' + item.type.name).toString()}</h3>
        <h3 class="weitght"> Peso: ${pokemon.weight /100} Kg</h3>
        <h3 class="height"> Altura: ${pokemon.height / 10} M</h3>
        </div>
        `;

        return card_item;
    }

   

    function request_api(url, pokemon_name){
        fetch(url + pokemon_name)   // executa consulta na API igual à chamada do browser
        .then(response => response.json())  // traz a resposta
        .then(data => {     // guarda os dados da resposta
            pokemon  = data;    //variável que está guardando os dados
        })
        .catch(err => console.log(err)); // caso ocorra erro e envia para o console - F12 no browser
        
        if(err = "404"){
            content.innerHTML = '<h1> Pokemon não encontrado! </h1>';;
        }

    }

}

function getElements(element) {
    return document.querySelector(element);
}


