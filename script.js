let currentQuestionIndex = 0;
let questions = [];

async function loadQuizData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        questions = data.questionnaire;
        displayQuestion();
    } catch (error) {
        console.error('Error loading quiz data:', error);
    }
}

function displayQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    const questionData = questions[currentQuestionIndex];
    const optionsHTML = questionData.options.map((option, index) => `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="option" id="option${index}" data-correct="${option.correct}">
            <label class="form-check-label" for="option${index}">
                ${option.option}
            </label>
        </div>
    `).join('');

    quizContainer.innerHTML = `
        <h5>${questionData.question}</h5>
        <form id="quiz-form">
            ${optionsHTML}
        </form>
        <div id="feedback" class="feedback"></div>
    `;

    setupEventListeners();
    updateNavigationButtons();
}

function setupEventListeners() {
    const checkboxes = document.querySelectorAll('input[name="option"]');
    const feedback = document.getElementById('feedback');
    const nextButton = document.getElementById('next-btn');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const allCorrect = Array.from(checkboxes).every(checkbox => {
                const isCorrect = checkbox.getAttribute('data-correct') === 'true';
                return (checkbox.checked && isCorrect) || (!checkbox.checked && !isCorrect);
            });

            feedback.textContent = allCorrect ? 'Bonne réponse!' : 'Mauvaise réponse!';
            feedback.className = `feedback ${allCorrect ? 'correct' : 'incorrect'}`;
      
        });
    });
}

function updateNavigationButtons() {
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

   

    prevButton.onclick = () => {
        currentQuestionIndex--;
        displayQuestion();
    };

    nextButton.onclick = () => {
        currentQuestionIndex++;
        displayQuestion();
    };
}

document.addEventListener('DOMContentLoaded', loadQuizData);
