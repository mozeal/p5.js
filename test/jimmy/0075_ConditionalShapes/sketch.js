function setup() {
  createCanvas(400, 400);
  strokeWeight(3);
  //center squares to match circles
  rectMode(CENTER);

  //draw rects to mark far sides
  noStroke();
  fill('beige');
  rect(5, height / 2, 10, height);
  rect(width - 5, height / 2, 10, height);
  fill('orange');
  stroke('brown');
}

function draw() {
  point(mouseX, mouseY);

  //if (test) {doThis; }
  //test: mouseX on far left of canvas
  //doThis: draw a circle at mouseY
  if (mouseX < 10) {
    circle(width / 2, mouseY, 20);
  }

  //test: mouseX on far right of canvas
  //doThis: draw a square at mouseY
  if (mouseX > width - 10) {
    square(width / 2, mouseY, 20);
  }
}
