// @ts-nocheck

// ===============================
// CORRECT ANSWERS
// ===============================

let answers = {
    q1: "a",
    q2: "a",
    q3: "b",
    q4: "a",
    q5: "c",
    q6: "d",
    q7: "a",
    q8: "a",
    q9: "a",
    q10: "b",
    q11: "b",
    q12: "a",
    q13: "b",
    q14: "b",
    q15: "b",
    q16: "a",
    q17: "a",
    q18: "b",
    q19: "c",
    q20: "a"
};


// ===============================
// GET ALL QUESTIONS
// ===============================

let mainBox = document.querySelector(".quiz-question");
let headings = mainBox.querySelectorAll("h2");


// ===============================
// CREATE QUESTION GROUPS
// ===============================

let allQuestionGroups = [];

headings.forEach(function(heading) {

    let questionBox = heading.nextElementSibling;
    let optionBox = questionBox.nextElementSibling;

    allQuestionGroups.push({

        heading: heading,
        questionBox: questionBox,
        optionBox: optionBox,

        // Original question number
        originalNumber: heading.innerText.match(/\d+/)[0]

    });

});


// ===============================
// BUTTONS
// ===============================

let nextBtn = document.getElementById("nextBtn");
let Pvc = document.getElementById("PVC");
let submitBtn = document.getElementById("submitBtn");
let result = document.getElementById("result");
let RIC = document.getElementById("RIC");


// ===============================
// RANDOM QUESTIONS
// ===============================

let questionGroups = [];

function makeRandomQuestions() {

    let shuffled = [...allQuestionGroups];

    shuffled.sort(() => Math.random() - 0.5);

    questionGroups = shuffled.slice(0, 10);

}


// ===============================
// HIDE ALL QUESTIONS
// ===============================

function hideAllQuestions() {

    allQuestionGroups.forEach(function(group) {

        group.heading.style.display = "none";
        group.questionBox.style.display = "none";
        group.optionBox.style.display = "none";

    });

}


// ===============================
// SHOW CURRENT QUESTION
// ===============================

function showCurrentQuestion() {

    hideAllQuestions();

    let group = questionGroups[currentQuestion];

    // Number 1 to 10
    group.heading.innerText =
        "Question " + (currentQuestion + 1);

    // Show question
    group.heading.style.display = "";
    group.questionBox.style.display = "";
    group.optionBox.style.display = "";

}


// ===============================
// START QUIZ
// ===============================

let currentQuestion = 0;

makeRandomQuestions();

showCurrentQuestion();

submitBtn.style.display = "none";

Pvc.style.display = "none";


// ===============================
// NEXT BUTTON
// ===============================

nextBtn.addEventListener("click", function() {

    if (currentQuestion < questionGroups.length - 1) {

        currentQuestion++;

        showCurrentQuestion();

    }

    // Last question
    if (currentQuestion === questionGroups.length - 1) {

        nextBtn.style.display = "none";

        submitBtn.style.display = "block";

    }

    Pvc.style.display = "block";

});


// ===============================
// PREVIOUS BUTTON
// ===============================

Pvc.addEventListener("click", function() {

    if (currentQuestion === 0) {
        return;
    }

    currentQuestion--;

    showCurrentQuestion();

    nextBtn.style.display = "block";

    submitBtn.style.display = "none";

    if (currentQuestion === 0) {

        Pvc.style.display = "none";

    }

});


// ===============================
// SUBMIT BUTTON
// ===============================

submitBtn.addEventListener("click", function() {

    let score = 0;

    let wrongQuestions = [];


    // Check random 10
    questionGroups.forEach(function(group) {

        let originalNumber = group.originalNumber;

        let questionName = "q" + originalNumber;


        // Selected answer
        let selected = document.querySelector(
            'input[name="' + questionName + '"]:checked'
        );


        // Correct answer
        if (
            selected &&
            selected.value === answers[questionName]
        ) {

            score++;

        } 
        else {

            // Wrong question
            wrongQuestions.push({
                number: questionGroups.indexOf(group) + 1,
                text: group.questionBox.innerText
            });

        }

    });


    // ===============================
    // SHOW RESULT
    // ===============================

    let resultHTML =
        "<h2>Your Score: " + score + "/10</h2>";


    if (wrongQuestions.length > 0) {

        resultHTML +=
            "<h3>❌ Wrong Questions:</h3>";


        wrongQuestions.forEach(function(item) {

            resultHTML +=
                "<p><b>Question " +
                item.number +
                ":</b> " +
                item.text +
                "</p>";

        });

    } 
    else {

        resultHTML +=
            "<h3>🎉 All Answers Correct!</h3>";

    }


    result.innerHTML = resultHTML;

    submitBtn.style.display = "none";

});


// ===============================
// RESTART BUTTON
// ===============================

RIC.addEventListener("click", function() {

    // Result clear
    result.innerHTML = "";


    // ===============================
    // CLEAR ALL OLD ANSWERS
    // ===============================

    let allRadioButtons = document.querySelectorAll(
        'input[type="radio"]'
    );

    allRadioButtons.forEach(function(radio) {

        radio.checked = false;

    });


    // ===============================
    // NEW RANDOM 10 QUESTIONS
    // ===============================

    makeRandomQuestions();


    // First question
    currentQuestion = 0;


    // Buttons reset
    nextBtn.style.display = "block";

    submitBtn.style.display = "none";

    Pvc.style.display = "none";


    // First new question show
    showCurrentQuestion();

});