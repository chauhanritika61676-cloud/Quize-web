
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

let questionGroups = [];

headings.forEach(function(heading) {

    let questionBox = heading.nextElementSibling;
    let optionBox = questionBox.nextElementSibling;

    questionGroups.push([
        heading,
        questionBox,
        optionBox
    ]);

});


// ===============================
// BUTTONS
// ===============================

let nextBtn = document.getElementById("nextBtn");
let submitBtn = document.getElementById("submitBtn");
let result = document.getElementById("result");


// ===============================
// START QUIZ
// ===============================

let currentQuestion = 0;


// Sab questions hide
questionGroups.forEach(function(group) {

    group.forEach(function(element) {
        element.style.display = "none";
    });

});


// Sirf Question 1 show
questionGroups[0].forEach(function(element) {
    element.style.display = "";
});


// Submit starting mein hide
submitBtn.style.display = "none";


// ===============================
// NEXT BUTTON
// ===============================

nextBtn.addEventListener("click", function() {

    // Current question hide
    questionGroups[currentQuestion].forEach(function(element) {
        element.style.display = "none";
    });


    // Next question
    currentQuestion++;


    // Next question show
    questionGroups[currentQuestion].forEach(function(element) {
        element.style.display = "";
    });


    // Agar Question 20 hai
    if (currentQuestion === questionGroups.length - 1) {

        nextBtn.style.display = "none";

        submitBtn.style.display = "block";

    }

});


// ===============================
// SUBMIT BUTTON
// ===============================

submitBtn.addEventListener("click", function() {

    let score = 0;


    // Answers check
    for (let question in answers) {

        let selected = document.querySelector(
            'input[name="' + question + '"]:checked'
        );


        if (selected && selected.value === answers[question]) {

            score++;

        }

    }


    // Score show
    result.innerHTML = "Your Score: " + score + "/20";


    // Submit hide
    submitBtn.style.display = "none";

});