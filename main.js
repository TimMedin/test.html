var currentQuestion = 1;
var score = 0;
var userAnswers = {};

var questions = {
  question1: {
    question: "Що таке HTML?",
    answers: {
      А: "Hyperlinks and Text Markup Language",
      Б: "Hyper Text Markup Language",
      В: "Hyperlinking and Text Markup Language",
      Г: "Home Tool Markup Language"
    },
    correctAnswer: "Б"
  },
  question2: {
    question: "Питання 2",
    answers: {
      А: "Відповідь А",
      Б: "Відповідь Б",
      В: "Відповідь В",
      Г: "Відповідь Г"
    },
    correctAnswer: "А"
  },
  // Додайте решту запитань тут
};

function showQuestion() {
  var questionContainer = document.getElementById("questionContainer");
  var currentQuestionObj = questions["question" + currentQuestion];

  questionContainer.innerHTML = "";
  questionContainer.innerHTML += "<h2>Питання " + currentQuestion + ":</h2>";
  questionContainer.innerHTML += "<p>" + currentQuestionObj.question + "</p>";

  for (var answer in currentQuestionObj.answers) {
    var input =
      '<input type="radio" name="question' +
      currentQuestion +
      '" value="' +
      answer +
      '"> ' +
      currentQuestionObj.answers[answer] +
      "<br>";

    if (userAnswers["question" + currentQuestion] === answer) {
      input = input.replace("radio", "radio" + currentQuestion).replace("value=", "checked value=");
    }

    questionContainer.innerHTML += input;
  }

  document.getElementById("nextButton").style.display = "block";
  document.getElementById("submitButton").style.display = "none";
}

function checkAnswer() {
  var selectedAnswer = document.querySelector(
    'input[name="question' + currentQuestion + '"]:checked'
  ).value;

  userAnswers["question" + currentQuestion] = selectedAnswer;

  var currentQuestionObj = questions["question" + currentQuestion];

  if (selectedAnswer === currentQuestionObj.correctAnswer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion > Object.keys(questions).length) {
    finishQuiz();
  } else {
    showQuestion();
  }
}

function finishQuiz() {
  var resultContainer = document.getElementById("resultContainer");
  var resultHTML = "<h2>Результат</h2>";
  var percentage = (score / Object.keys(questions).length) * 100;

  resultHTML +=
    "<p id='score'>Ваша оцінка: " +
    score +
    "/" +
    Object.keys(questions).length +
    " (" +
    percentage +
    "%)</p>";

  if (percentage === 100) {
    resultHTML += "<p>Вітаємо! Ви правильно відповіли на всі запитання!</p>";
  } else {
    resultHTML +=
      "<p>Ваші помилки та правильні відповіді:</p><ul>";

    for (var i = 1; i <= Object.keys(questions).length; i++) {
      var questionObj = questions["question" + i];
      var userAnswer = userAnswers["question" + i];
      var isCorrect = userAnswer === questionObj.correctAnswer;

      resultHTML += "<li><strong>Питання " + i + ":</strong> " + questionObj.question + "<br>";
      resultHTML += "Ваша відповідь: " + questionObj.answers[userAnswer] + "<br>";

      if (isCorrect) {
        resultHTML += "<span class='correct'>Правильно!</span><br>";
      } else {
        resultHTML +=
          "<span class='incorrect'>Неправильно. Правильна відповідь: " +
          questionObj.answers[questionObj.correctAnswer] +
          "</span><br>";
      }

      resultHTML += "</li>";
    }

    resultHTML += "</ul>";
  }

  resultContainer.innerHTML = resultHTML;

  document.getElementById("quizContainer").style.display = "none";
  resultContainer.style.display = "block";

  // Зберігаємо результати тесту в локальному сховищі
  localStorage.setItem("quizCompleted", "true");
  localStorage.setItem("quizScore", score);
}

// Перевірка, чи користувач вже пройшов тест
if (localStorage.getItem("quizCompleted")) {
  var score = localStorage.getItem("quizScore");

  var resultContainer = document.getElementById("resultContainer");
  var resultHTML = "<h2>Результат</h2>";
  var percentage = (score / Object.keys(questions).length) * 100;

  resultHTML +=
    "<p id='score'>Ваша оцінка: " +
    score +
    "/" +
    Object.keys(questions).length +
    " (" +
    percentage +
    "%)</p>";

  if (percentage === 100) {
    resultHTML += "<p>Вітаємо! Ви правильно відповіли на всі запитання!</p>";
  } else {
    resultHTML +=
      "<p>Ваші помилки та правильні відповіді:</p><ul>";

    for (var i = 1; i <= Object.keys(questions).length; i++) {
      var questionObj = questions["question" + i];
      var userAnswer = userAnswers["question" + i];
      var isCorrect = userAnswer === questionObj.correctAnswer;

      resultHTML += "<li><strong>Питання " + i + ":</strong> " + questionObj.question + "<br>";
      resultHTML += "Ваша відповідь: " + questionObj.answers[userAnswer] + "<br>";

      if (isCorrect) {
        resultHTML += "<span class='correct'>Правильно!</span><br>";
      } else {
        resultHTML +=
          "<span class='incorrect'>Неправильно. Правильна відповідь: " +
          questionObj.answers[questionObj.correctAnswer] +
          "</span><br>";
      }

      resultHTML += "</li>";
    }

    resultHTML += "</ul>";
  }

  resultContainer.innerHTML = resultHTML;

  document.getElementById("quizContainer").style.display = "none";
  resultContainer.style.display = "block";
} else {
  showQuestion();
}
