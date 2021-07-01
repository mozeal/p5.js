let img;
let offset = 0;
let easing = 0.05;

function setup() {
  createCanvas(720, 400);
  img = loadImage('../assets/moonwalk.jpg'); // Load an image into the program
}

function draw() {
  tint(0, 255, 0, 127);
  image(img, 0, 0); // Display at full opacity
  let dx = mouseX - img.width / 2 - offset;
  offset += dx * easing;
  tint(255, 0, 0, 127); // Display at half opacity
  image(img, offset, 0);
}
