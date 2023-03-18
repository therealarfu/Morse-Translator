const MORSE = {'!': "-.-.--", '"': ".-..-.", '$': "...-..-", '&': ".-...", "'": ".----.",
'(': "-.--.", ')': "-.--.-", '+': ".-.-.", ',': "--..--", '-': "-....-",
'.': ".-.-.-", '/': "-..-.", '0': "-----", '1': ".----", '2': "..---", '3': "...--",
'4': "....-", '5': ".....", '6': "-....", '7': "--...", '8': "---..", '9': "----.",
':': "---...", ';': "-.-.-.", '=': "-...-", '?': "..--..", '@': ".--.-.", '_': "..--.-",
'A': ".-", 'B': "-...", 'C': "-.-.", 'D': "-..", 'E': ".", 'F': "..-.", 'G': "--.",
'H': "....", 'I': "..", 'J': ".---", 'K': "-.-", 'L': ".-..", 'M': "--",
'N': "-.", 'O': "---", 'P': ".--.", 'Q': "--.-", 'R': ".-.", 'S': "...", 'T': "-",
'U': "..-", 'V': "...-", 'W': ".--", 'X': "-..-", 'Y': "-.--", 'Z': "--..", ' ': "/","\n": "/"}

const mKeys = Object.keys(MORSE)
const mValues = Object.values(MORSE)

const playingAudios = [];
const audioContext = new AudioContext();
let currentEncodeTimeout;

function stopAllAudios() {
  playingAudios.forEach((audio) => {
    audio.stop();
  });
  playingAudios.length = 0;
}

function playDot(context) {
  const oscillator = context.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 800;
  oscillator.connect(context.destination);
  oscillator.start();
  playingAudios.push(oscillator);
  setTimeout(() => {
    oscillator.stop();
  }, 100);
}

function playDash(context) {
  const oscillator = context.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 800;
  oscillator.connect(context.destination);
  oscillator.start();
  playingAudios.push(oscillator);
  setTimeout(() => {
    oscillator.stop();
  }, 300);
}

function stopCurrentEncode() {
  clearTimeout(currentEncodeTimeout);
}

function encode(text, snd) {
  stopCurrentEncode();
  let s = text.toUpperCase()
  let currentChar = ""
  let encodedText = ""

  for (let i = 0; i < s.length; i++) {
    currentChar = s.charAt(i)

    for (let c = 0 ; c < mKeys.length; c++) {
      if (mKeys[c] == currentChar) {
        encodedText += mValues[c] + " "
        break
      }
    }
  }

  encodedText = encodedText.trim()

  if (snd === true) {
    const playNextSound = (index) => {

      if (index < encodedText.length) {
        const char = encodedText.charAt(index);
        if (char === '.') {
          playDot(audioContext);
          currentEncodeTimeout = setTimeout(() => playNextSound(index + 1), 200);
        } else if (char === '-') {
          playDash(audioContext);
          currentEncodeTimeout = setTimeout(() => playNextSound(index + 1), 500);
        } else if (char === ' ' || char === '/') {
          currentEncodeTimeout = setTimeout(() => playNextSound(index + 1), 200);
        }
      }
    }
    playNextSound(0);

  }
  return encodedText;
}

function decode(text) {
    stopCurrentEncode()
    let morsers = text.split(" ")
    let currentChar = ""
    let decodedText = ""

    for (let i = 0; i < morsers.length; i++){
        currentChar = morsers[i]

        for (let c = 0; c < mValues.length; c++) {
            if (currentChar == mValues[c]) {
                decodedText += mKeys[c]
                break
            }
        }
    }
    return decodedText
}

