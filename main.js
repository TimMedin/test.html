const questions = [
  {
    question: "Перше запитання?",
    answers: ["А", "Б", "В", "Г"],
    correctAnswer: 1
  },
  {
    question: "Друге запитання?",
    answers: ["А", "Б", "В", "Г"],
    correctAnswer: 0
  },
  {
    question: "Третє запитання?",
    answers: ["А", "Б", "В", "Г"],
    correctAnswer: 0
  },
  {
    question: "Четверте запитання?",
    answers: ["А", "Б", "В", "Г"],
    correctAnswer: 2
  },
  {
    question: "П'яте запитання?",
    answers: ["А", "Б", "В", "Г"],
    correctAnswer: 0
  },
  {
    question: "Шосте запитання?",
    answers: ["А", "Б", "В", "Г"],
    correctAnswer: 3
  },
  {
    question: "Сьоме запитання?",
    answers: ["А", "Б", "В", "Г"],
    correctAnswer: 1
  },
  {
    question: "Восьме запитання?",
    answers: ["А", "Б", "В", "Г"],
    correctAnswer: 1
  },
  {
    question: "Дев'яте запитання?",
    answers: ["А", "Б", "В", "Г"],
    correctAnswer: 3
  },
  {
    question: "Десяте запитання?",
    answers: ["А", "Б", "В", "Г"],
    correctAnswer: 0
  },
  {
    question: "Одинадцяте запитання?",
    answers: ["А", "Б", "В", "Г"],
    correctAnswer: 2
  },
  {
    question: "Дванадцяте запитання?",
    answers: ["А", "Б", "В", "Г"],
    correctAnswer: 3
  }
];

let currentQuestion = 0;
let score = 0;
let quizCompleted = false;

function showQuestion() {
  const quizContainer = document.getElementById("quizContainer");
  quizContainer.innerHTML = "";

  const questionContainer = document.createElement("div");
  questionContainer.id = "questionContainer";
  questionContainer.innerHTML = `
    <h2>${questions[currentQuestion].question}</h2>
    <ul>
      ${questions[currentQuestion].answers
        .map(
          (answer, index) =>
            `<li>
              <input type="radio" id="answer${index}" name="answer" value="${index}">
              <label for="answer${index}">${answer}</label>
            </li>`
        )
        .join("")}
    </ul>
  `;

  quizContainer.appendChild(questionContainer);

  const nextButton = document.getElementById("nextButton");
  nextButton.style.display = "block";
  nextButton.style.animation = "fade-in 0.5s forwards";
}

function checkAnswer() {
  const selectedAnswer = document.querySelector("input[name='answer']:checked");
  if (!selectedAnswer || quizCompleted) return;

  const answerIndex = parseInt(selectedAnswer.value);
  const correctAnswerIndex = questions[currentQuestion].correctAnswer;

  if (answerIndex === correctAnswerIndex) {
    score++;
    selectedAnswer.parentElement.classList.add("correct");
  } else {
    selectedAnswer.parentElement.classList.add("incorrect");
  }

  const nextButton = document.getElementById("nextButton");
  nextButton.style.animation = "slide-out 0.5s forwards";
  nextButton.style.pointerEvents = "none";

  const submitButton = document.getElementById("submitButton");
  if (currentQuestion === questions.length - 1) {
    submitButton.style.display = "block";
    submitButton.style.animation = "fade-in 0.5s forwards";
  }
}

function nextQuestion() {
  const questionContainer = document.getElementById("questionContainer");
  questionContainer.style.animation = "slide-out 0.5s forwards";

  setTimeout(() => {
    questionContainer.innerHTML = "";
    questionContainer.style.animation = "";

    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 500);
}

function showResult() {
  const quizContainer = document.getElementById("quizContainer");
  quizContainer.innerHTML = "";

  const resultContainer = document.createElement("div");
  resultContainer.id = "resultContainer";
  resultContainer.style.display = "block";
  resultContainer.style.animation = "fade-in 0.5s forwards";

  const resultMessage =
    score === questions.length
      ? "Вітаємо! Ви отримали максимальний бал!"
      : `Ви отримали ${score} з ${questions.length} балів.`;

  const resultHTML = `
    <h2>Результати</h2>
    <p>${resultMessage}</p>
    <h3>Робота над помилками:</h3>
    <ul>
      ${questions
        .map(
          (question, index) =>
            `<li class="${index === currentQuestion ? "current" : ""}">
              ${question.answers[question.correctAnswer]}
            </li>`
        )
        .join("")}
    </ul>
  `;

  resultContainer.innerHTML = resultHTML;
  quizContainer.appendChild(resultContainer);

  quizCompleted = true;
}

document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.getElementById("nextButton");
  nextButton.addEventListener("click", function () {
    checkAnswer();
    nextQuestion();
  });

  const submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", function () {
    checkAnswer();
    showResult();
  });

  showQuestion();
});
