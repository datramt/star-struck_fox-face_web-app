// :star-struck: :fox-face: by Dan Tramte
// web app for mobile devices to be used in performance of :star-struck: :fox-face:

const fmSynth = new Tone.FMSynth({
  harmonicity: 1 / 2,
  modulationIndex: 100,
  detune: 9,
  oscillator: {
    type: "square"
  },
  envelope: {
    attack: 0.01,
    decay: 0.01,
    sustain: 1,
    release: 0.5
  },
  modulation: {
    type: "sawtooth"
  },
  modulationEnvelope: {
    attack: 0.01,
    decay: 0,
    sustain: 1,
    release: 0.5
  }
}).toMaster();

const amSynth = new Tone.AMSynth({
  harmonicity: 1.01,
  detune: 5,
  oscillator: {
    type: "sawtooth"
  },
  envelope: {
    attack: 0.01,
    decay: 0.01,
    sustain: 1,
    release: 0.5
  },
  modulation: {
    type: "square"
  },
  modulationEnvelope: {
    attack: 0.01,
    decay: 0,
    sustain: 1,
    release: 0.5
  }
}).toMaster();

let emojis = []
let currentEmoji = 0

function setup() {
  cnv = createCanvas(windowWidth, windowHeight)
    .mouseClicked(() => {
      Tone.start()
    })
  emojis = ["🤩", "🦊"]
  drawEmoji()
  drawNav()
}

drawEmoji = () => {
  background(255);
  let emojiSize = windowWidth >= windowHeight ?
    0.75 * windowHeight :
    0.75 * windowWidth

  textSize(emojiSize)
  text(emojis[currentEmoji], windowWidth / 2 - emojiSize / 2, windowHeight / 2 + emojiSize / 2 - 0.1 * windowHeight)
}

drawNav = () => {
  stroke(255)
  strokeWeight(5)
  fill(240)
  let navEmojiSize = 0.1 * windowHeight
  textSize(navEmojiSize)
  rect(0, height - 0.15 * windowHeight, windowWidth / 2, 0.15 * windowHeight)
  text(emojis[0], windowWidth / 4 - navEmojiSize / 2, height - 0.08 * windowHeight + navEmojiSize / 2)
  rect(windowWidth / 2, height - 0.15 * windowHeight, windowWidth / 2, 0.15 * windowHeight)
  text(emojis[1], windowWidth * 3 / 4 - navEmojiSize / 2, height - 0.08 * windowHeight + navEmojiSize / 2)
}



function mouseClicked() {
  if (mouseX > 0 && mouseX < windowWidth / 2 && mouseY > windowHeight * 0.85 && mouseY < windowHeight) {
    currentEmoji = 0
    drawEmoji()
    drawNav()
  }

  if (mouseX > windowWidth / 2 && mouseX < windowWidth && mouseY > windowHeight * 0.85 && mouseY < windowHeight) {
    currentEmoji = 1
    drawEmoji()
    drawNav()
  }
}

function touchStarted() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < 0.85 * windowHeight) {
    if (currentEmoji === 0) {
      fmSynth.triggerAttack("C" + floor(map(mouseY, windowHeight*0.85, 0, 0, 7)))
    } else if (currentEmoji === 1) {
      amSynth.triggerAttack("G" + floor(map(mouseY, windowHeight*0.85, 0, 0, 7)))
    }
  }
}

function mouseReleased() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < 0.85 * windowHeight) {
    if (currentEmoji === 0) {
      fmSynth.triggerRelease()
    } else if (currentEmoji === 1) {
      amSynth.triggerRelease()
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawEmoji()
  drawNav()
}

function deviceTurned() {
  resizeCanvas(windowWidth, windowHeight);
  drawEmoji()
  drawNav()
}