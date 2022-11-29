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
        const id = aloner.posts.length
            if (!htmlOnly){
                //Cria Posts na memória (Array/Objeto)
                aloner.posts.push({
                    id: aloner.posts.length+1,
                    owner: dados.owner, 
                    title: dados.title,
                    content: dados.content
        });
    }   
        //Cria post no HTML
        const $listaDePosts = document.querySelector('.listaDePosts');

        $listaDePosts.insertAdjacentHTML('afterbegin', 
        `<li data-id="${id}"class='titulo'>
                ${dados.title}
            </li>`)
        const $titulo = document.querySelector('.titulo');
        $titulo.insertAdjacentHTML('beforeend', 
        `<ul>
            <li class='conteudo'>
                ${dados.content}
            </li>
        </ul>
        <button class="btn-delete">Delete</button>`)
    },
    deletaPost(id){
        const listAtualizadaDePosts = aloner.posts.filter((postAtual)=>{
            return postAtual.id !== Number(id);
        })
        aloner.posts = listAtualizadaDePosts;
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


//CRUD - Delete

document.querySelector('.listaDePosts').addEventListener('click', 
function (infosDoEvento){
    console.log('Houve um click')
    const isBtnDeleteClick = infosDoEvento.target.classList.contains('btn-delete')
    const elementoAtual = infosDoEvento.target
    if(isBtnDeleteClick){
        console.log('Clicou no botão de apagar')
        const id = elementoAtual.parentNode.getAttribute('data-id');
        aloner.deletaPost({id})
        elementoAtual.parentNode.remove()

    }
})

/*

criaPost({owner:'Zeymer', content:'Segundo Post'})
criaPost({owner:'Zeymer', content:'Terceiro Post'})

};
/*
//CREATE

//READ
function pegaPosts (){
    return aloner.posts
}

//UPDATE

function atualizaConteudoPost(id, novoConteudo){
    const postPraAtualizar = pegaPosts().find(post =>{
        return post.id === id;
    })

console.log(pegaPosts().find)
}

atualizaConteudoPost(1, "Novo conteúdo do Post")


//DELETE

function apagaPost(id){
    aloner.posts.pop(id)
    aloner.posts = listAtualizadaDePosts
    
}

apagaPost(2);
console.log(aloner.posts)
*/