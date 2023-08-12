//Iniciando projeto To-Do list para praticar POO
//Função que irá tratar o checkbox
function Checked(element){
    element.style.animation = 'normal desaparecer 2s linear'
    
    
    let liPronto = element.parentNode
     
    if(liPronto.className == 'tarefa'){
        liPronto.className += ' pronto'

        liPronto.addEventListener('animationend', ()=>{
            let idliPronto = liPronto.id.substr(3)

            localStorage.removeItem(idliPronto)
            window.location.reload()
        })
    } else {

    }
    
    
}

//Função criadora de list-itens
function liFactory(aobj, acor, id){
    //Declarando variáveis
    let lista = document.querySelector('#listaToDo')
    let novaLI = document.createElement('li')
    let checkBox = document.createElement('input')
    

    //Setanto a checkbox
    checkBox.type = "checkbox"
    checkBox.className = "checkbox"
    checkBox.setAttribute('onclick', 'Checked(this)')

    //Criando a string como um node para pôr no LI
    let texto = document.createTextNode(aobj.nome)
    
    //Adicionando o que precisa ao LI
    novaLI.appendChild(checkBox)
    novaLI.appendChild(texto)
    novaLI.className = 'tarefa'
    novaLI.style.backgroundColor = acor
    novaLI.id = `id:${id}`
    
    lista.appendChild(novaLI)
}


//Array de componentes usados na aplicação
let componentes = [
    btt1 = document.querySelector('#bttN1'),
    btt2 = document.querySelector('#bttN2'),
    btt3 = document.querySelector('#bttN3'),
    inputTarefa = document.querySelector('#nomeTarefa'),
    ocult = document.querySelector('#ocult')
]

//Classe dos objetos que serão as tarefas
class Tarefa{
    constructor(nome, tipo){
        this.nome = nome
        this.tipo = tipo
    }
}

//Função que vai adicionar tarefa
function adicionar(pri, cor){
    let nomeTarefa = document.querySelector('#nomeTarefa')

    if(nomeTarefa != '' || nomeTarefa != null){
        let novaTarefa = new Tarefa(nomeTarefa.value, pri)
        

        bd.construirTarefa(novaTarefa, cor)

        document.querySelector('#nomeTarefa').value = ''
    }
}

let bd = {
    //Método para setar e reconhecer ids
    id(){
        //Aqui ele pega o valor do id atual
        let idAtual = localStorage.getItem('id')

        //Caso null ele seta um id inicial = 0 e o transforma em número
        if(idAtual === null){
            localStorage.setItem('id', 0)
            return Number(idAtual)
        }

        //Caso o id já exista e não for null ele retorna o atual valor de id + 1
        return Number(idAtual)+1     
    },

    //Método que vai pôr o li em jogo
    construirTarefa(obj, cor){
        let arrayTarefas = []
        let array = []

        for(let i = 0; i < localStorage.length; i++){
            let tarefa = JSON.parse(localStorage.getItem(i))
            if(tarefa == null){
                continue
            }

            arrayTarefas.push(tarefa)
        }

        array = arrayTarefas.filter(x => {
            return(obj.nome == x.nome)
        })

        array = array.filter(x => {
            return(obj.tipo == x.tipo)
        })

        console.log(array)

        //Caso o array filtrado tenha elementos
        if(array.length > 0){
            //Perguntando ao usuário se ele quer realmente setar o objeto
            Swal.fire({
                title: 'Tarefa duplicada',
                text: 'Uma tarefa identica foi encontrada, deseja criar esta mesmo assim?',

                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                confirmButtonColor: '#84e280',

                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if(result.isConfirmed) {
                    //Se true
                    //Obtendo o valor do campo
                    let nomeTarefa = document.querySelector('#nomeTarefa')
            
                    //Caso o campo seja diferente de vazio sete o item
                    if(nomeTarefa.value != ''){
                        liFactory(obj, cor)

                        //Otendo o id atual
                        let ID = this.id()
                

                        //Adicionando ao LocalStorage com novo ID e transformando em número
                        localStorage.setItem(Number(ID),JSON.stringify(obj))

                        //Setando o novo ID
                        localStorage.setItem('id', ID)
                    }
                } else if(result.dismiss === Swal.DismissReason.cancel){
                    console.log('Cancelado')
                }
            }) 

        //Se array.length == 0 então não há arrays repetidos, logo podemos setar normalmente   
        } else {
            //Obtendo o valor do campo
            let nomeTarefa = document.querySelector('#nomeTarefa')

            //Obtendo o id atual
            let ID = this.id()
            
            //Caso o campo seja diferente de vazio sete o item
            if(nomeTarefa.value != ''){
                liFactory(obj, cor, ID)

                //Adicionando ao LocalStorage com novo ID e transformando em número
                localStorage.setItem(Number(ID),JSON.stringify(obj))

                //Setando o novo ID
                localStorage.setItem('id', ID)
            }
        }
    }
}


//Função que mostra os campos
function mostrar(){ 
    componentes[0].style.display = 'inline-block'
    componentes[1].style.display = 'inline-block'
    componentes[2].style.display = 'inline-block'
    componentes[3].style.display = 'inline-block'
    componentes[4].style.display = 'inline-block'

    AnimacaoAbrir()
}

//Função que oculta os campos
function ocultar(){
    componentes[0].style.display = 'none'
    componentes[1].style.display = 'none'
    componentes[2].style.display = 'none'
    componentes[3].style.display = 'none'
    componentes[3].value = ''
    componentes[4].style.display = 'none'

    AnimacaoFechar()
}

//Execuções após o fim da animação
function AnimacaoFechar(){
    let caixa = document.querySelector('#caixaCampo')
    caixa.style.animation = 'normal trans-caixa 1s linear'

    caixa.addEventListener('animationend', ()=>{
        caixa.style.width = '5%'
        caixa.style.height = '30px'
        caixa.style.transition = ''

    componentes[0].style.display = 'none'
    componentes[1].style.display = 'none'
    componentes[2].style.display = 'none'
    componentes[3].style.display = 'none'
    componentes[4].style.display = 'none'
    })
}

//Execuções ao abrir a animação
function AnimacaoAbrir(){
    let caixa = document.querySelector('#caixaCampo')
    caixa.style.animation = 'normal trans-caixa-abrir 0.3s linear'

    componentes[0].style.display = 'none'
    componentes[1].style.display = 'none'
    componentes[2].style.display = 'none'
    componentes[3].style.display = 'none'
    componentes[4].style.display = 'none'

    caixa.addEventListener('animationend', ()=>{
        caixa.style.animation = ''
        caixa.style.width = '40%'
        caixa.style.height = '80px'

    componentes[0].style.display = 'inline-block'
    componentes[1].style.display = 'inline-block'
    componentes[2].style.display = 'inline-block'
    componentes[3].style.display = 'inline-block'
    componentes[4].style.display = 'inline-block'

    notificacao.onshow
    })
}

//Função que vai listar as tarefas
function requisitarTarefas(){
    let arrayTarefas = []

    //Percorrendo o localStorage e se não for "null" setar na array de tarefas
    for(let i = 0; i <= localStorage.length; i++){
        let tarefa = JSON.parse(localStorage.getItem(i))

        if(tarefa == null || undefined){
            continue
        } else {
            tarefa.id = i
            arrayTarefas.push(tarefa)
        }
    }

    //Percorrendo o array de tarefas e criando os elementos
    arrayTarefas.forEach(x => {
        let cor = null;

        //Verificando a prioridade da tarefa e pondo a cor respectiva
        switch(x.tipo){
            case 1:
                cor = "#84e28087"
            break

            case 2:
                cor = "#fca97987"
            break

            case 3:
                cor = "#fd5b5b87"
            break
        }

        liFactory(x, cor, x.id)
    })
}



