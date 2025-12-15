document.getElementById("quiz-form").addEventListener("submit", function(event) {
  event.preventDefault(); // on ne recharge pas la page

  const questions = document.querySelectorAll(".question-item"); //on sélectionne tous les éléments HTML qui ont la classe .question-item
	
  let allCorrect = true; // si toutes les réponses sont bonnes

  questions.forEach(question => {
    const answers = question.querySelectorAll("input.answer");
    let questionIsCorrect = true;

    answers.forEach(answer => {
      const isChecked = answer.checked; // est-ce que cette réponse est cochée par l’utilisateur ?
      const isCorrect = answer.value === "true";// est-ce que cette réponse est la bonne réponse??

      // Si mauvaise réponse cochée OU bonne réponse non cochée → question fausse
      if ((isChecked && !isCorrect) || (!isChecked && isCorrect)) {
        questionIsCorrect = false;
      }
    });

    if (questionIsCorrect) {
      question.classList.add("correct");
      question.classList.remove("incorrect");
    } else {
      question.classList.add("incorrect");
      question.classList.remove("correct");
      allCorrect = false;
    }
  });

  const alertDiv = document.getElementById("alert");
  if (allCorrect) {
    alertDiv.style.display = "block";
  } else {
    alertDiv.style.display = "none";
  }
});


