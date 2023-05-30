const questions = [
    {
      question: "Elige un objeto:",
      options: ["Varita Mágica", "Escoba Voladora", "Libro de Hechizos", "Capa de Invisibilidad"],
      answer: 0
    },
    {
        question: "Elige una Mascota:",
        options: ["Gato", "Rata", "Rana", "Serpiente"],
        answer: 0
      },
      {
        question: "Elige una Asignatura",
        options: ["Herbología", "Pociones", "Artes Oscuras", "Encantamientos"],
        answer: 0
      },
     
      {
          question: "Si un amigo hiciera trampa en un examen, tú...",
          options: [ "Te enojarías, hacer trampa no esta bien.", "Te ofrecerías a ayudarle a copiarse en el próximo examen.", "Te ofrecerías a ayudarle a estudiar para el próximo examen.", "Lo ignorarías."],
          answer: 0
      },
  
      {
          question: "Si sólo pudieras hacer una cosa durante el resto de tu vida sería...",
          options: ["Viajar por todo el mundo", "Tener una empresa multinacional", "Ayudar en causa benéficas", "Tener una familia y disfrutar la vida con ellos"],
          answer: 0
      },
  
      {
          question: "Dónde te irías de vacaciones?",
          options: ["Tailandia", "Londres", "Barcelona", "Nueva York"],
          answer: 0
      },
  
      {
          question: "Cuál sería tu Patronus?",
          options: ["Una pantera", "Un gato", "Un erizo", "Una nube"],
          answer: 0
      },
  
      {
          question: "Tu plan perfecto para un sábado a la noche es...",
          options: ["Quedarte en casa", "Discoteca", "Concierto", "Cine"],
          answer: 0
      },
  
      {
          question: "Elige un elemento",
          options: ["Aire", "Tierra", "Fuego", "Agua"],
          answer: 0
      }
  
    ];

  const houses = [
    {
      name: "Gryffindor",
      shield: "gryffindor_shield.jpg"
    },
{
  name: "Hufflepuff",
  shield: "hufflepuff_shield.jpg"
},
{
  name: "Ravenclaw",
  shield: "ravenclaw_shield.jpg"
},
{
  name: "Slytherin",
  shield: "slytherin_shield.jpg"
}
];
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionElement = document.querySelector('.question');
  const optionsContainer = document.querySelector('.options');
  const resultContainer = document.querySelector('.result');
  const submitButton = document.querySelector('#submit-btn');
  const houseShieldContainer = document.querySelector('#house-shield-container');
  
  function loadQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    optionsContainer.innerHTML = '';
  
    for (let i = 0; i < question.options.length; i++) {
      const option = question.options[i];
      const optionElement = document.createElement('label');
      optionElement.innerHTML = `<input type="radio" name="option" value="${i}"> ${option}`;
      optionsContainer.appendChild(optionElement);
    }
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
  
    if (selectedOption) {
      const selectedAnswer = Number(selectedOption.value);
  
      if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
      }
  
      currentQuestion++;
      selectedOption.checked = false;
  
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }
  }
  
  function showResult() {
    questionElement.style.display = 'none';
    optionsContainer.style.display = 'none';
    submitButton.style.display = 'none';
  
    const totalScore = Math.floor((score / questions.length) * 100);
    let houseIndex;
  
    if (totalScore >= 75) {
      houseIndex = 0; // Gryffindor
    } else if (totalScore >= 50) {
      houseIndex = 1; // Hufflepuff
    } else if (totalScore >= 25) {
      houseIndex = 2; // Ravenclaw
    } else {
      houseIndex = 3; // Slytherin
    }
  
    resultContainer.textContent = `¡Tu puntuación es ${score}/${questions.length}! Eres de la casa ${houses[houseIndex].name}.`;
  
    const shieldImg = document.createElement('img');
    shieldImg.src = houses[houseIndex].shield;
    shieldImg.alt = houses[houseIndex].name;
    houseShieldContainer.appendChild(shieldImg);
  
    // Almacenar datos en localStorage
    const data = {
      currentQuestion,
      score
    };
    localStorage.setItem('quizData', JSON.stringify(data));
  }
  
  const storedData = localStorage.getItem('quizData');
  if (storedData) {
    const data = JSON.parse(storedData);
    currentQuestion = data.currentQuestion;
    score = data.score;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  } else {
    loadQuestion();
  }
  
  submitButton.addEventListener('click', checkAnswer);
  