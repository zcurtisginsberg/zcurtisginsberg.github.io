// This project does what is described in the <p> text of final.html. It makes a toy virtual experiment to play with light hitting a boundary. I had originally wanted to delve into the situation when omega is greater than 90 degrees, but I struggled with getting javascript to take imaginary numbers and the like and it did not enjoy that at all.
// So I've ended up with an experiment that goes beyond what is learnt in highschool physics, without introducting any math, and teaches some new things about the physics of light.
// I will likely try to revisit this project for my MAAD capstone and make something that also discusses the situation when omega is greater than 90 degrees in more depth.
// Until then I hope y'all enjoy this little experiment, learn a thing or two about physics, and try not to blind anyone with a laser pointer trying to implement what you've learned.

const canvasSize = 400;

const INIT = 0; // Define initial state
const TUTORIAL1 = 1; // Define tutorial states
const TUTORIAL2 = 2; 
const TUTORIAL3 = 3; 
const TUTORIAL4 = 4;
const TUTORIAL5 = 5;
const TUTORIAL6 = 6;
const TUTORIAL7 = 7;
const TUTORIAL8 = 8;
const WORKING = 9; // Define working state

let state = INIT; // Initialize the state

let slider; // Initialize Sliders
let slider1;
let slider2;

function setup() { // Define sliders and create canvas
  slider = createSlider(1, 89, 30); // Theta
  slider1 = createSlider(100, 300, 150); // n1
  slider2 = createSlider(100, 1000, 120); // n2
  createCanvas(canvasSize, canvasSize);
}

const r = 140 // Define the length of lines
let theta; // Initialize variables
let n1;
let n2;
let omega;
let R;
let T;
let time = 0;

let a; // Text variables
let b;
let c;
const d = 'Press right arrow to continue';

function draw() {
  time += 1; // Time variable to allow text to apear in sequence
  background(220);
  angleMode(DEGREES);
  
  theta = 180 - slider.value(); // Subtract 180 because 0 at right
  n1 = slider1.value() / 100; // This allows decimal values from slider
  n2 = slider2.value() / 100;
  
  // Make string versions of variables for printing on the canvas later
  n1String = 'n1 = ' + (round(n1, 2)).toString();
  n2String = 'n2 = ' + (round(n2, 2)).toString();
  
  omega = asin((n1 / n2) * sin(theta - 180)); // Define omega from Fresnel Equations, theta - 180 to get coordinates right
  
  thetaString = 'theta = ' + (180 - theta).toString();
  omegaString = 'omega = ' + (round(omega * -1, 0)).toString();
  
  if (omega > -90) {
    R = sq((n1 - n2) / (n1 + n2)); // Define R and T from Griffiths E&M Textbook
    T = (4 * n1 * n2) / sq(n1 + n2);
  }
  else { // When omega is larger than the critical angle, get totally imaginary transmitted energy so this is the state
    R = 1;
    T = 0;
  }

  RString = 'R = ' + (round(R * 100, 1)).toString() + '%';
  TString = 'T = ' + (round(T * 100, 1)).toString() + '%';
  
  if (state === INIT) { // Define title screen
    strokeWeight(1);
    textSize(40);
    text('Light Hitting a Boundary Virtual Experiment', 10, 10, width - 10, height - 10);
    
    textSize(20);
    text('Press right arrow to move forward, press left arrow to go back', 10, height / 2, width - 10, height - 10);
  }
  
  else if (state === TUTORIAL1) { // First tutorial say what each slider does
    strokeWeight(10);
    stroke(20);
    line(width / 2, 0, width / 2, height);
    
    strokeWeight(1);
    textSize(20);
    
    a = 'The first slider controls the angle of incidence: theta';
    b = 'The second slider controls the index of refraction of the first area: n1';
    c = 'The third slider controls the index of refraction of the second area: n2';
    
    if (time < 120) { // Text appears in sequence so it's easier to read
      text(a, 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 240) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 360) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    
      text(c, 10, height / 2, width / 2 - 10, height - 10);
    }
    
    else {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    
      text(c, 10, height / 2, width / 2 - 10, height - 10);
    
      text(d, width / 2 + 10, 3 * height / 4, width / 2 - 10, height - 10);
    }
  }
  
  else if (state === TUTORIAL2) { // Have incident wave appear
    strokeWeight(10);
    stroke(20);
    line(width / 2, 0, width / 2, height);
    
    strokeWeight(3);
    stroke(120);
    line(0, height / 2, width, height / 2);
    
    translate(width / 2, height / 2);
    
    stroke('red');
    line(r * cos(theta), r * sin(theta), 0, 0); // Working in polar coordiantes from center so translating and x and y defined by rcos and rsin
    
    translate(-width / 2, -height / 2);
    
    strokeWeight(1);
    stroke(20);
    textSize(20);
    
    a = 'For example, index of refraction is 1 in a vacuum';
    b = 'Theta is the angle between the gray line and the red (incident) wave, try moving it around';
    c = 'Index of refraction is related to the speed at which light travels in that area';
    
    if (time < 120) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 240) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 360) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    
      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);
    }
    
    else {
      text(a, 10, 10, width / 2 - 10, height - 10);

      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);

      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);

      text(d, width / 2 + 10, 3 * height / 4, width / 2 - 10, height - 10);
    }
  }
  
  else if (state === TUTORIAL3) { // Reflected and transmitted waves appear
    strokeWeight(10);
    stroke(20);
    line(width / 2, 0, width / 2, height);
    
    strokeWeight(3);
    stroke(120);
    line(0, height / 2, width, height / 2);
    
    translate(width / 2, height / 2);
    
    stroke('red');
    line(r * cos(theta), r * sin(theta), 0, 0);
    
    stroke('blue');
    line(r * cos(360 - theta), r * sin(360 - theta), 0, 0); // 360 - theta to get angles right cause of coordinate system
    
    stroke('green');
    line(r * cos(omega), r * sin(omega), 0, 0);
    
    translate(-width / 2, -height / 2);
    
    strokeWeight(1);
    stroke(20);
    textSize(20);
    
    a = 'The angle between the blue wave (reflected) and the gray line is the same angle theta';
    b = 'But the angle omega between the gray line and the green wave (transmitted) depends on theta, n1, and n2';
    c = 'Try moving the sliders around and see how the waves move';
    
    if (time < 120) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 240) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 360) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    
      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);
    }
    
    else {
      text(a, 10, 10, width / 2 - 10, height - 10);

      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);

      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);

      text(d, width / 2 + 10, 3 * height / 4, width / 2 - 10, height - 10);
    }
  }
  
  else if (state === TUTORIAL4) { // Discuss where incident wave energy goes
    strokeWeight(10);
    stroke(20);
    line(width / 2, 0, width / 2, height);
    
    strokeWeight(3);
    stroke(120);
    line(0, height / 2, width, height / 2);
    
    translate(width / 2, height / 2);
    
    stroke('red');
    line(r * cos(theta), r * sin(theta), 0, 0);
    
    stroke('blue');
    line(r * cos(360 - theta), r * sin(360 - theta), 0, 0);
    
    stroke('green');
    line(r * cos(omega), r * sin(omega), 0, 0);
    
    translate(-width / 2, -height / 2);
    
    strokeWeight(1);
    stroke(20);
    textSize(20);
    
    a = 'While the angles are interesting, where the energy goes is arguably more interesting';
    b = 'The energy from the incident wave is split between the reflected and transmitted waves';
    c = 'The proportions of energy, R and T, depend on n1 and n2';
    
    if (time < 120) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 240) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 360) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    
      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);
    }
    
    else {
      text(a, 10, 10, width / 2 - 10, height - 10);

      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);

      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);

      text(d, width / 2 + 10, 3 * height / 4, width / 2 - 10, height - 10);
    }
  }
  
  else if (state === TUTORIAL5) { // Play with proportions of energy
    strokeWeight(10);
    stroke(20);
    line(width / 2, 0, width / 2, height);
    
    strokeWeight(3);
    stroke(120);
    line(0, height / 2, width, height / 2);
    
    translate(width / 2, height / 2);
    
    stroke('red');
    line(r * cos(theta), r * sin(theta), 0, 0);
    
    stroke('blue');
    line(r * cos(360 - theta), r * sin(360 - theta), 0, 0);
    
    stroke('green');
    line(r * cos(omega), r * sin(omega), 0, 0);
    
    translate(-width / 2, -height / 2);
    
    strokeWeight(1);
    stroke(20);
    textSize(20);
    
    a = 'Here the proportions of energy is shown; play with the values of n1 and n2 and see how it changes';
    b = RString + '\n' + TString;
    c = 'Try sliding n1 and n2 all the way to the left, or making one large and the other small';
    
    if (time < 120) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 240) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 360) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    
      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);
    }
    
    else {
      text(a, 10, 10, width / 2 - 10, height - 10);

      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);

      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);

      text(d, width / 2 + 10, 3 * height / 4, width / 2 - 10, height - 10);
    }
  }
  
  else if (state === TUTORIAL6) { // Talk about when omega is greater than 90 degrees
    
    _n1 = 2; // Force to be a certain value to demonstrate idea
    _n2 = 1;
    _theta = 180 - 45;
    _omega = asin((_n1 / _n2) * sin(_theta - 180))
    
    strokeWeight(10);
    stroke(20);
    line(width / 2, 0, width / 2, height);
    
    strokeWeight(3);
    stroke(120);
    line(0, height / 2, width, height / 2);
    
    translate(width / 2, height / 2);
    
    stroke('red');
    line(r * cos(_theta), r * sin(_theta), 0, 0);
    
    stroke('blue');
    line(r * cos(360 - _theta), r * sin(360 - _theta), 0, 0);
    
    stroke('green');
    line(r * cos(_omega), r * sin(_omega), 0, 0);
    
    translate(-width / 2, -height / 2);
    
    strokeWeight(1);
    stroke(20);
    textSize(20);
    
    a = 'What happens when n1 is big, n2 is small, and theta is big? We see that here (ignore the sliders for now)';
    b = 'It seems that the transmitted wave has disappeared';
    c = 'This happens when omega becomes larger than 90 degrees and turns into an imaginary number';
    
    if (time < 120) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 240) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 360) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    
      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);
    }
    
    else {
      text(a, 10, 10, width / 2 - 10, height - 10);

      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);

      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);

      text(d, width / 2 + 10, 3 * height / 4, width / 2 - 10, height - 10);
    }
  }
  
  else if (state === TUTORIAL7) { // Continue discussion of when omega is greater than 90 degrees
    
    _n1 = 2; // Force to be a certain value to demonstrate idea
    _n2 = 1;
    _theta = 180 - 45;
    _omega = asin((_n1 / _n2) * sin(_theta - 180))
    
    strokeWeight(10);
    stroke(20);
    line(width / 2, 0, width / 2, height);
    
    strokeWeight(3);
    stroke(120);
    line(0, height / 2, width, height / 2);
    
    translate(width / 2, height / 2);
    
    stroke('red');
    line(r * cos(_theta), r * sin(_theta), 0, 0);
    
    stroke('blue');
    line(r * cos(360 - _theta), r * sin(360 - _theta), 0, 0);
    
    stroke('green');
    line(r * cos(_omega), r * sin(_omega), 0, 0);
    
    translate(-width / 2, -height / 2);
    
    strokeWeight(1);
    stroke(20);
    textSize(20);
    
    a = "Coding languages don't like to handle imaginary numbers, so when omega would be larger than 90 degrees it returns an undefined value";
    b = 'What has actually happened is that the green wave still exists mathematically';
    c = "But physically that green wave doesn't exist";
    
    if (time < 120) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 240) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 360) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    
      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);
    }
    
    else {
      text(a, 10, 10, width / 2 - 10, height - 10);

      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);

      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);

      text(d, width / 2 + 10, 3 * height / 4, width / 2 - 10, height - 10);
    }
  }
  
  else if (state === TUTORIAL8) { // Prepare for free-play
    strokeWeight(10);
    stroke(20);
    line(width / 2, 0, width / 2, height);
    
    strokeWeight(3);
    stroke(120);
    line(0, height / 2, width, height / 2);
    
    translate(width / 2, height / 2);
    
    stroke('red');
    line(r * cos(theta), r * sin(theta), 0, 0);
    
    stroke('blue');
    line(r * cos(360 - theta), r * sin(360 - theta), 0, 0);
    
    stroke('green');
    line(r * cos(omega), r * sin(omega), 0, 0);
    
    translate(-width / 2, -height / 2);
    
    strokeWeight(1);
    stroke(20);
    textSize(20);
    
    a = 'On the next page all the important values will be displayed';
    b = 'Sliders will work again too';
    c = 'Please play around, try out different combinations, and hopefully learn a bit more about how light interacts between materials';
    
    if (time < 120) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 240) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    }
    
    else if (time < 360) {
      text(a, 10, 10, width / 2 - 10, height - 10);
    
      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);
    
      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);
    }
    
    else {
      text(a, 10, 10, width / 2 - 10, height - 10);

      text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);

      text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);

      text(d, width / 2 + 10, 3 * height / 4, width / 2 - 10, height - 10);
    }
  }
  
  else if (state === WORKING) { // Free-play, important values are printed and full reign is given to the user
    strokeWeight(10);
    stroke(20);
    line(width / 2, 0, width / 2, height);
    
    strokeWeight(3);
    stroke(120);
    line(0, height / 2, width, height / 2);
    
    translate(width / 2, height / 2);
    
    stroke('red');
    line(r * cos(theta), r * sin(theta), 0, 0);
    
    stroke('blue');
    line(r * cos(360 - theta), r * sin(360 - theta), 0, 0);
    
    stroke('green');
    line(r * cos(omega), r * sin(omega), 0, 0);
    
    translate(-width / 2, -height / 2);
    
    strokeWeight(1);
    stroke(20);
    textSize(20);
    
    a = 'Indices of Refraction\n' + n1String + '\n' + n2String;
    b = 'Angles\n' + thetaString + '\n' + omegaString;
    c = 'Energies\n' + RString + '\n' + TString;
    e = 'Red is incident wave\nBlue is reflected wave\nGreen is transmitted wave';

    text(a, 10, 10, width / 2 - 10, height - 10);

    text(b, width / 2 + 10, 10, width / 2 - 10, height - 10);

    text(c, 10, height / 2 + 10, width / 2 - 10, height - 10);
    
    text(e, width / 2 + 10, height / 2 + 10, width / 2 - 10, height - 10);
  }
}

function keyPressed() { // Move forwards or backwards between the pages
  if (keyIsPressed && keyCode === 39) { // Press right arrow to continue
    if (state < WORKING) { // Make sure state doesn't go to far
      state += 1;
      time = 0;
    }
  }
  
  else if (keyIsPressed && keyCode === 37) { // Press left arrow to go back
    if (state <= WORKING && state >= 1) { // Make sure doesn't go past the title page
      state -= 1;
      time = 0;
    }
  }
}