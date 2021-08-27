let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); /* renderiza o desenho que vai acontecer dentro do Canvas, sendo selecionado o plano 2d */
let box = 32; /* 32pixels cada quadradinho,tamanho*/
let snake = [];
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
//fazer com que a comidinha apareça em varios lugares(com numeros aleatorios)
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box //vai gerar numeros aleatorios
}

function criarBG(){
    context.fillStyle = "lightgreen"; /* a cord do 2d context*/
    context.fillRect(0, 0, 16*box, 16*box); /* vai desenhar nosso retangulo, sendo trabalho com 4 parâmetros (x,y,altura e largura*/
}

function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
//funçao de criar a comidinha da cobrinha 
function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

/* conectando o toque da minha tecla para a cobrinha saber a direçao que vai*/
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';  /*se o nosso botao for o 37 e a nossa direçao nao for "right" a gente muda para baixo*/
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}
/*criar funçao de tempo para atualizar a pag e a cobrinha "comer" e ficar naior*/
function iniciarJogo(){    
/*lembre-se imitando um plano cartesiano x,y... quando chegar na lateral do quadrado (maximo do x ou y) ela vai receber o valor = 0 e ir "iniciar"*/
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0; // se ela passar o limite da tela na direita a cobra reseta e volta pela esquerda
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    //funcao da cobrinha quando se choca com ela mesmo, definindo o fim do jogo (i-corpo 0-cabeça)
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Fim do Jogo :( ');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x; /*posiçao da cobrinha*/
    let snakeY = snake[0].y;
/* direçoes da cobrinha*/
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
// almentando a cobrinha, fazendo a funçao do tamanho e a funçao da comidinha aparecer em varios lugares após isso
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo = setInterval(iniciarJogo, 100); /*aqui é o intervalo de 100mili seg. para sempre ser atualizada e nao travar*/