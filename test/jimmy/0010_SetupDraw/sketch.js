let y = 100;
var surface;
var canvasSurface;
let realCanvas;
let skcanvas;
let img;

function drawFrame(canvas) {
  const paint = new CanvasKit.Paint();
  paint.setStrokeWidth(1.0);
  paint.setAntiAlias(true);
  paint.setColor(CanvasKit.Color(0, 0, 0, 1.0));
  paint.setStyle(CanvasKit.PaintStyle.Stroke);

  const path = new CanvasKit.Path();
  path.moveTo(20, 5);
  path.lineTo(30, 20);
  path.lineTo(40, 10);
  path.lineTo(50, 20);
  path.lineTo(60, 0);
  path.lineTo(20, 5);

  path.moveTo(20, 80);
  path.cubicTo(90, 10, 160, 150, 190, 10);

  path.moveTo(36, 148);
  path.quadTo(66, 188, 120, 136);
  path.lineTo(36, 148);

  path.moveTo(150, 180);
  path.arcToTangent(150, 100, 50, 200, 20);
  path.lineTo(160, 160);

  path.moveTo(20, 120);
  path.lineTo(20, 120);

  canvas.drawPath(path, paint);

  const rrect = CanvasKit.RRectXY([100, 10, 140, 62], 10, 4);

  const rrectPath = new CanvasKit.Path().addRRect(rrect, true);

  canvas.drawPath(rrectPath, paint);

  rrectPath.delete();
  path.delete();
  paint.delete();
}

// The statements in the setup() function
// execute once when the program begins
function setup() {
  // createCanvas must be the first statement
  const c = createCanvas(720, 400);
  realCanvas = c.canvas;
  skcanvas = CanvasKit.MakeCanvas(720, 400);
  img = createImg(
    'https://p5js.org/assets/img/asterisk-01.png',
    'the p5 magenta asterisk'
  );

  stroke(128); // Set line drawing color to white
  frameRate(30);

  console.log(realCanvas);
  console.log(skcanvas);
  surface = CanvasKit.MakeSurface(720, 400);
  canvasSurface = CanvasKit.MakeSWCanvasSurface('defaultCanvas0');
  console.log(surface);
  console.log(canvasSurface);

  //canvasSurface.drawOnce(drawFrame);
}
// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {
  drawFrame(canvasSurface.getCanvas());
  canvasSurface.flush();
  /*
  const img = surface.makeImageSnapshot();
  if (!img) {
    console.error('no snapshot');
    return;
  }
 
  const subCanvas = surface.getCanvas();
  drawFrame(subCanvas);
  const img = surface.makeImageSnapshot();
  if (!img) {
    console.error('no snapshot');
    return;
  }
  const pngBytes = img.encodeToBytes();
  if (!pngBytes) {
    console.error('encoding failure');
    return;
  }
  console.log(pngBytes);
  // See https://stackoverflow.com/a/12713326
  //let b64encoded = Buffer.from(pngBytes).toString('base64');
  //console.log(`<img src="data:image/png;base64,${b64encoded}" />`);
  //image(img, 0, 0, null);
  
  background(0); // Set the background to black
  */
  y = y - 1;
  if (y < 0) {
    y = height;
  }
  line(0, y, width, y);
}
