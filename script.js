//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let count = 11;
let countdown;
let point;




//Questions and Options array

const quizArray = [{
        id: "0",
        question: "Who is the father of HTML?",
        options: ["Rasmus Lerdorf", "Brendan Eich", "Sergey Brin", "Tim Berners lee"],
        correct: "Tim Berners lee",
    },
    {
        id: "1",
        question: "What is the work of address tag element in HTML5?",
        options: [" contains IP address", "contains home address", "  contains url", "contains contact details for author"],
        correct: "<!doctype html>",
    },
    {
        id: "2",
        question: "Which of the following is used to read an HTML page and render it?",
        options: ["Web server", " Web network", "Web browser", "Web matrix"],
        correct: "Web browser",
    },
    {
        id: "3",
        question: " In which part of the HTML metadata is contained?",
        options: ["head tag", " title tag", "html tag", "body tag"],
        correct: "head tag",
    },
    {
        id: "4",
        question: "What is DOM in HTML?",
        options: ["Language dependent application programming", " Hierarchy of objects in ASP.NET", "Application programming interface", "Convention for representing and interacting with objects in html documents"],
        correct: "Convention for representing and interacting with objects in html documents",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");

});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            // userScore.innerHTML =
            //   "Your score is " + scoreCount + " out of " + questionCount;

            let user_name1 = sessionStorage.getItem("username");
            document.querySelector(".display-user").innerHTML = user_name1;


            let points = sessionStorage.getItem("points");
            document.querySelector(".final-point").innerHTML = points;







        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;


        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {

    let user_name = sessionStorage.getItem("username");
    document.querySelector(".user-name").innerHTML = user_name;

    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};



//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
        point += 5;
        sessionStorage.setItem("points", point);

    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    point = 0;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
// startButton.addEventListener("click", () => {

//   startScreen.classList.add("hide");
//   displayContainer.classList.remove("hide");
//   initial();
// });



//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");


    //claer text field and sessionStrorage
    document.getElementById("username").value = "";
    sessionStorage.clear();

};


//when user click on start button
function submitName(e) {
    e.preventDefault();
    let username = document.forms["welcome-form"]["username"].value;

    if (username == "") {
        alert("Enter the Name");
        return false;
    } else {
        sessionStorage.setItem("username", username);

        startScreen.classList.add("hide");
        displayContainer.classList.remove("hide");
        initial();
        console.log(username);


        return true;
    }





}