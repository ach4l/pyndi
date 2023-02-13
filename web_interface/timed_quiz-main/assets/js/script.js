// List of Questions and Answers
var words = ["pyndi","Joshimath","coding","mazaa","agar","nahi","Pathaan","Ayush","kyun","hai","kaise","aur","phir","lambai","jbtk","har","Anshul","Divya","Ria","Sumit","Dipika","Nawal","Sneha"]


// Get Dom Elements

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var scoreEl = document.querySelector("#score");
var reStartBtn = document.querySelector("#restart");

// Quiz's initial state

var currentQuestionIndex = 0;
var time = 120;
var timerId;
var score = 0;

// Start quiz and hide frontpage

function insert_sample_code() {
  url_query = "https://ach4l.pythonanywhere.com/pyndiexamples?example=print_simple"
      $.post(url_query,
        {
          contentType: 'application/json;charset=UTF-8',
          dataType: 'json'         
        },
        function(data,status){
            quill.enable(true);
            var length = quill.getLength();
            console.log(length);
          //   console.log(data_full);
            quill.deleteText(0, length);
            quill.insertEmbed(0,'code-block', "");
            quill.insertText(0, data);           
          
        }); 
      
};

function quizStart() {
    timerId = setInterval(clockTick, 1000);

    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
    insert_sample_code();
}

// Loop through array of questions and answers and create list with buttons

function getQuestion() {
  var random_int = Math.floor(Math.random() * (20 + 1) );
  var current_word = words[random_int];
  var currentQuestion = "Computer se likhao : " + current_word;

  var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion;
    choicesEl.innerHTML = "";
    // currentQuestion.options.forEach(function(choice, i) {
    //     var choiceBtn = document.createElement("button");
    //     choiceBtn.setAttribute("value", choice);
    //     choiceBtn.textContent = i + 1 + ". " + choice;
    //     choiceBtn.onclick = questionClick;
    //     choicesEl.appendChild(choiceBtn);
    // });
}





// Check for right answers and deduct time for wrong answer, go to next question

myButton.onClick = function questionClick() {
  var promptEl = document.getElementById("question-words").textContent;
  promptEl = promptEl + '';
  var answer = promptEl.split(" ")[4];
  console.log(answer);
  // Do whatever you want here. You could use this.getValue() or this.setValue() if you wanted.
  gtag('event', 'executed', {
    'app_name': 'pyndi_likh_game',
    'screen_name': 'Demo'
  });
  delta = quill.getContents();
  delta_array = delta['ops'];
  console.log(delta_array)
  let result = '';
  for (var i = 0; i < delta_array.length; i++) {               
      result=result.concat(delta_array[i]['insert']);            
  }
  
  console.log(result);
  console.log(delta_array[0]['insert'])
  
    
      $.post("https://ach4l.pythonanywhere.com/pyndi",
      {
        contentType: 'application/json;charset=UTF-8',
        data: {"code_pyndi":result},
        dataType: 'json'         
      },
      function(data,status){
        console.log(data.slice(3,4));
        output_list = data.split('\n')
        
          quill3.enable(true);
          var length = quill3.getLength();
          console.log(length);
          quill3.deleteText(7, length);
          quill3.insertEmbed(7,'code-block', "");
          quill3.insertText(7, data);                
          quill3.disable();

          if (output_list[1] == answer) {
            console.log(output_list[1])
            console.log("Sahi")
            feedbackEl.textContent = "Sahi Jawaab!";
            feedbackEl.style.color = "green";
            score = score + 5;
            scoreEl.textContent = score;
            getQuestion();    
          } else {
            console.log(output_list[1])
            console.log(answer)
            console.log("Galat")
            feedbackEl.textContent = "Afsos, Galat Jawab!";
            feedbackEl.style.color = "green";  
          }
          
        
      });
      window.event.preventDefault();
      
  // For example, get the selected text and convert it to uppercase:
  // const { index, length } = quill.selection.savedRange
  // const selectedText = quill.getText(index, length)
  // const newText = selectedText.toUpperCase()
  // quill.deleteText(index, length)
  // quill.insertText(index, newText)
  // quill.setSelection(index, newText.length)
  return true
}


function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      timerEl.textContent = time;
      feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
      feedbackEl.style.color = "red";
    } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

// End quiz by hiding questions, stop timer and show final score

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = score;
    questionsEl.setAttribute("class", "hide");    
}

// End quiz if timer reaches 0

function clockTick() {
    time--;
    
    if (time <= 0) {
      quizEnd();
    }
}

// Save score in local storage along with users' name

function saveHighscore() {
    var name = nameEl.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: score,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

// Save users' score after pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;

