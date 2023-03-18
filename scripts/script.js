const whiteList = ".-/ ";

const soundButton = document.getElementById("mic")
let soundVerify = false
let currentImg = "styles/images/mute.png"
soundButton.src = currentImg

function encodeText() {
    let textBox = document.getElementById("txt");
    if (textBox.value !== "") {
      stopAllAudios()
      let encodedText = encode(textBox.value, soundVerify);
      textBox.value = encodedText;
    }
  }
  
function decodeText() {
    let textBox = document.getElementById("txt");
    if (textBox.value !== "") {
      let v = false;
      for (let i = 0; i < textBox.value.length; i++) {
        if (whiteList.includes(textBox.value.charAt(i)) === false) {
          v = true;
        }
      }
      if (v === false) {
        let decodedText = decode(textBox.value);
        textBox.value = decodedText;
      }
    }
}

function sndV() {
    soundVerify = !soundVerify
    if (soundVerify) {
      currentImg = "styles/images/unmute.png"
    } else {
      currentImg = "styles/images/mute.png"
    }
    soundButton.src = currentImg
}

function copyText() {
  let textBox = document.getElementById("txt");
  navigator.clipboard.writeText(textBox.value)
}