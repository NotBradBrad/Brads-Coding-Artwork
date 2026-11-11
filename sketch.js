
let planeX = 450;
let planeY = 225;
let cloudMove = 0;

function setup() {
  createCanvas(900, 600);
  frameRate(60);
  noStroke();
  describe("A nighttime city with moving clouds and a commercial airplane that follows the mouse");
}

function draw() {
  // Smooth airplane movement
  if (
    mouseX >= 0 && mouseX <= width &&
    mouseY >= 0 && mouseY <= height
  ) {
    planeX = lerp(planeX, mouseX, 0.12);
    planeY = lerp(planeY, mouseY, 0.12);
  }

  background(25, 55, 105);

  push();
  scale(1.5);

  // Sky gradient
  for (let y = 0; y < 220; y++) {
    let skyColor = lerpColor(
      color(12, 22, 60),
      color(25, 55, 105),
      y / 220
    );
    stroke(skyColor);
    line(0, y, 600, y);
  }
  noStroke();

  // Moon glow
  for (let i = 100; i > 70; i -= 5) {
    fill(255, 220, 120, 7);
    circle(120, 80, i);
  }

  // Moon
  fill(255, 225, 145);
  circle(120, 80, 75);

  // Moon details
  fill(240, 205, 125, 65);
  circle(105, 68, 15);
  circle(135, 93, 11);
  circle(125, 58, 8);

  // Twinkling stars
  for (let i = 0; i < 45; i++) {
    let x = (i * 137 + 35) % 600;
    let y = (i * 73 + 20) % 230;
    let twinkle = sin(frameCount * 0.035 + i) * 65;

    fill(255, 240, 185, 170 + twinkle);
    circle(x, y, 2 + (i % 3));
  }

  // Moving clouds
  cloudMove += 0.25;
  cloud(60 + (cloudMove % 760) - 100, 100, 1);
  cloud(450 - ((cloudMove * 0.6) % 750), 75, 0.85);

  // Background buildings
  fill(22, 35, 65);
  rect(0, 245, 55, 90);
  rect(130, 225, 55, 110);
  rect(260, 260, 55, 75);
  rect(380, 235, 45, 100);
  rect(550, 250, 50, 85);

  // Building one
  building(33, 200, 100, 135, 30, 30, 40);
  windows(48, 220, 2, 4, 30, 25);

  // Building two
  building(170, 148, 110, 187, 25, 25, 35);
  fill(25, 25, 35);
  rect(200, 125, 50, 25);
  windows(183, 170, 3, 5, 29, 29);

  // Building three
  building(307, 215, 100, 120, 35, 35, 45);
  windows(320, 235, 1, 3, 30, 32, 65, 12);

  // Building four
  building(428, 190, 110, 145, 28, 28, 38);
  fill(28, 28, 38);
  rect(450, 170, 65, 20);
  windows(445, 212, 2, 4, 40, 27);

  // Rooftop antennas
  stroke(95, 100, 115);
  strokeWeight(2);
  line(225, 125, 225, 108);
  line(480, 170, 480, 151);
  noStroke();

  // Antenna lights
  fill(255, 75, 75, 150 + sin(frameCount * 0.08) * 100);
  circle(225, 108, 5);
  circle(480, 151, 5);

  // Sidewalk
  fill(85, 85, 95);
  rect(0, 330, 600, 12);

  // Road
  fill(40, 40, 48);
  rect(0, 342, 600, 58);

  // Road markings
  fill(230, 230, 220);
  for (let x = 25; x < 600; x += 110) {
    rect(x, 369, 55, 5);
  }

  // Airplane
  airplane(planeX / 1.5, planeY / 1.5);

  pop();
}

// Clouds
function cloud(x, y, s) {
  push();
  translate(x, y);
  scale(s);

  fill(100, 125, 160, 180);
  ellipse(-30, 5, 70, 28);
  ellipse(0, -5, 75, 40);
  ellipse(35, 5, 65, 28);

  fill(135, 155, 185, 90);
  ellipse(-5, -12, 55, 20);

  pop();
}

// Buildings
function building(x, y, w, h, r, g, b) {
  fill(r, g, b);
  rect(x, y, w, h);

  fill(0, 0, 0, 35);
  rect(x + w - 12, y, 12, h);

  fill(r + 15, g + 15, b + 15);
  rect(x - 3, y, w + 6, 5);
}

// Building windows
function windows(x, y, cols, rows, gapX, gapY, winW = 16, winH = 17) {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let wx = x + col * gapX;
      let wy = y + row * gapY;

      if ((row + col) % 4 === 0) {
        fill(190, 175, 115);
      } else {
        fill(255, 210, 90);
      }

      rect(wx, wy, winW, winH);

      fill(255, 245, 180, 65);
      rect(wx + 2, wy + 2, winW - 4, 3);
    }
  }
}

// Commercial airplane
function airplane(x, y) {
  push();
  translate(x, y);
  noStroke();

  // Rear horizontal stabilizer
  fill(170, 180, 195);
  beginShape();
  vertex(-76, -2);
  vertex(-103, -15);
  vertex(-112, -15);
  vertex(-97, 4);
  vertex(-75, 8);
  endShape(CLOSE);

  // Vertical tail fin
  fill(205, 55, 65);
  beginShape();
  vertex(-99, 3);
  vertex(-103, -47);
  vertex(-88, -47);
  vertex(-54, -5);
  endShape(CLOSE);

  // Tail accent
  fill(245, 110, 100);
  beginShape();
  vertex(-98, -40);
  vertex(-88, -40);
  vertex(-65, -9);
  vertex(-83, -9);
  endShape(CLOSE);

  // Far wing
  fill(155, 170, 190);
  beginShape();
  vertex(-18, -4);
  vertex(-43, -23);
  vertex(-67, -28);
  vertex(-44, 1);
  vertex(7, 6);
  endShape(CLOSE);

  // Long commercial airplane body
  fill(235, 239, 244);
  beginShape();
  vertex(-105, -8);
  vertex(-90, -14);
  vertex(-65, -18);
  vertex(-30, -18);
  vertex(55, -18);
  vertex(85, -16);
  vertex(103, -12);
  vertex(117, -3);
  vertex(122, 0);
  vertex(117, 6);
  vertex(102, 14);
  vertex(83, 18);
  vertex(55, 18);
  vertex(-30, 18);
  vertex(-65, 16);
  vertex(-90, 12);
  vertex(-105, 8);
  endShape(CLOSE);

  // Lower fuselage shading
  fill(205, 212, 225);
  beginShape();
  vertex(-101, 7);
  vertex(112, 7);
  vertex(90, 16);
  vertex(65, 18);
  vertex(40, 18);
  vertex(-30, 18);
  vertex(-65, 16);
  vertex(-90, 12);
  endShape(CLOSE);

  // Red airline stripe
  fill(210, 55, 65);
  beginShape();
  vertex(-100, 5);
  vertex(116, 5);
  vertex(110, 9);
  vertex(82, 13);
  vertex(-85, 13);
  vertex(-100, 9);
  endShape(CLOSE);

  // Passenger windows
  fill(55, 115, 170);
  for (let wx = -70; wx <= 67; wx += 13) {
    ellipse(wx, -6, 6, 5);
  }

  // Cockpit windows
  fill(40, 85, 135);
  beginShape();
  vertex(88, -13);
  vertex(101, -10);
  vertex(113, -4);
  vertex(94, -5);
  endShape(CLOSE);

  // Main swept-back wing
  fill(185, 197, 213);
  beginShape();
  vertex(-5, 8);
  vertex(28, 8);
  vertex(-15, 39);
  vertex(-72, 44);
  vertex(-49, 34);
  endShape(CLOSE);

  // Wing shading
  fill(155, 170, 190);
  beginShape();
  vertex(-5, 8);
  vertex(28, 8);
  vertex(-15, 39);
  vertex(-30, 39);
  endShape(CLOSE);

  // Wingtip
  fill(210, 55, 65);
  beginShape();
  vertex(-72, 44);
  vertex(-60, 37);
  vertex(-48, 37);
  vertex(-60, 44);
  endShape(CLOSE);

  // Jet engine
  fill(160, 170, 185);
  ellipse(-5, 28, 34, 17);

  fill(70, 80, 100);
  ellipse(9, 28, 10, 14);

  fill(210, 215, 225);
  ellipse(-12, 24, 13, 4);

  // Rear engine detail
  fill(130, 145, 165);
  ellipse(-43, 27, 20, 11);

  // Navigation lights
  fill(255, 65, 65, 170 + sin(frameCount * 0.12) * 85);
  circle(-72, 44, 5);

  fill(100, 255, 150, 180 + sin(frameCount * 0.12) * 65);
  circle(119, 0, 4);

  pop();
}
