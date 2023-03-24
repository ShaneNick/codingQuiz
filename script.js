document.addEventListener('DOMContentLoaded', function () {
  const startBtn = document.querySelector('.Start-btn');
  const content = document.getElementById('content');

  startBtn.addEventListener('click', function () {
    content.classList.remove('hidden');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const endBtn = document.querySelector('.End-btn');
  const content = document.getElementById('content');

  endBtn.addEventListener('click', function () {
    content.classList.toggle('hidden');
    clearInterval(interval);
    $('.timer').text('1:00');
    currentQuestionIndex = 0;
    score = 0;
    document.querySelector(".score-display").innerText = `${score}/5`;
    document.getElementById("Question").classList.remove("hidden");
    document.getElementById("Answers").classList.remove("hidden");
    const finishedMessage = document.querySelector(".quiz-finished");
    if (finishedMessage) {
      finishedMessage.remove();
    }
    displayQuestion();
  });
});


var interval;

function endQuiz() {
  // Hide the question and answer elements
  document.getElementById("Question").classList.add("hidden");
  document.getElementById("Answers").classList.add("hidden");

  // Check if quiz has started
  if (currentQuestionIndex > 0) {
    // Create and display a message
    const finishedMessage = document.createElement("h2");
    finishedMessage.innerText = "Quiz is Finished!";
    finishedMessage.classList.add("quiz-finished");
    document.querySelector(".questions-container").appendChild(finishedMessage);
  }
}


let countdownRunning = false;

function countdown() {
  if (countdownRunning) {
    return; 
  }

  countdownRunning = true; 

  clearInterval(interval);
  interval = setInterval(function () {
    var clock = $('.timer').html();
    clock = clock.split(':');
    var minutes = parseInt(clock[0]);
    var seconds = parseInt(clock[1]);
    seconds -= 1;
    if (minutes < 0) return;
    else if (seconds < 0 && minutes != 0) {
      minutes -= 1;
      seconds = 59;
    } else if (seconds < 10 && seconds.toString().length != 2) seconds = '0' + seconds;

    $('.timer').html(minutes + ':' + seconds);

    if (minutes == 0 && seconds == 0) {
      clearInterval(interval);
      countdownRunning = false;
      endQuiz();
    }
  }, 1000);
}

$('.Start-btn').click(function () {
  $('.timer').text('1:00');
  countdown();
});

$('.End-btn').click(function () {
  $('.timer').text('1:00');
  clearInterval(interval);
  countdownRunning = false;
});



const quizQuestions = [
  {
    question: "1.Which HTML tag is used to include JavaScript in a web page?",
    choices: [
      "<script>",
      "<javascript>",
      "<js>",
      "<code>"
    ],
    correctAnswer: 0,
  },
  {
    question: "2.What does 'DOM' stand for?",
    choices: [
      "Document Object Model",
      "Data Object Model",
      "Document Oriented Model",
      "Data Oriented Model",
    ],
    correctAnswer: 0,
  },
  {
    question: "3.What is the correct syntax for writing a comment in JavaScript?",
    choices: [
      "// This is a comment",
      "<!-- This is a comment -->",
      "/* This is a comment */",
      "# This is a comment",
    ],
    correctAnswer: 0,
  },
  {
    question: "4.Which of the following is NOT a valid JavaScript variable name?",
    choices: [
      "_testVar",
      "2testVar",
      "$testVar", "testVar"
    ],
    correctAnswer: 1,
  },
  {
    question: "5.What is the result of the following expression: '10' + 20?",
    choices: [
      "30",
      "1020",
      "TypeError",
      "NaN"
    ],
    correctAnswer: 1,
  },
];


let currentQuestionIndex = 0;
let score = 0;
function displayQuestion() {
  if (currentQuestionIndex === quizQuestions.length || $('.timer').text() === '0:00') {
    endQuiz();
    return;
  }

  const questionObj = quizQuestions[currentQuestionIndex];
  document.getElementById("Question").innerText = questionObj.question;

  const answerOptions = document.querySelectorAll(".answer-option");
  const choiceButtons = document.querySelectorAll(".choice");

  for (let i = 0; i < answerOptions.length; i++) {
    answerOptions[i].innerText = questionObj.choices[i];
    choiceButtons[i].outerHTML = choiceButtons[i].outerHTML;
    const updatedButton = document.querySelector(`.choice[data-index="${i + 1}"]`);
    updatedButton.onclick = function () {
      if (i === questionObj.correctAnswer) {
        score++;
        document.querySelector(".score-display").innerText = `${score}/5`;
      }
      currentQuestionIndex++;
      displayQuestion();
    };
  }
}

document.querySelector(".Start-btn").addEventListener("click", () => {
  document.getElementById("content").classList.remove("hidden");
  displayQuestion();
});


//saves highscore
function saveHighScore(event) {
  event.preventDefault();

  const user = userName.value.trim();
  const scoreObj = {
    score: score,
    user: user
  };

  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push(scoreObj);
  localStorage.setItem("highScores", JSON.stringify(highScores));

  window.location.assign("/");
}
