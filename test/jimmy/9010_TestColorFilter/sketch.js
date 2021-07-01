let img;
let offset = 0;
let easing = 0.05;

let sel0;
let sel1;
let sel2;

function preload() {
  img = loadImage('../assets/moonwalk.jpg'); // Load an image into the program
}

function ColorModeSelected() {
  window.cMode = sel0.value();
}

function TransparentModeSelected() {
  window.tMode = sel1.value();
}

function BlendModeSelected() {
  window.bMode = sel2.value();
}

function setup() {
  sel0 = createSelect();
  sel0.option('RGB');
  sel0.option('RGBA');
  sel0.selected('RGBA');
  sel0.changed(ColorModeSelected);

  sel1 = createSelect();
  sel1.option('Opaque');
  sel1.option('Alpha');
  sel1.selected('Opaque');
  sel1.changed(TransparentModeSelected);

  sel2 = createSelect();
  sel2.option('SrcOver');
  sel2.option('DstOver');
  sel2.option('Src');
  sel2.option('Dst');
  sel2.option('Clear');
  sel2.option('SrcIn');
  sel2.option('DstIn');
  sel2.option('SrcOut');
  sel2.option('DstOut');
  sel2.option('SrcATop');
  sel2.option('DstATop');
  sel2.option('Xor');
  sel2.option('Plus');
  sel2.option('Multiply');
  sel2.option('Screen');
  sel2.option('Overlay');
  sel2.option('Darken');
  sel2.option('Lighten');
  sel2.option('ColorDodge');
  sel2.option('ColorBurn');
  sel2.option('HardLight');
  sel2.option('SoftLight');
  sel2.option('Difference');
  sel2.option('Exclusion');
  sel2.option('Hue');
  sel2.option('Saturation');
  sel2.option('Color');
  sel2.option('Luminosity');
  sel2.selected('SrcOver');
  sel2.changed(BlendModeSelected);
  createCanvas(720, 400);
}

function draw() {
  image(img, 0, 0); // Display at full opacity

  let dx = mouseX - img.width / 2 - offset;
  offset += dx * easing;
  tint(255, 0, 0, 127); // Display at half opacity
  image(img, offset, 0);
}
