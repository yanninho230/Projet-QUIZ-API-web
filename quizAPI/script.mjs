const quizContainer = document.getElementById('quiz-container');
const scoreDisplay = document.getElementById('score-display');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
const maxQuestions = 4;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderQuestion(questionObj) {
  const answers = [questionObj.correct_answer, ...questionObj.incorrect_answers];
  shuffleArray(answers);

  let html = `
    <h2>${questionObj.question}</h2>
    <ul>
      ${answers.map(answer => `<li>${answer}</li>`).join('')}
    </ul>
    <button id="next-btn" disabled>Question suivante</button>
    <div id="score-display">Score: ${score} / ${maxQuestions}</div>
  `;

  quizContainer.innerHTML = html;

  const answerElements = quizContainer.querySelectorAll('ul li');
  const nextBtn = document.getElementById('next-btn');

  answerElements.forEach(li => {
    li.addEventListener('click', () => {
      if (quizContainer.classList.contains('answered')) return;
      quizContainer.classList.add('answered');

      if (li.textContent === questionObj.correct_answer) {
        li.style.backgroundColor = 'lightgreen';
        score++;
      } else {
        li.style.backgroundColor = '#f08080';
        answerElements.forEach(el => {
          if (el.textContent === questionObj.correct_answer) {
            el.style.backgroundColor = 'lightgreen';
          }
        });
      }
      nextBtn.disabled = false;
      updateScore();
    });
  });

  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < maxQuestions && currentQuestionIndex < questions.length) {
      quizContainer.classList.remove('answered');
      renderQuestion(questions[currentQuestionIndex]);
    } else {
      quizContainer.innerHTML = `<h2>Quiz terminé !</h2><p>Votre score final est : ${score} / ${maxQuestions}</p>`;
    }
  });
}


async function loadQuestions() {
  const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple');
  const data = await response.json();
  questions = data.results;
  renderQuestion(questions[currentQuestionIndex]);
}

loadQuestions();

