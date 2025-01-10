// Quiz Data for Python with 10 Questions
const quizData = {
    python: [
        { question: "What is a correct syntax to output 'Hello World' in Python?", options: ["echo 'Hello World'", "print('Hello World')", "printf('Hello World')", "println('Hello World')"], answer: 1 },
        { question: "Which data type is immutable?", options: ["List", "Tuple", "Dictionary", "Set"], answer: 1 },
        { question: "What keyword is used to create a function in Python?", options: ["function", "def", "define", "func"], answer: 1 },
        { question: "What is the correct file extension for Python files?", options: [".py", ".pt", ".p", ".python"], answer: 0 },
        { question: "How do you insert COMMENTS in Python code?", options: ["// This is a comment", "# This is a comment", "<!-- This is a comment -->", "// # This is a comment"], answer: 1 },
        { question: "Which operator is used to raise a number to the power of another number?", options: ["^", "pow()", "**", "sqrt()"], answer: 2 },
        { question: "What is the correct way to create a list in Python?", options: ["list = (1, 2, 3)", "list = [1, 2, 3]", "list = {1, 2, 3}", "list = <1, 2, 3>"], answer: 1 },
        { question: "Which of the following is used to define a class in Python?", options: ["class ClassName:", "define ClassName:", "class: ClassName", "def ClassName:"], answer: 0 },
        { question: "How do you check if a key exists in a dictionary?", options: ["key in dictionary", "key in dict", "dict.exists(key)", "key.has()"], answer: 0 },
        { question: "What does the range() function do in Python?", options: ["Generates a random number", "Generates a sequence of numbers", "Returns a list", "Returns a dictionary"], answer: 1 }
    ]
};

let currentQuestionIndex = 0;
let userAnswers = [];
let userEmail = '';

// Function to Start Quiz
function startQuiz() {
    console.log('Start quiz function triggered');
    
    // Get user details
    let userName = document.getElementById('user-name').value;
    let userCollege = document.getElementById('user-college').value;
    let userBranch = document.getElementById('user-branch').value;

    // Check each field and display a specific alert if missing
    if (!userName) {
        alert("Please enter your name.");
        return;
    }

    if (!userCollege) {
        alert("Please enter your college name.");
        return;
    }

    if (!userBranch) {
        alert("Please enter your branch.");
        return;
    }

    // Display entered details in the console (optional)
    console.log('User Details:', userName, userCollege, userBranch);
    
    // Hide Email Section and Show Quiz Section
    document.getElementById('email-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';

    console.log('Starting quiz...');
    // Start with Python Quiz
    loadQuestion();
}



// Load Current Question
function loadQuestion() {
    const currentQuestionData = quizData.python[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQuestionData.question;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    currentQuestionData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option-container');
        optionElement.innerHTML = `
            <input type="radio" name="option" id="option-${index}" value="${index}">
            <label for="option-${index}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });

    // Enable/Disable Navigation Buttons
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').disabled = false;
    if (currentQuestionIndex === quizData.python.length - 1) {
        document.getElementById('next-btn').innerText = 'Finish Quiz';
    } else {
        document.getElementById('next-btn').innerText = 'Next';
    }
}

// Handle Answer Selection
function selectAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
}

// Navigate to Next Question
function nextQuestion() {
    // Save the current answer before moving to the next question
    selectAnswer();

    if (currentQuestionIndex < quizData.python.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showScore();
    }
}

// Navigate to Previous Question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Show Score at the End
function showScore() {
    let score = 0;
    quizData.python.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            score++;
        }
    });

    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('score-section').style.display = 'block';
    document.getElementById('score-display').innerText = `Your Score: ${score}/${quizData.python.length}`;

    // Optionally: Send Score via Email (Requires Backend Integration)
    // sendScoreByEmail(userEmail, score);
}

// Show About Us Page
function showAboutPage() {
    window.location.href = 'about.html';  // Redirect to About Us Page
}
