
let notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88];
let letters = ["A", "S", "D", "F", "G", "H", "J"];
let noteNames = ["C", "D", "E", "F", "G", "A", "B"];

let colors = [
  [255, 112, 180],
  [255, 166, 112],
  [255, 219, 115],
  [116, 224, 187],
  [100, 188, 255],
  [150, 142, 255],
  [220, 137, 255]
];

let oscillators = [];
let particles = [];
let activeKeys = [];
let noteTimes = [];
let stars = [];
let waves = [];

let lastNote = "—";
let lastColor = [190, 165, 255];
let totalNotes = 0;

let pianoX = 100;
let pianoY = 445;
let keyW = 100;
let keyH = 155;

function setup() {
  createCanvas(900, 680);
  textFont("Arial");

  for (let i = 0; i < 7; i++) {
    let osc = new p5.Oscillator("sine");
    osc.freq(notes[i]);
    osc.amp(0);
    osc.start();

    oscillators.push(osc);
    activeKeys.push(0);
    noteTimes.push(-1000);
  }

  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      speed: random(0.1, 0.4),
      alpha: random(40, 130)
    });
  }
}

function draw() {
  background(15, 12, 32);

  // Soft background lighting
  noStroke();
  for (let i = 350; i > 0; i -= 12) {
    fill(90, 45, 160, 2);
    ellipse(450, 320, i * 2.2, i * 1.5);
  }

  // Moving background stars
  for (let s of stars) {
    fill(180, 155, 255, s.alpha);
    circle(s.x, s.y, s.size);

    s.y -= s.speed;

    if (s.y < 0) {
      s.y = height;
      s.x = random(width);
    }
  }

  // Fade out notes
  for (let i = 0; i < 7; i++) {
    if (millis() - noteTimes[i] > 180) {
      oscillators[i].amp(0, 0.25);
    }

    activeKeys[i] *= 0.93;

    if (activeKeys[i] < 0.03) {
      activeKeys[i] = 0;
    }
  }

  drawHeader();
  drawMusicDisplay();
  drawVisualizers();
  updateWaves();
  updateParticles();
  drawPiano();
  drawFooter();
}

function drawHeader() {
  textAlign(CENTER);
  noStroke();

  fill(230, 198, 255);
  textSize(39);
  textStyle(BOLD);
  text("MINI MUSIC MAKER", width / 2, 65);

  textStyle(NORMAL);
  fill(165, 151, 200);
  textSize(15);
  text("CREATE MUSIC  •  EXPLORE SOUND  •  HAVE FUN", width / 2, 97);

  stroke(115, 80, 185);
  strokeWeight(2);
  line(245, 118, 655, 118);
  noStroke();
}

function drawMusicDisplay() {
  // Display panel
  fill(27, 22, 52, 225);
  stroke(95, 72, 145);
  strokeWeight(2);
  rect(285, 145, 330, 112, 18);

  noStroke();
  fill(145, 130, 180);
  textAlign(CENTER);
  textSize(13);
  textStyle(NORMAL);
  text("NOW PLAYING", 450, 174);

  fill(lastColor[0], lastColor[1], lastColor[2]);
  textSize(42);
  textStyle(BOLD);
  text(lastNote, 450, 223);

  // Note counter
  fill(145, 130, 180);
  textSize(12);
  textStyle(NORMAL);
  text("NOTES PLAYED: " + totalNotes, 450, 244);
}

function drawVisualizers() {
  // Seven colorful sound visualizers
  for (let i = 0; i < 7; i++) {
    let x = 150 + i * 100;
    let glow = activeKeys[i];

    // Outer glow
    if (glow > 0.1) {
      for (let j = 5; j > 0; j--) {
        noStroke();
        fill(
          colors[i][0],
          colors[i][1],
          colors[i][2],
          7
        );
        circle(x, 335, 55 + glow * 9 + j * 13);
      }
    }

    // Main circle
    noStroke();
    fill(
      colors[i][0],
      colors[i][1],
      colors[i][2],
      120 + glow * 12
    );
    circle(x, 335, 48 + glow * 5);

    // Inner circle
    fill(255, 235);
    circle(x, 335, 12 + glow * 1.5);

    // Animated equalizer bars
    for (let b = 0; b < 5; b++) {
      let barX = x - 20 + b * 10;

      let movement = sin(frameCount * 0.12 + b + i) * 4;
      let barH = 8 + glow * (2 + b % 3) + movement;

      fill(
        colors[i][0],
        colors[i][1],
        colors[i][2],
        190
      );

      rect(barX, 390 - barH, 6, barH, 3);
    }
  }
}

function drawPiano() {
  // Outer piano body
  fill(29, 24, 53);
  stroke(110, 85, 160);
  strokeWeight(3);
  rect(80, 425, 740, 205, 20);

  // Top decorative strip
  noStroke();
  fill(75, 55, 120);
  rect(101, 437, 698, 5, 3);

  // White piano keys
  for (let i = 0; i < 7; i++) {
    let x = pianoX + i * keyW;
    let glow = activeKeys[i];

    noStroke();

    // Key shadow
    fill(105, 95, 135);
    rect(x + 3, pianoY + 5, 94, keyH + 4, 8);

    // Key color
    if (glow > 0.5) {
      fill(colors[i][0], colors[i][1], colors[i][2]);
    } else {
      fill(237, 232, 250);
    }

    rect(x + 2, pianoY, 94, keyH, 8);

    // Key highlight
    fill(255, 255, 255, 45);
    rect(x + 8, pianoY + 7, 82, 10, 5);

    // Keyboard letter
    fill(40, 30, 65);
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(25);
    text(letters[i], x + 49, pianoY + 112);

    textStyle(NORMAL);
    textSize(14);
    text(noteNames[i], x + 49, pianoY + 140);
  }

  // Black piano keys (decorative)
  let blackPositions = [1, 2, 4, 5, 6];

  for (let pos of blackPositions) {
    let x = pianoX + pos * keyW - 17;

    fill(12, 10, 27);
    stroke(65, 50, 95);
    strokeWeight(1);
    rect(x, pianoY, 34, 77, 5);

    noStroke();
    fill(55, 45, 80);
    rect(x + 5, pianoY + 5, 24, 55, 3);
  }
}

function drawFooter() {
  noStroke();
  textAlign(CENTER);
  textStyle(NORMAL);

  fill(160, 145, 190);
  textSize(14);
  text("Press A S D F G H J or click the white piano keys", 450, 654);
}

function updateWaves() {
  for (let i = waves.length - 1; i >= 0; i--) {
    let w = waves[i];

    noFill();
    stroke(w.r, w.g, w.b, w.life);
    strokeWeight(2);

    circle(w.x, w.y, w.size);

    w.size += 3;
    w.life -= 3;

    if (w.life <= 0) {
      waves.splice(i, 1);
    }
  }

  noStroke();
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.life -= 3;

    noStroke();
    fill(p.r, p.g, p.b, p.life);
    circle(p.x, p.y, p.size);

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function playNote(i) {
  userStartAudio();

  // Quiet, controlled audio
  oscillators[i].amp(0.08, 0.02);
  noteTimes[i] = millis();

  activeKeys[i] = 10;

  lastNote = noteNames[i];
  lastColor = colors[i];
  totalNotes++;

  let x = 150 + i * 100;

  // Expanding sound wave
  waves.push({
    x: x,
    y: 335,
    size: 55,
    life: 180,
    r: colors[i][0],
    g: colors[i][1],
    b: colors[i][2]
  });

  // Colorful particles
  for (let j = 0; j < 18; j++) {
    particles.push({
      x: x,
      y: 335,
      vx: random(-3.5, 3.5),
      vy: random(-3.5, 3.5),
      size: random(3, 8),
      life: 255,
      r: colors[i][0],
      g: colors[i][1],
      b: colors[i][2]
    });
  }
}

function keyPressed() {
  if (key.length !== 1) return;

  let pressed = key.toUpperCase();
  let i = letters.indexOf(pressed);

  if (i !== -1) {
    playNote(i);
    return false;
  }
}

function mousePressed() {
  for (let i = 0; i < 7; i++) {
    let x = pianoX + i * keyW;

    if (
      mouseX >= x &&
      mouseX <= x + 96 &&
      mouseY >= pianoY &&
      mouseY <= pianoY + keyH
    ) {
      playNote(i);
      return false;
    }
  }
}
