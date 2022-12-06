//CRUD

//CRUD - App compilador de recados

const bloco = {
    autores:[
        {
            autor:'Zeymer',
        }
    ],
    recados: [
        
    ],
    recuperaRecados(){
        bloco.recados.forEach(({autor, titulo, conteudo})=>{
        bloco.criaRecado({autor: autor, titulo: titulo, conteudo: conteudo}, true)
        })
    },
    criaRecado(dados, htmlOnly = false){   
        const idRecado = Date.now();
            if (!htmlOnly){
                //Cria Posts na memória (Array/Objeto)
                bloco.recados.push({
                    id: dados.id || idRecado,
                    autor: dados.autor, 
                    titulo: dados.titulo,
                    content: dados.conteudo
        });
    }   
        //Cria post no HTML
        const $listaDeRecados = document.querySelector('.listaDeRecados');

        $listaDeRecados.insertAdjacentHTML('afterbegin', 
        `<li data-id="${idRecado}"class='titulo'>
        
            <span contenteditable>
                ${dados.titulo}
            </span>
        </li>`)
        const $titulo = document.querySelector('.titulo');
        $titulo.insertAdjacentHTML('beforeend', 
        `<ul>
            <li data-id="${idRecado}" class='conteudo'>
                <span contenteditable>
                    ${dados.conteudo}
                </span>
            </li>
            </ul>
            <ul>
            <li class="autor">
                ${dados.autor}</li>
            </li>
        </ul>
        <button class="btn-delete">Delete</button>`)
    },
    deletaRecado(id){
        const listAtualizadaDeRecados = bloco.recados.filter((recadoAtual)=>{
            return recadoAtual.id !== Number(id);
        })
        bloco.recados = listAtualizadaDeRecados;
    },
    atualizaConteudoDoPost(id, novoConteudo){
        const recadoPraAtualizar = bloco.recados.find((recado) =>{
            return recado.id === Number(id);
        })
    }
};


//CRUD  - Create!
const $meuForm = document.querySelector('form');

$meuForm.addEventListener('submit', function criaRecadoController(infosDoEvento){
    infosDoEvento.preventDefault();
    console.log('Criando recado novo');
    
    const $campoRecadoTitulo= document.querySelector('input[name="titulo-recado"]');
    const $campoRecadoConteudo= document.querySelector('input[name="conteudo-recado"]');

    console.log($campoRecadoTitulo.value)
    console.log($campoRecadoConteudo.value)

    bloco.criaRecado({autor: 'Zeymer', titulo:$campoRecadoTitulo.value, conteudo:$campoRecadoConteudo.value});

    //Limpar campos
    $campoRecadoTitulo.value = '';
    $campoRecadoConteudo.value = '';
})

//CRUD  - Read!
bloco.recuperaRecados();

//CRUD - Update
document.querySelector('.listaDeRecados').addEventListener('input', function (infosDoEvento){
    console.log('Houve uma digitação')
    const elementoAtual = infosDoEvento.target
    const id = elementoAtual.parentNode.getAttribute('data-id')

    console.log('Valor: ',elementoAtual.innerText);
    console.log('Tag: ',elementoAtual.innerHTML);
    console.log('ID: ', id)
    bloco.atualizaConteudoDoRecado(id, elementoAtual.innerText)
});

//CRUD - Delete

document.querySelector('.listaDeRecados').addEventListener('click', 
function (infosDoEvento){
    console.log('Houve um click')
    const isBtnDeleteClick = infosDoEvento.target.classList.contains('btn-delete')
    const elementoAtual = infosDoEvento.target
    if(isBtnDeleteClick){
        console.log('Clicou no botão de apagar')
        const id = elementoAtual.parentNode.getAttribute('data-id');
        
        //Manipula o Server-side/Banco de dados/Arquivo/Fonte        
        bloco.deletaRecado({id})

        //Manipula o View/Output/Tela do navegador
        elementoAtual.parentNode.remove()

    }
})