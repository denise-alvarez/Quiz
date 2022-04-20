//questions w/choices and answers

var questions = [
      {
        title: "A Nightmare on Elm Street takes place where?",
        choices: ["Springwood, Ohio", "Springwood, California", "Cunninham County, New Jersey", "Bakersfield, California"],
        answer: "Springwood, Ohio"
      },
      {
        title: "How many Michael Myers Halloween movies are there?",
        choices: ["8", "9", "10", "4"],
        answer: "9"
      },
      {
        title: "What's 'the secret' of Michael Myer's Mask?",
        choices: ["The original was accidentally auctioned off for $86","It's actually a Lee Majors mask painted white","It's actually a William Shatner mask painted white",],
        answer: "It's actually a William Shatner mask painted white"
      },
      {
        title: "What is the name of the demon from The Exorcist?",
        choices: ["Pazuzu", "Tannin", "Abaddon", "Azazel"],
        answer: "Pazuzu"
      },
      {
        title:"What cult movie franchise is said to be cursed following a series of accidents and tragedies involving actors in various films?",
        choices: ["Poltergeist", "Alien", "Hostel", "Car"],
        answer: "Poltergeist"
      }
    ];     


var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;
  
// variables to elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

//function to begin quiz
function beginQuiz() {        
  
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  
 
  questionsEl.removeAttribute("class");
  
  timerId = setInterval(clockTick, 1200);


  timerEl.textContent = time;

  getQuestion();
}
//function to retrieve question
function getQuestion() {
  
  var currentQuestion = questions[currentQuestionIndex];
  
 
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  
 
  choicesEl.innerHTML = "";
  
 
  currentQuestion.choices.forEach(function(choice, i) {
  // button for each choice
  var choiceNode = document.createElement("button");
  choiceNode.setAttribute("class", "choice");
  choiceNode.setAttribute("value", choice);
  
  choiceNode.textContent = i + 1 + ". " + choice;
  
  //click event listener to each choice
  choiceNode.onclick = questionClick;
  
  
  choicesEl.appendChild(choiceNode);
});
}
//function to tell user if they are wrong or correct, penalized for wrong answers
function questionClick() {
  
  if (this.value !== questions[currentQuestionIndex].answer) {
    
    time -= 30;

    if (time < 0) {
      time = 0;
    }

   
    timerEl.textContent = time;

    feedbackEl.textContent = "Wrong!";
  } else {
   
    feedbackEl.textContent = "Correct!";
  }     

    

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  },  1000);
  
 
  currentQuestionIndex++;
  
  
  if (currentQuestionIndex === questions.length) {
    quizEnd();
   } else {
   getQuestion();
   }
}        
//function to end timer, get final score
function quizEnd() {
    
    clearInterval(timerId);
  
   

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  
    
  var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
  
   
    questionsEl.setAttribute("class", "hide");
}
  
function clockTick() {
  
    time--;
    timerEl.textContent = time;
  

    if (time <= 0) {
      quizEnd();
  }
}


function saveHiscore() {
   
    var initials = initialsEl.value.trim();
  
    
    if (initials !== "") {
       
        var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
        
        var newScore = {
        score: time,
        initials: initials
        };
  
        
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        window.location.href = "Highscore.html"
 
    }
}
  
function checkEnter(event) {

  if (event.key === "Enter") {
    saveHiscore();
  }
}

startBtn.addEventListener ("click" , beginQuiz);
submitBtn.addEventListener ("submit", saveHiscore);