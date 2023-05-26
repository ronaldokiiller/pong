//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 18;
let raio = diametro / 2;

//velocidade da Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da minha raquete
let xMinhaRaquete = 10;
let yMinhaRaquete = 155;
let velocidadeMinhaRaquete = 6;

//variaveis da raquete oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 155;

//variaveis comuns para as duas raquetes
let larguraRaquete = 8;
let alturaRaquete = 88;

//outras variaveis
let colidiu = false;

//placar
let meusPontos = 0;
let pontosOponente = 0;

//variaveis para sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  //trilha.loop();
}

function draw() {
  background(0);

  mostraBolinha();

  movimentaBolinha();

  verificaColisaoBorda();

  mostraRaquete(xMinhaRaquete, yMinhaRaquete);

  mostraRaquete(xRaqueteOponente, yRaqueteOponente);

  movimentaMinhaRaquete();

  movimentaRaqueteOponente();

  verificaColisaoRaquete(xMinhaRaquete, yMinhaRaquete);

  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);

  incluirPlacar();

  marcarPontos();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, larguraRaquete, alturaRaquete);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yMinhaRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yMinhaRaquete += 10;
  }
}

function movimentaRaqueteOponente() {
  let coeficientePrecisaoMovimento = [
    0,
    0.1,
    0.2,
    0.3,
    0.4,
    0.5,
    0.6,
    0.7,
    0.8,
    0.9,
    1,
    1.1,
    1.2,
    1.3,
    1.4,
    1.5,
    /*
    1.6,
    1.7,
    1.8,
    1.9,
    2
    */
  ];
  let velocidadeYOponente = 0;

  velocidadeYOponente =
    yBolinha - alturaRaquete * (1 + random(coeficientePrecisaoMovimento));
  //console.log(velocidadeYOponente);
  yRaqueteOponente = velocidadeYOponente;
  /*
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
  */
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    larguraRaquete,
    alturaRaquete,
    xBolinha,
    yBolinha,
    diametro
  );
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluirPlacar() {
  textSize(20);
  textAlign(CENTER);
  fill(color(255, 140, 0));
  stroke(255);
  rect(240, 10, 40, 30);
  rect(320, 10, 40, 30);
  fill(225);
  text(meusPontos, 260, 30);
  text(pontosOponente, 340, 30);
}

function marcarPontos() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosOponente += 1;
    ponto.play();
  }
}
