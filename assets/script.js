const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Highly Textured Markup Language", "Hyperlinks and Text Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "What does JavaScript do?",
        choices: ["Allows web pages to become interactive", "Help you get a prescription for certain types of coffee", "Reads from files in the client"],
        correctAnswer: "Allows web pages to become interactive"
    },
    {
        question: "What is CSS used for?",
        choices: ["Creating dynamic content", "Styling web pages", "Handling user input"],
        correctAnswer: "Styling web pages"
    },
    {
        question: "Which programming language is known for its flexibility and ease of use?",
        choices: ["Python", "Java", "C++"],
        correctAnswer: "Python"
    },
    {
        question: "Who is the inventor of javascript?",
        choices: ["Brendan Eich", "James Gosling", "Yukihiro Matsum"],
        correctAnswer: "Brendan Eich"
    },
    {
        question: "what does getElementById do?",
        choices: ["Displays an elements Id","Returns an Element object representing the element whose id property matches the specified string","Gets any CSS element by simply providing there Id tag"],
        correctAnswer: "Returns an Element object representing the element whose id property matches the specified string",
    },


];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;
let score = 0;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const startButton = document.getElementById("start-button");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const answerFeedbackElement = document.getElementById("answer-feedback");
const timeLeftElement = document.getElementById("time-left");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");
const highscoreScreen = document.getElementById("highscore-screen");
const highscore = document.getElementById("highscore"); 
const clearButton = document.getElementById("clear-score");
const playAgainButton = document.getElementById("play-again");

startButton.addEventListener("click", startQuiz);
choicesElement.addEventListener("click", handleAnswer);
submitScoreButton.addEventListener("click", saveScore);

function startQuiz() {
    hideElement(startScreen);
    hideElement(highscoreScreen);
    showElement(quizScreen);
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const { question, choices } = questions[currentQuestionIndex];
    questionElement.textContent = question;
    choicesElement.innerHTML = choices.map(choice => `<li>${choice}</li>`).join('');
}

function handleAnswer(event) {
    if (event.target.matches("li")) {
        const selectedAnswer = event.target.textContent;
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;

        if (selectedAnswer === correctAnswer) {
            score++;
            answerFeedbackElement.textContent = "Correct!";
            answerFeedbackElement.classList.remove("incorrect-answer"); // Removes incorrect class
            answerFeedbackElement.classList.add("correct-answer"); // Adds correct class
            
        } else {
            timeLeft -= 10;
            answerFeedbackElement.textContent = "Incorrect!";
            answerFeedbackElement.classList.remove("correct-answer"); // Removes correct class
            answerFeedbackElement.classList.add("incorrect-answer"); // Adds incorrect class
        }
        }

        answerFeedbackElement.style.display = "block";

        setTimeout(function () {
            answerFeedbackElement.style.display = "none";
        }, 1500);

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }


function startTimer() {
    timerInterval = setInterval(function() {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    hideElement(quizScreen);
    showElement(gameOverScreen);
    finalScoreElement.textContent = score;
    showElement(initialsInput);
    showElement(submitScoreButton);
}

let savedScores = []; 

function saveScore() {
    const initials = initialsInput.value.trim();

    if (initials !== "") {
        const savedScore = { initials, score };
        savedScores = JSON.parse(localStorage.getItem("scores")) || [];
        savedScores.push(savedScore);
        localStorage.setItem("scores", JSON.stringify(savedScores));

        currentQuestionIndex = 0;
        timeLeft = 60;
        score = 0;
        initialsInput.value = "";
        hideElement(gameOverScreen);
    }

    hideElement(quizScreen);
    hideElement(gameOverScreen);
    showElement(highscoreScreen);
    highscore.textContent = savedScores.map(item => item.initials + ": " + item.score).join("\n");

    clearButton.addEventListener("click", clearHighScores);
    function clearHighScores() {
        localStorage.removeItem("scores");
    
        savedScores = [];
    
        highscore.textContent = "";
    
    }

}


playAgainButton.addEventListener("click", startQuiz);

function hideElement(element) {
    element.classList.add("hidden");
}

function showElement(element) {
    element.classList.remove("hidden");
}


