//CRUD

//Rede - COmeçando o microblog

const aloner = {
    usuarios:[
        {
            username:'Zeymer',
        }
    ],
    posts: [
        {
            id:1,
            owner:'Zeymer',
            content: 'Primeiro post'
        }
    ],
};

//CREATE
function criaPost ({dados}){
    aloner.posts.push({
        id: aloner.posts.length +1,
        owner: dados.owner, 
        content: dados.content
    })
}

criaPost({owner:'Zeymer', content:'Segundo Post'})
criaPost({owner:'Zeymer', content:'Terceiro Post'})

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