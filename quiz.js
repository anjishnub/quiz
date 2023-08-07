const questions = [
    {
      question: "What is 1 + 1?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
    },
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Rome"],
      correctAnswer: "Paris",
    },
    // Add more questions here
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let quizStarted = false;
  
  function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const currentQuizQuestion = questions[currentQuestion];
  
    questionElement.innerText = currentQuizQuestion.question;
    optionsElement.innerHTML = "";
  
    currentQuizQuestion.options.forEach((option) => {
      const button = document.createElement("button");
      button.innerText = option;
      button.dataset.option = option; // To store the option as a data attribute
      button.onclick = () => checkAnswer(option);
      optionsElement.appendChild(button);
    });
  }
  
  function checkAnswer(selectedOption) {
    if (!quizStarted) return;
    
    const currentQuizQuestion = questions[currentQuestion];
    const buttons = document.querySelectorAll("#options button");
  
    buttons.forEach((button) => {
      if (button.innerText === currentQuizQuestion.correctAnswer) {
        button.style.backgroundColor = "green";
        button.style.color = 'white';
      } else if (button.innerText === selectedOption) {
        button.style.backgroundColor = "red";
        button.style.color = 'white';
      }
      button.disabled = true;
    });
  
    document.getElementById("options").style.pointerEvents = "none";
  
    if (selectedOption === currentQuizQuestion.correctAnswer) {
      score += 2;
    } else {
      const correctButton = document.querySelector(`#options button[data-option="${currentQuizQuestion.correctAnswer}"]`);
      correctButton.style.backgroundColor = "green";
      correctButton.style.color = "white"
      score -= 1;
    }
  
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("next-btn").style.display = "block";
  }
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      document.getElementById("next-btn").style.display = "none";
      document.getElementById("options").style.pointerEvents = "auto";
      const buttons = document.querySelectorAll("#options button");
      buttons.forEach((button) => {
        button.style.backgroundColor = "";
        button.disabled = false;
      });
      displayQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.innerHTML = `
      <h1>Quiz Finished</h1>
      <p>Your final score: ${score}</p>
    `;
  }
  
  function startQuiz() {
    const startBtn = document.getElementById("start-btn");
    startBtn.style.display = "none";
  
    const quizContainer = document.querySelector(".quiz-container");
    const quizContent = document.createElement("div");
    quizContent.setAttribute("id", "quiz-content");
    quizContainer.appendChild(quizContent);
  
    document.getElementById("score").innerText = "Score: 0";
    currentQuestion = 0;
    score = 0;
    quizStarted = true;
  
    displayQuestion();
  }
  