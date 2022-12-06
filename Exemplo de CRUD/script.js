//CRUD

//Rede - Começando o microblog

const aloner = {
    usuarios:[
        {
            username:'Zeymer',
        }
    ],
    posts: [
        
    ],
    recuperaPosts(){
        aloner.posts.forEach(({owner, title, content})=>{
        aloner.criaPost({owner: owner, title: title, content: content}, true)
        })
    },
    criaPost (dados, htmlOnly = false){   
        const idInternoAqui = Date.now();
            if (!htmlOnly){
                //Cria Posts na memória (Array/Objeto)
                aloner.posts.push({
                    id: dados.id || idInternoAqui,
                    owner: dados.owner, 
                    title: dados.title,
                    content: dados.content
        });
    }   
        //Cria post no HTML
        const $listaDePosts = document.querySelector('.listaDePosts');

        $listaDePosts.insertAdjacentHTML('afterbegin', 
        `<li data-id="${idInternoAqui}"class='titulo'>
            <span contenteditable>
                ${dados.title}
            </span>
        </li>`)
        const $titulo = document.querySelector('.titulo');
        $titulo.insertAdjacentHTML('beforeend', 
        `<ul>
            <li data-id="${idInternoAqui}" class='conteudo'>
                <span contenteditable>
                    ${dados.content}
                </span>
            </li>
            
        </ul>
        <button class="btn-delete">Delete</button>`)
    },
    deletaPost(id){
        const listAtualizadaDePosts = aloner.posts.filter((postAtual)=>{
            return postAtual.id !== Number(id);
        })
        aloner.posts = listAtualizadaDePosts;
    },
    atualizaConteudoDoPost(id, novoConteudo){
        const postPraAtualizar = aloner.posts.find((post) =>{
            return post.id === Number(id);
        })
    }
};



//CRUD  - Create!
const $meuForm = document.querySelector('form');

$meuForm.addEventListener('submit', function criaPostController(infosDoEvento){
    infosDoEvento.preventDefault();
    console.log('Criando post novo');
    
    const $campoPostTitulo= document.querySelector('input[name="titulo-post"]');
    const $campoPostConteudo= document.querySelector('input[name="conteudo-post"]');

    console.log($campoPostTitulo.value)
    console.log($campoPostConteudo.value)

    aloner.criaPost({owner: 'Zeymer', title:$campoPostTitulo.value, content:$campoPostConteudo.value});

    //Limpar campos
    $campoPostTitulo.value = '';
    $campoPostConteudo.value = '';
})

//CRUD  - Read!
aloner.recuperaPosts();

//CRUD - Update
document.querySelector('.listaDePosts').addEventListener('input', function (infosDoEvento){
    console.log('Houve uma digitação')
    const elementoAtual = infosDoEvento.target
    const id = elementoAtual.parentNode.getAttribute('data-id')

    console.log('Valor: ',elementoAtual.innerText);
    console.log('Tag: ',elementoAtual.innerHTML);
    console.log('ID: ', id)
    aloner.atualizaConteudoDoPost(id, elementoAtual.innerText)
});

//CRUD - Delete

document.querySelector('.listaDePosts').addEventListener('click', 
function (infosDoEvento){
    console.log('Houve um click')
    const isBtnDeleteClick = infosDoEvento.target.classList.contains('btn-delete')
    const elementoAtual = infosDoEvento.target
    if(isBtnDeleteClick){
        console.log('Clicou no botão de apagar')
        const id = elementoAtual.parentNode.getAttribute('data-id');
        
        //Manipula o Server-side/Banco de dados/Arquivo/Fonte        
        aloner.deletaPost({id})

        //Manipula o View/Output/Tela do navegador
        elementoAtual.parentNode.remove()

    }
})