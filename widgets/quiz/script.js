const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const answerList = document.querySelector(".answerList");
const quizPage = document.querySelector(".quiz-container");
const quizResultsPage = document.querySelector(".quiz-results");
const resultNumbers = document.querySelector(".result-numbers");
const reloadBtn = document.querySelector(".reload");

const quizData = [
  {
    question: "What is your name?",
    a: "Godfrey of Bouillon",
    b: "My name is Sir Lancelot of Camelot",
    c: "Gary",
    d: "Sir Rod Stewart",
    correct: "b",
  },
  {
    question: "What is your quest?",
    a: "To retrieve the Golden Fleece",
    b: "To destroy Skynet before it becomes self-aware",
    c: "To seek the holy grail",
    d: "To find my missing Knight Rider DVDs",
    correct: "c",
  },
  {
    question: "What is the air-speed velocity of an unladen swallow?",
    a: "Mach 2",
    b: "48 MPH",
    c: "28.8 knots",
    d: "What do you mean? An African or European swallow?",
    correct: "d",
  },
  {
    question: "What is your favorite colour?",
    a: "Blue",
    b: "Raw Umber",
    c: "Burnt Sienna",
    d: "Teal Blue",
    correct: "a",
  },
  {
    question: "What is the capital of Assyria?",
    a: "Persepolis",
    b: "Assur",
    c: "Istanbul",
    d: "Aleppo",
    correct: "b",
  },
  {
    question: "What does Jack Burton do when the earth quakes, and the poison arrows fall from the sky, and the pillars of Heaven shake?",
    a: "He tells that storm to 'come over here and fight like a man'",
    b: "Runs away to find his truck",
    c: "He just looks that big ol storm right square in the eye and he says, 'Give me your best shot, pal. I can take it'.",
    d: "He feels kinda invincible",
    correct: "c",
  },
];

let currentQuiz = 0;
let numCorrect = 0;
let numWrong = 0;
let correctLetter = undefined;
// let answer = undefined

function loadQuiz() {
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;

  //reset buttons to unchecked
  Array.from(document.querySelectorAll('input[name="answer"]:checked'), (input) => (input.checked = false));

  // reset/disable button
  submitBtn.disabled = true;
  submitBtn.innerText = "Choose an answer";
  submitBtn.style.backgroundColor = "rgb(210, 209, 207)";

  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
  correctLetter = quizData[currentQuiz].correct;
}

function getSelected() {
  const answers = document.querySelectorAll(".answer");
  let chosenAnswer;
  answers.forEach((answer) => {
    if (answer.checked) {
      chosenAnswer = answer.id;
    }
  });

  chosenAnswer === correctLetter ? numCorrect++ : numWrong++;
}
loadQuiz();

submitBtn.addEventListener("click", () => {
  getSelected();

  currentQuiz++;

  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    quizPage.style.display = "none";
    quizResultsPage.style.display = "grid";
    resultNumbers.innerText = `You got ${numCorrect} correct and ${numWrong} wrong`;
  }
});

reloadBtn.addEventListener("click", () => window.location.reload());

answerList.addEventListener("click", (event) => {
  if (event.target.className === "answer") {
    submitBtn.disabled = false;
    submitBtn.style.backgroundColor = "rgb(183, 7, 7)";
    submitBtn.innerText = "Submit";
  }
});

// console.log(quizData[5].c);
//show results at the end
// TUrn off button capability while nothing is selected

// Sir Bedevere: How do know so much about swallows?
// King Arthur: Well, you have to know these things when you’re a king, you know.
