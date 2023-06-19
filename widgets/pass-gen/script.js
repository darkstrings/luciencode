const copyBtn = document.getElementById("copy");
const generateBtn = document.getElementById("generate");
const lengthChk = document.getElementById("length");
const upperChk = document.getElementById("upper");
const lowerChk = document.getElementById("lower");
const numberChk = document.getElementById("number");
const symbolChk = document.getElementById("symbol");
const pwDisplay = document.getElementById("pw");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

generateBtn.addEventListener("click", generatePassword);

function getLowerCase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
function getUpperCase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}
function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  if (!upperChk.checked && !lowerChk.checked && !numberChk.checked && !symbolChk.checked) {
    pwDisplay.style.fontSize = "small";
    pwDisplay.innerText = "Please choose at least one character type.";
  } else {
    const len = lengthChk.value;

    let password = "";

    if (upperChk.checked) {
      password += getUpperCase();
    }

    if (lowerChk.checked) {
      password += getLowerCase();
    }

    if (numberChk.checked) {
      password += getNumber();
    }

    if (symbolChk.checked) {
      password += getSymbol();
    }

    for (let i = password.length; i < len; i++) {
      const x = generateX();
      password += x;
    }
    pwDisplay.style.fontSize = "2rem";
    pwDisplay.innerText = password;
    copyBtn.disabled = false;
    copyBtn.style.color = "red";
    copyBtn.style.cursor = "pointer";
  }
}

function generateX() {
  const xs = [];
  if (upperChk.checked) {
    xs.push(getUpperCase());
  }

  if (lowerChk.checked) {
    xs.push(getLowerCase());
  }

  if (numberChk.checked) {
    xs.push(getNumber());
  }

  if (symbolChk.checked) {
    xs.push(getSymbol());
  }
  return xs[Math.floor(Math.random() * xs.length)];
}

copyBtn.addEventListener("click", () => {
  let text = pwDisplay.innerHTML;
  copyContent(text);
});

const copyContent = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("copied");
  } catch (err) {
    console.error("failed to copy", err);
  }
};

// Color scrollbar
// Hiding copy to clipboard
//ternaries in generateX
