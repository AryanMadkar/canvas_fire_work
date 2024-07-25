import utils, { randomColor } from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.background = "black";
canvas.style.overflow = "hidden";
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = [
  "#FFB200",
  "#EB5B00",
  "#E4003A",
  "#180161",
  "#FFC700",
  "#C40C0C",
  "#5D0E41",
  "#00224D",
];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

let gravity = 0.005;
let friction = 0.99;
// Objects
class particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    this.draw();
    // this.velocity.x *= friction;
    // this.velocity.y *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.003;
  }
}

// Implementation
let particle1;
function init() {
  particle1 = [];
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  // c.clearRect(0, 0,canvas.width, canvas.height);
  particle1.forEach((particle) => {
    if (particle.alpha > 0) {
      particle.update();
    }
    else{
      particle1.splice(particle1.indexOf(particle), 1);
      
    }
  });
}

init();
animate();

window.addEventListener("click", () => {
  const x = mouse.x;
  const y = mouse.y;
  const radius = 5;
  let particle_count = 400;
  let angleincrement = (Math.PI * 2) / particle_count;

  for (let i = 0; i < particle_count; i++) {
    const color = randomColor(colors);
    particle1.push(
      new particle(x, y, radius, color, {
        x: Math.cos(angleincrement * i) * Math.random() * 3,
        y: Math.sin(angleincrement * i) * Math.random() * 3,
      })
    );
  }
});
