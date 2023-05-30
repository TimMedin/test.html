var currentQuestion = 1;
var score = 0;
var userAnswers = {};

var questions = {
  question1: {
    question: "Що таке HTML?",
    answers: {
      А: "А: Hyperlinks and Text Markup Language",
      Б: "Б: Hyper Text Markup Language",
      В: "В' Hyperlinking and Text Markup Language",
      Г: "Г: Home Tool Markup Language"
    },
    correctAnswer: "Б"
  },
  question2: {
    question: "Яким тегом позначається посилання?",
    answers: {
      А: "А: &lt;a&gt;",
      Б: "Б: &lt;div&gt;",
      В: "В: &lt;link&gt;",
      Г: "Г: &lt;br&gt;"
    },
    correctAnswer: "А"
  },
  question3: {
    question: "Яким тегом позначається головний заголовок на сайті?",
    answers: {
      А: "А: &lt;title&gt;",
      Б: "Б: &lt;p&gt;",
      В: "В: &lt;a&gt;",
      Г: "Г: &lt;h1&gt;"
    },
    correctAnswer: "Г"
  },
  question4: {
    question: "В якому тегі міститься інформація для браузера?",
    answers: {
      А: "А: &lt;html&gt;",
      Б: "Б: &lt;head&gt;",
      В: "В: &lt;body&gt;",
      Г: "Г: &lt;header&gt;"
    },
    correctAnswer: "Б"
  },
  question5: {
    question: "Що таке CSS?",
    answers: {
      А: "А: Це файл, який відповідає за розмітку сайту.",
      Б: "Б: Це службова інформація для браузера;",
      В: "В: CSS - стилі для сайту, які дозволяють позиціонувати елементи, змінювати їх колір і т.д",
      Г: "Г: Жодна відповідь неправильна."
    },
    correctAnswer: "В"
  },
  question6: {
    question: "Який файл є головним для веб-сторінки?",
    answers: {
      А: "А: text.html",
      Б: "Б: script.html",
      В: "В: main.html",
      Г: "Г: index.html"
    },
    correctAnswer: "Г"
  },
  question7: {
    question: "За допомогою якого тегу можна додати кнопку на сайт?",
    answers: {
      А: "А: &lt;a&gt;",
      Б: "Б: &lt;input&gt;",
      В: "В: &lt;button&gt;",
      Г: "Г: &lt;link&gt;"
    },
    correctAnswer: "В"
  },
  question8: {
    question: "Що означає тег  &lt;p&gt",
    answers: {
      А: "А: Головний заголовок на сайті.",
      Б: "Б: Текст, абзац",
      В: "В: Поле для введеня",
      Г: "Г: Жодна відповідь неправильна"
    },
    correctAnswer: "Б"
  },
  question9: {
    question: "Який атрибут потрібен для коректної роботи тегу  &lt;img&gt",
    answers: {
      А: "А: Атрибути: href, alt",
      Б: "Б: Атрибути: src, href",
      В: "В: Атрибути: alt, src",
      Г: "Г: Атрибути: href, target"
    },
    correctAnswer: "В"
  },
  question10: {
    question: "В якому тегі записується зміст сайту?",
    answers: {
      А: "А: &lt;head&gt",
      Б: "Б: &lt;title&gt",
      В: "В: &lt;body&gt",
      Г: "Г  &lt;html&gt"
    },
    correctAnswer: "В"
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
      "<p>Робота над помилками:</p><ul>";

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
      "<p>Робота над помилками:</p><ul>";

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
