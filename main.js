let currentQuestion = 0;
let score = 0;

const questionElement = document.querySelector('.question');
const optionsContainer = document.querySelector('.options');
const resultContainer = document.querySelector('.result');
const submitButton = document.querySelector('#submit-btn');
const houseShieldContainer = document.querySelector('#house-shield-container');

let questions;
let houses;
let rules;

fetch('./preguntas.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON');
    }
    return response.json();
  })
  .then(data => {
    questions = data.questions;
    houses = data.houses;
    rules = data.rules;
    loadQuestion();
  })
  .catch(error => {
    console.error('Error:', error);
  });

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

  if (!selectedOption) {
    alert('Por favor, selecciona una opción antes de continuar.');
    return;
  }

  const selectedAnswer = Number(selectedOption.value);
  const selectedCharacteristic = questions[currentQuestion].options[selectedAnswer].characteristic;

  if (selectedAnswer === questions[currentQuestion].answer) {
    score++;
  }

  let selectedHouse = null;
  houses.forEach((house) => {
    if (house.traits && house.traits.includes(selectedCharacteristic)) {
      selectedHouse = house;
    }
  });
  
  if (selectedHouse) {
    score++;
  }

  currentQuestion++;
  selectedOption.checked = false;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult(selectedHouse); 
  }
}
function showResult(selectedHouse) {
  questionElement.style.display = 'none';
  optionsContainer.style.display = 'none';
  submitButton.style.display = 'none';

  if (selectedHouse) {
    resultContainer.textContent = `¡Tu puntuación es ${score}/${questions.length}! Eres de la casa ${selectedHouse.name}.`;

    const shieldImg = document.createElement('img');
    shieldImg.src = selectedHouse.shield;
    shieldImg.alt = selectedHouse.name;
    houseShieldContainer.appendChild(shieldImg);
  } else {
    resultContainer.textContent = "No se pudo determinar tu casa. ¡Sigue intentando!";
  }

    // Almacenar datos en localStorage
    const data = {
      currentQuestion,
      score
    };
    localStorage.setItem('quizData', JSON.stringify(data));
  }

submitButton.addEventListener('click', checkAnswer);


