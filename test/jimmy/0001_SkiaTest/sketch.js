let y = 100;

function drawFrame(canvas) {
  canvas.clear(CanvasKit.Color(255, 255, 255, 1.0));

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

function toBase64String(bytes) {
  if (typeof Buffer !== 'undefined') {
    // Are we on node?
    return Buffer.from(bytes).toString('base64');
  } else {
    // From https://stackoverflow.com/a/25644409
    // because the naive solution of
    //     btoa(String.fromCharCode.apply(null, bytes));
    // would occasionally throw "Maximum call stack size exceeded"
    var CHUNK_SIZE = 0x8000; //arbitrary number
    var index = 0;
    var length = bytes.length;
    var result = '';
    var slice;
    while (index < length) {
      slice = bytes.slice(index, Math.min(index + CHUNK_SIZE, length));
      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }
    return btoa(result);
  }
}

// The statements in the setup() function
// execute once when the program begins
function setup() {
  background(0);

  // Canvas emulator
  let skcanvas = CanvasKit.MakeCanvas(300, 300);
  let ctx = skcanvas.getContext('2d');
  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, 300, 300);
  document.getElementById('my_image').src = skcanvas.toDataURL();
  skcanvas.dispose();

  // Off-screen Render to <img>
  let surface0 = CanvasKit.MakeSurface(300, 300);
  const canvas0 = surface0.getCanvas();
  drawFrame(canvas0);
  const img0 = surface0.makeImageSnapshot();
  const pngBytes0 = img0.encodeToBytes();
  const b64encoded = toBase64String(pngBytes0);
  document.getElementById(
    'my_image2'
  ).src = `data:image/png;base64,${b64encoded}`;

  // Draw Off-screen buffer
  const surface3 = CanvasKit.MakeCanvasSurface('my_canvas3');
  const canvas3 = surface3.getCanvas();
  canvas3.drawImage(img0, 0, 0, null);
  surface3.flush();

  // Software Renderer
  const surface = CanvasKit.MakeSWCanvasSurface('my_canvas');
  if (!surface) {
    console.error('Could not make surface');
    return;
  }
  const canvas = surface.getCanvas();
  drawFrame(canvas);
  surface.flush();

  // Hardware Renderer
  const surface2 = CanvasKit.MakeCanvasSurface('my_canvas2');
  if (!surface2) {
    console.error('Could not make surface');
    return;
  }
  const canvas2 = surface2.getCanvas();
  drawFrame(canvas2);
  surface2.flush();

  createCanvas(300, 300, SKIA);

  const surfaceP5 = CanvasKit.MakeCanvasSurface('defaultCanvas0');
  if (!surfaceP5) {
    console.error('Could not make surface');
    return;
  }
  const canvasP5 = surfaceP5.getCanvas();
  drawFrame(canvasP5);
  surfaceP5.flush();
}
// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {}
