const questions = [
  {
    question: "Which cities among these hosted a World Cup football match?",
    options: ["London", "Paris", "Berlin", "Rome", "Tokyo", "Rio de Janeiro", "New York", "Cordoba", "Mexico City"],
    correctAnswers: ["Paris", "Berlin", "Rio de Janeiro", "Rome", "London", "Mexico City"]
  },
  {
    question: "Which countries have won the FIFA World Cup multiple times?",
    options: ["Brazil", "Italy", "Germany", "Uruguay", "Argentina", "France", "Spain", "Netherlands", "England"],
    correctAnswers: ["Brazil", "Italy", "Germany", "Uruguay", "Argentina", "France"]
  }


];

let currentQuestion = 0;
let currentRound = 0;
let quizStarted = false;
let remainingAttempts = 6;

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const currentQuizQuestion = questions[currentQuestion];

  questionElement.innerText = currentQuizQuestion.question;
  optionsElement.innerHTML = "";

  currentQuizQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.dataset.option = option;
    button.onclick = () => checkAnswer(option);
    optionsElement.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  if (!quizStarted || remainingAttempts <= 0) return;

  const currentQuizQuestion = questions[currentQuestion];
  const button = document.querySelector(`#options button[data-option="${selectedOption}"]`);

  if (currentQuizQuestion.correctAnswers.includes(selectedOption)) {
    button.style.backgroundColor = "green";
    button.style.color = "white";
  } else {
    button.style.backgroundColor = "red";
    button.style.color = "white";
    showCorrectAnswers();
  }

  button.disabled = true;
  remainingAttempts--;

  if (remainingAttempts === 0 || button.style.backgroundColor === "red") {
    endRound();
  }
}

function showCorrectAnswers() {
  const currentQuizQuestion = questions[currentQuestion];
  currentQuizQuestion.correctAnswers.forEach((correctAnswer) => {
    const correctButton = document.querySelector(`#options button[data-option="${correctAnswer}"]`);
    correctButton.style.backgroundColor = "green";
    correctButton.style.color = "white";
  });
}



function showResult() {
  const quizContainer = document.querySelector(".quiz-container");
  quizContainer.innerHTML = `
    <h1>Quiz Finished</h1>
  `;
}

function startQuiz() {
  const startBtn = document.getElementById("start-btn");
  startBtn.style.display = "none";

  const quizContainer = document.querySelector(".quiz-container");
  const quizContent = document.createElement("div");
  quizContent.setAttribute("id", "quiz-content");
  quizContainer.appendChild(quizContent);

  currentQuestion = 0;
  currentRound = 0;
  quizStarted = true;
  remainingAttempts = 6;

  displayQuestion();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach((button) => {
      button.style.backgroundColor = "";
      button.style.color = "";
      button.disabled = false;
    });

    document.getElementById("next-btn").style.display = "none";
    remainingAttempts = 6; // Reset remainingAttempts for the next question
    displayQuestion();
  
  } else {
   endRound()
  }

  
}

function endRound() {
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach((button) => {
    button.disabled = true;
  });

  document.getElementById("next-btn").style.display = "block";
}
