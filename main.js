let sound;
let button;
let seconds = 0;
let frame = 1;
let fft;
let spectrum;
let level;

let lipsColor;
let mouthLevel;

let e1, e2;

let volumen;
let mousey;

let startAngle = 0;
const angleVel = 0.1;

let tx1;
let tx2;
let ty1;
let ty2;

// Carga canción de la librería //
function preload(){
  sound = loadSound('assets/sounds/Opera.mp3');
}

function setup() {
  frameRate(60);
  createCanvas(800, 800);
  // button = createButton('Play');

  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  background(100);
  console.log(frame);
  level = amplitude.getLevel();
  mouthLevel = level;

  /* Gráfica */
  // Valores de las variables que dibujarás los triángulos laterales //
  ty1 = mouthLevel*1500;
  ty2 = mouthLevel*1500;
  tx1 = 800 - ty1;
  tx2 = 800 - ty2;

  // Se dibujan los trinángulos laterales // 
  push();
    fill(level*5000);
    noStroke();
    triangle(0, 0, 800, 0, ty1, ty2);
    triangle(0, 800, 800, 800, tx1, tx2);
    triangle(0, 0, 0, 800, ty1, tx1);
    triangle(800, 0, 800, 800, tx1, ty1);
  pop();
    
  /* ----------------------------------------- */
  /* Visualizadores */
  /* ------------------------------------------*/
  {
    /* Visualiza mouseY */
    mousey = width - mouseY;
    push();
      textSize(24);
      fill(0, 255, 0);
      text('MouseY:' + mousey, 10, 60);
    pop();

    /* Visualiza volume */
    sound.setVolume(mousey / 300);
    push();
      textSize(24);
      fill(0, 255, 0);
      text('volume:' + level, 10, 30);
    pop();
  }

  // Lógica para contar los segundos en base a los frames por segundo //
  if(frameCount % 60 == 0) {
    seconds++;
  }

  // Visualiza contados de segundos //
  push();
    textSize(24);
    fill(0, 255, 0);
    text(seconds, 700, 30);
  pop();

  // Batuta //
  push();
    strokeWeight(5)
    fill(100)
    rect(mouseX, mouseY, 20, 20)
    strokeWeight(3)
    stroke('#785428')
    line(mouseX, mouseY, mouseX-50, mouseY-50);
    stroke('#FFFFFF')
    fill('#000000')
    // Lógica de la batuta para cambiar el texto //
    if(mouseY > 550) {
      text('Pianissimo', mouseX-50, mouseY-50);
    } else if (mouseY > 350 && mouseY < 550) {
      text('Mezza voce', mouseX-50, mouseY-50);
    } else if (mouseY > 0 && mouseY < 350) {
      text('Fortissimo', mouseX-50, mouseY-50);
    }
  pop();

  /* Control de estado */
  switch (frame) {
    case 1:
      // Forma de onda
      let waveform = fft.waveform();
      push()
        noFill();
        beginShape();
        stroke(mouthLevel*10000);
        for (let i = 0; i < waveform.length; i++){
          let x = map(i, 0, waveform.length, 0, width);
          let y = map( waveform[i], -1, 1, 0, height);
          vertex(x,y);
        }
        endShape();
      pop();
      
      // Inicio de la canción en el segundo 5 //
      if (seconds == 5 && !sound.isPlaying()) {
        sound.play();
      }
    break;

    case 2:
      // Llamada a la función de muñeco grande hombre (parámetro labios negros) //
        bigVoice(lipsColor = 'black', mouthLevel);
    break;

    case 3: 
    // Llamada a la función de muñecos pequeños //
      smallVocies();
    break;

    case 4:
      // Llamada a la función de muñeco grande mujer (parámetro labios rojos)
      bigVoice(lipsColor = 'red', mouthLevel);
    break;
    
    case 5:
      // Intervalo de tiempo para muñeco grande hombre y mujer y muñecos pequeños //
      if (seconds >= 113 && seconds < 131) {
        smallVocies();
        push();
          scale(0.5);
          bigVoice(color = 'red', level);
        pop();
        push();
          scale(0.5);
          translate(750, 5);
          bigVoice(color = 'black', level);
        pop();
      }
      // Intervalo de tiempo para mmuñeco grande hombre y mujer con mujer en silencio (level por parámetro)
      if (seconds >= 131 && seconds < 134) {
        push();
          scale(0.5);
          bigVoice(color = 'red', level);
        pop();
        push();
          scale(0.5);
          translate(750, 5);
          bigVoice(color = 'black', 0);
        pop();
      }
      // Intervalo de tiempo para mujer en silencio y hombre cantanto (level por parámetro) //
      if (seconds >= 134 && seconds < 138) {
        push();
          scale(0.5);
          bigVoice(color = 'red', 0);
        pop();
        push();
          scale(0.5);
          translate(750, 5);
          bigVoice(color = 'black', level);
        pop();
      }
      // Intervalo de tiempo para mujer cantando y hombre en silencio (level por parámetro)
      if (seconds >= 138 && seconds < 142) {
        push();
          scale(0.5);
          bigVoice(color = 'red', level);
        pop();
        push();
          scale(0.5);
          translate(750, 5);
          bigVoice(color = 'black', 0);
        pop();
      }
      // Intervalo de tiempo para hombre cantando y hombre en silencio (level por parámetro)
      if (seconds >= 141 && seconds < 146) {
        push();
          scale(0.5);
          bigVoice(color = 'red', 0);
        pop();
        push();
          scale(0.5);
          translate(750, 5);
          bigVoice(color = 'black', level);
        pop();
      }
      // Intervalo de tiempo para hombre y mujer cantando (level por defecto en parámetro)
      if (seconds >= 145 && seconds < 150) {
        push();
          scale(0.5);
          bigVoice(color = 'red', level);
        pop();
        push();
          scale(0.5);
          translate(750, 5);
          bigVoice(color = 'black', level);
        pop();
      }
    break;
    
    // Fase final //
    case 6:
    push();
        scale(0.5);
        bigVoice(color = 'red', level);
      pop();
      push();
        scale(0.5);
        translate(750, 5);
        bigVoice(color = 'black', level);
        pop();
        // Intervalo de tiempo para 3 voces pequeñas //
      if (seconds >= 150) {
        push();
          smallVocies();
        pop();
      }
       // Intervalo de tiempo para 6 voces pequeñas //
      if (seconds >= 155) {
        push();
          translate(0, -150)
          smallVocies();
        pop();
      }
      // Intervalo de tiempo para 9 voces pequeñas //
      if (seconds >= 160) {
        push();
          translate(0, -300)
          smallVocies();
        pop();
      }
      // Intervalo de tiempo para láser de concierto //
      if (seconds >= 165) {
        lasers();
      }
    break;
  }

  /* Cambio de control de estado a partir de tiempo */
  {
    if (seconds > 26 && seconds < 65) {
      frame = 2;
    } 
    if (seconds >= 65 && seconds < 73) {
      frame = 3;
    }
    if (seconds >= 74 && seconds < 113) {
      frame = 4;
    }
    if (seconds >= 113 && seconds < 150) {
      frame = 5;
    }
    if (seconds >= 150) {
      frame = 6;
    }
  }
}

// Función para muñeco grande. Se pasa el color de los labios (Hombre-Mujer) y el nivel de amplitud 
// para la batuta por parámetro //
function bigVoice (lipsColor, mouthLevel) {
    /* Dibuja ojo izquierdo */
    push()
      translate(200, 200);
      beginShape();
      vertex(-80,0);
      bezierVertex(-30,-50,30,-50,80,0);
      bezierVertex(30,50,-30,50,-80,0)
    endShape();

    // Nivel de entropía del ojo izquierdo //
    colorMode(HSB, 100)
    fill(mouseY*0.1-10, 100, 100)
    ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),50,50);
    fill(mouseY*0.1-12, 100, 100)
    ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),30,30);
    pop();

    // Dibuja ojo derecho //
    push()
      translate(600, 200);
      beginShape();
      vertex(-80,0);
      bezierVertex(-30,-50,30,-50,80,0);
      bezierVertex(30,50,-30,50,-80,0)
      endShape();

      // Nivel de entropía del ojo derecho
      colorMode(HSB, 100)
      fill(mouseY*0.1-10, 100, 100)
      ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),50,50);
      fill(mouseY*0.1-12, 100, 100)
      ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),30,30);
    pop();

    /* Dibuja boca */
    push();
      stroke(lipsColor);
      strokeWeight(4);  
      ellipse(400, 400, 400, mouthLevel*5000);
    pop();
}

// Función para muñecos pequños. Se dibujan 3 muñecos en el eje X //
function smallVocies () {
  /* Ojos PRIMERA VOZ */
  // Dibuja ojo izquierdo //
  push()
  translate(100, 650);
  scale(0.5)
  beginShape();
  vertex(-80,0);
  bezierVertex(-30,-50,30,-50,80,0);
  bezierVertex(30,50,-30,50,-80,0)
  endShape();

  // Nivel de entropía del ojo izquierdo //
  colorMode(HSB, 100)
  ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),50,50);
  ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),30,30);
  pop();

  // Dibuja ojo derecho //
  push()
  translate(200, 650);
  scale(0.5)
  beginShape();
  vertex(-80,0);
  bezierVertex(-30,-50,30,-50,80,0);
  bezierVertex(30,50,-30,50,-80,0)
  endShape();

  // Nivel de entropía del ojo derecho //
  ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),50,50);
  ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),30,30);
  pop();

  // Dibuja boca //
  stroke('#222222');
    strokeWeight(4);  
  ellipse(150, 720, 100, level*1000);

  /* Ojos SEGUNDA VOZ*/
  push()
  translate(350, 650);
  scale(0.5)
  beginShape();
  vertex(-80,0);
  bezierVertex(-30,-50,30,-50,80,0);
  bezierVertex(30,50,-30,50,-80,0)
  endShape();

  ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),50,50);
  ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),30,30);
  pop();

  push()
  translate(450, 650);
  scale(0.5)
  beginShape();
  vertex(-80,0);
  bezierVertex(-30,-50,30,-50,80,0);
  bezierVertex(30,50,-30,50,-80,0)
  endShape();

  ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),50,50);
  ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),30,30);
  pop();

  stroke('#222222');
  strokeWeight(4);  
  ellipse(400, 720, 100, level*1000);

    /* Ojos TERCERA VOZ*/
    push()
    translate(600, 650);
    scale(0.5)
    beginShape();
    vertex(-80,0);
    bezierVertex(-30,-50,30,-50,80,0);
    bezierVertex(30,50,-30,50,-80,0)
    endShape();

    ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),50,50);
    ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),30,30);
    pop();

    push()
    translate(700, 650);
    scale(0.5)
    beginShape();
    vertex(-80,0);
    bezierVertex(-30,-50,30,-50,80,0);
    bezierVertex(30,50,-30,50,-80,0)
    endShape();

    ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),50,50);
    ellipse(0,random(0, (mouseY-800 + mouseY-800)*0.01),30,30);
    pop();

    stroke('#222222');
    strokeWeight(4);  
    ellipse(650, 720, 100, level*1000);
}

// Función para voces pequeñas junto con voces grandes //
function allVoices () {
  smallVocies();
  push();
    scale(0.5);
    bigVoice(color = 'red', level);
  pop();
  push();
    scale(0.5);
    translate(750, 5);
    bigVoice(color = 'black', level);
  pop();
}

// Función para láser de concierto //
function lasers () {
  for (let i=0; i<8; i++) {
    push();
      fill('blue')
      stroke('blue');
      strokeWeight(1)
      // Dibuja movimiento y posición de círculos izquierdos //
      ellipse(
        i+100 + cos(frameCount*0.01 + i+60)*100,
        i+400 + cos(frameCount*0.01 + i+100)*100,
        i+20,
        i+20
      )
      // Dibuja los láser hacia los círculos izquierdos //
      line(
        300,
        800,
        i+100 + cos(frameCount*0.01 + i+60)*100,
        i+400 + cos(frameCount*0.01 + i+100)*100,
      )
      // Dibuja movimiento y posicón de círculos derechos //
      ellipse(
        i+700 + cos(frameCount*0.01 + i+60)*100,
        i+400 + cos(frameCount*0.01 + i+100)*100,
        i+20,
        i+20
      )
      // Dibuja los láser hacia los círculos derechos //
      line(
        600,
        800,
        i+700 + cos(frameCount*0.01 + i+60)*100,
        i+400 + cos(frameCount*0.01 + i+100)*100,
      )
    pop(); 
  }
}

/* Conmuta botón */
// function swithPlay(){
//   if (!sound.isPlaying()) {
//     sound.play();
//     seconds = 153;
//     button.html('Stop')
//   } else {
//     sound.stop();
//     button.html('Play');
//     seconds = 0;
//   }
// }