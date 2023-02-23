// List of Questions and Answers
var words = ["dikha","bol","bhai","bro","KGF","Pushpa","Bahubali","Badri","pyndi","Joshimath","coding","mazaa","agar","nahi","Pathaan","Ayush","kyun","hai","kaise","aur","phir","lambai","jbtk","har","Anshul","Divya","Ria","Sumit","Dipika","Nawal","Sneha"]

var dialogues = ["Rishte mein to hum tumhare baap lagte hain","Flower samjhe kya, flower nahin fire hoon main","Kursi ki peti baandh lo. Mausam bigadne wala hai","Pathaan abhi zinda hai","Hum jahan khade hote hain, line wahin se chalu hoti hai", "Haar ke jeetne wale ko baazigar kehte hain", "Uska to na bad luck hi kharab hai", "Hows the josh?", "Baap ka Dada ka, sabka badla lega tera Faizal!","Mana nahin kiye hain, permissan leni chahiye thi", "Tumse na ho payega", "Mhari choriyan choro se kam hai kay?", "Tension lene ka nahin, sirf dene ka", "Har team ka ek hi gunda ho sakta hai, aur is team ka gunda main hoon", "Utha le re baba", "Kabhi Kabhi lagta hai apun ich bhagwaan hai","aane wala pal, jaane wala hai","picture abhi baaki hai mere dost", "Dosti ka ek usool hai madam - no sorry no thank you"]
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
var playBtn = document.getElementById("myButton");
var uniqueClassName = 'ql-Achal'; // What is your unique className?
var submitBtn2 = document.querySelector("#score_submit");

var sendBtn = document.querySelector('.' + uniqueClassName); // Fetch the element

var editorEl = document.querySelector("#code_pnd");


// Quiz's initial state

var currentQuestionIndex = 0;
var clicked = false;
var time = 120;
var timerId;
var score = 0;
var aud = new Audio('correct.mp3')
aud.preload = 'auto'
var aud_wrong = new Audio('wrong.mp3')
aud_wrong.preload = 'auto'
var aud_small_good = new Audio('small_good.mp3')
aud_small_good.preload = 'auto'
var aud_good = new Audio('good.mp3')
aud_good.preload = 'auto'
var aud_big_good = new Audio('big_good.mp3')
aud_big_good.preload = 'auto'

// Start quiz and hide frontpage



function quizStart() {
    timerId = setInterval(clockTick, 1000);

    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();    
}

// Loop through array of questions and answers and create list with buttons

function getQuestion() {
  var list_of_prompts = ["0","0","0","0"];
  var last_index = 0;
  for (let i = 0; i < list_of_prompts.length; i++) {    
    var random_int = Math.floor(Math.random() * (dialogues.length + 1) );
    while (random_int == last_index){
    var random_int = Math.floor(Math.random() * (dialogues.length + 1) ); 
    }
    last_index = random_int;
    //console.log(random_int)
    list_of_prompts[i] = dialogues[random_int]
  }
  //console.log(list_of_prompts)
  var correct_ans_ind = Math.floor(Math.random() * (4) );
  var correct_ans = list_of_prompts[correct_ans_ind];
  //console.log(correct_ans)
  var text_to_enter = "";
  for (let i = 0; i < list_of_prompts.length; i++) {
    text_to_enter = text_to_enter + 'line' + String(i) + " = '" + list_of_prompts[i] + "'\n";
  }
  console.log(text_to_enter)
  



  var currentQuestion = "Computer se likhao : " + correct_ans;

  var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion;
    choicesEl.innerHTML = "";
    sendBtn.disabled = false; 
    quill.enable(true);
            var length = quill.getLength();
            console.log(length);
          //   console.log(data_full);
            quill.deleteText(0, length);
            quill.insertEmbed(0,'code-block', "");
            quill.insertText(0, text_to_enter);    
    
    // currentQuestion.options.forEach(function(choice, i) {
    //     var choiceBtn = document.createElement("button");
    //     choiceBtn.setAttribute("value", choice);
    //     choiceBtn.textContent = i + 1 + ". " + choice;
    //     choiceBtn.onclick = questionClick;
    //     choicesEl.appendChild(choiceBtn);
    // });
}

const randomEmoji = () => {
  const emojis = ['👏', '👍', '🙌', '🤩', '🔥', '⭐️', '🏆', '💯'];
  let randomNumber = Math.floor(Math.random() * emojis.length);
  return emojis[randomNumber];
};


window.mobileCheck = function mobileCheck() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function submit_score() {
  //var name_player = document.querySelector("#name");
  name_player = $('#name').val();
  check_value = mobileCheck();
  

  $.post("https://ach4l.pythonanywhere.com/pyndilb2",
      {
        contentType: 'application/json;charset=UTF-8',
        data: {"final_score": score,
        "name": name_player,
        "mobile": check_value
      },
        dataType: 'json'         
      },
      function(data,status){
        console.log(data);
        console.log(data[0]['Name'])
        var idx = 0
        data.forEach(function(score) {
          console.log(score['Name']);
          console.log(score['Score']);
            // var liTag = document.createElement("li");
            // liTag.textContent = score['Name'] + " - " + score['Score'];
            // var olEl = document.getElementById("highscores");
            // olEl.appendChild(liTag);
          const card = document.createElement('div');
  card.classList = 'card-body';


  
        

     








  let newRow = document.createElement('li');
  newRow.classList = 'c-list__item';
  newRow.innerHTML = `
		<div class="c-list__grid">
			<div class="c-flag c-place u-bg--transparent">${idx+1}</div>
			<div class="c-media">
				<img class="c-avatar c-media__img" src="boy-icon.png" />
				<div class="c-media__content">
					<div class="c-media__title">${score['Name']}</div>
					<a class="c-media__link u-text--small" href="https://instagram.com/jo_bhi_ho" target="_blank">@jo_bhi_ho</a>
				</div>
			</div>
			<div class="u-text--right c-kudos">
				<div class="u-mt--8">
					<strong>${score['Score']}</strong> ${randomEmoji()}
				</div>
			</div>
		</div>
	`;
  if (idx + 1 === 1) {
    newRow.querySelector('.c-place').classList.add('u-text--dark');
    newRow.querySelector('.c-place').classList.add('u-bg--yellow');
    newRow.querySelector('.c-kudos').classList.add('u-text--yellow');
  } else if (idx + 1 === 2) {
    newRow.querySelector('.c-place').classList.add('u-text--dark');
    newRow.querySelector('.c-place').classList.add('u-bg--teal');
    newRow.querySelector('.c-kudos').classList.add('u-text--teal');
  } else if (idx + 1 === 3) {
    newRow.querySelector('.c-place').classList.add('u-text--dark');
    newRow.querySelector('.c-place').classList.add('u-bg--orange');
    newRow.querySelector('.c-kudos').classList.add('u-text--orange');
  }
  list.appendChild(newRow);
  idx=idx+1;})}




      )}

  // highscores.forEach(function(score) {
  //   var liTag = document.createElement("li");
  //   liTag.textContent = score.name + " - " + score.score;
  //   var olEl = document.getElementById("highscores");
  //   olEl.appendChild(liTag);
  // });
      

  


 


// Check for right answers and deduct time for wrong answer, go to next question

myButton.onClick = function questionClick() {
  sendBtn.disabled = true; 
  var promptEl = document.getElementById("question-words").textContent;
  promptEl = promptEl + '';
  var answer = promptEl.slice(21);
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
          var answer_returned = output_list[1].slice(17);
          console.log("answer_returned");
          console.log(answer_returned);
          if (answer_returned == answer) {
            aud.play()
            console.log(output_list[1])
            console.log("Sahi")
            feedbackEl.textContent = "Sahi Jawaab!";
            feedbackEl.style.color = "green";
            score = score + 5;
            
            if (score==25){             
              aud_small_good.play();              
            } else if (score==50){              
              aud_good.play();             
            } else if (score==75){              
              aud_big_good.play();              
            }
            scoreEl.textContent = score;
            var length_1 = quill.getLength();
            quill.deleteText(0, length_1);
            quill.insertEmbed(0,'code-block', "");
            getQuestion();    
          } else {
            aud_wrong.play()            
            console.log("Galat")
            feedbackEl.textContent = "Afsos, Galat Jawab!";
            feedbackEl.style.color = "red"; 
            sendBtn.disabled = false; 
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

// submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;




