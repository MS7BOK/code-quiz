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
