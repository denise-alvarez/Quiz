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

// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;
  
// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
  
function beginQuiz() {        
  // hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  
  // un-hide questions section
  questionsEl.removeAttribute("class");
  // start timer
  timerId = setInterval(clockTick, 1200);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];
  
  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  
  // clear out any old question choices
  choicesEl.innerHTML = "";
  
  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
  // create new button for each choice
  var choiceNode = document.createElement("button");
  choiceNode.setAttribute("class", "choice");
  choiceNode.setAttribute("value", choice);
  
  choiceNode.textContent = i + 1 + ". " + choice;
  
  // attach click event listener to each choice
  choiceNode.onclick = questionClick;
  
  // display on the page
  choicesEl.appendChild(choiceNode);
});
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 30;

    if (time < 0) {
      time = 0;
    }

    // this will show new time
    timerEl.textContent = time;

    feedbackEl.textContent = "Wrong!";
  } else {
   
    feedbackEl.textContent = "Correct!";
  }     

    
  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  },  1000);
  
  // this will ask the next quesiton
  currentQuestionIndex++;
  
  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
   } else {
   getQuestion();
   }
}        

function quizEnd() {
    // stop timer
    clearInterval(timerId);
  
    // show end screen

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  
    // show final score
  var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
  
    // hide questions section
    questionsEl.setAttribute("class", "hide");
}
  
function clockTick() {
  // this will update the code.
    time--;
    timerEl.textContent = time;
  
  //this will indicated if users ran out of time.
    if (time <= 0) {
      quizEnd();
  }
}


function saveHiscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== "") {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
        // format new score object for current user
        var newScore = {
        score: time,
        initials: initials
        };
  
        // this .push function will save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        window.location.href = "Highscore.html"
        // want to display a list on the left side when they click "score sheet" to view results.
    }
}
  
function checkEnter(event) {

  if (event.key === "Enter") {
    saveHiscore();
  }
}

startBtn.addEventListener ("click" , beginQuiz);
submitBtn.addEventListener ("submit", saveHiscore);