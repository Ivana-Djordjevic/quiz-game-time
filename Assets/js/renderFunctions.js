const questions = [{
    question: 'What is the circumference of the Earth?', 
    options: [ '~20k miles', '~22k miles', '~23k miles', '~25k miles' ], 
    correctAnswer: 3,
},
{ 
    question: 'What is the circumference of Earths moon?', 
    options: [ '~5k miles', '~6k miles', '~7k miles', '~8k miles' ], 
    correctAnswer: 2,
},{ 
    question: 'What is the circumference of the Sun?', 
    options: [ '~1 million miles', '~3 millions miles', '~5 million', '~7 million miles' ], 
    correctAnswer: 1,
},{ 
    question: 'What is the circumference of Pluto?', 
    options: [ '~5k miles', '~6k miles', '~7k miles', '~8k miles' ], 
    correctAnswer: 0,
},{
    question: 'What is the circumference of the Jupiter?', 
    options: [ '~170k miles', '~200k miles', '~240k miles', '~270k miles' ], 
    correctAnswer: 3,
}
]

const feedbackOptions = {
    success: 'Correct Answer!', 
    incorrect:'Incorrect Answer, -10 seconds o_0',
}

let amountOfPoints = 0;

const startButton = document.getElementById('start-button');
const timer = document.getElementById('timerDisplay');

startButton.setAttribute("style", "font-size: 30px; border-radius: 20px; padding: 10px; " );
timer.setAttribute("style", "font-size: 30px; text-shadow: 2px 2px 4px rgba(3, 2, 5, 0.5);" );

let timeLeft = 3000;

let index = 0;

const rootSection = document.getElementById('root');                        
const homeSection = document.getElementById('home');                        

function endGame(){     
                                       
    clearInterval(timerInterval); 
                        
    const scoreSection = document.createElement('section');
    scoreSection.setAttribute ('id', 'score-view');                         

    const gameOverMessage = document.createElement('h4');
    gameOverMessage.setAttribute ('id', 'game-over');
    gameOverMessage.innerText = 'Game Over!';             

    scoreSection.appendChild(gameOverMessage);

    const userScoreDisplay = document.createElement('p');
    userScoreDisplay.setAttribute ('id', 'recent-score');
    userScoreDisplay.innerText = 'Your score is ' + amountOfPoints;          

    scoreSection.appendChild(userScoreDisplay);

    const inputBox = document.createElement('input');
    inputBox.setAttribute('id', 'initials-box', 'placeholder', 'Enter your initals here');
//    document.getElementById('initals-box').placeholder = 'Enter your initals here';
    inputBox.addEventListener('keypress', function(event){
    if (event.key === 'Enter'){
        handleSaveHighscore(amountOfPoints)
    }
})
    scoreSection.appendChild(inputBox);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'submit-button');
    submitButton.innerText = 'Submit'; 

    scoreSection.appendChild(submitButton); 

    submitButton.addEventListener('click', function(event){
        event.preventDefault();
        handleSaveHighscore(amountOfPoints);
    });

    loadScores()
    document.getElementById('reset-scores').addEventListener('click', function(event){
        localStorage.removeItem('high-scores')
        loadScores()
    })
// #region
    // const playAgainButton = document.createElement('button');
    // playAgainButton.setAttribute('id', 'play-again-button');
    // playAgainButton.innerText = 'Click here to go back to the main page & play again'; 

    // scoreSection.appendChild(playAgainButton);

    // playAgainButton.addEventListener('click', location.reload);         // cannot invoke the function here otherwise, it will run outside the button and refresh the page on its own .: must remove the parenthesis 
// #endregion
    const questionSection = document.getElementById('question-view');    

    rootSection.replaceChild(scoreSection, questionSection);

    return amountOfPoints;
}

// countdown timer
function updateTimer() {                                                
    const n = (timeLeft/100).toFixed(2);                                
    timeLeft--;                                                         
    timer.innerText = n + ' seconds remaining';                         

  if (timeLeft <= 0) {                                                  
    timer.innerText = 0 + ' seconds remaining'; 
    endGame();                                                           
  }
}

//start timer
function startTimer() {                                                
  timerInterval = setInterval(updateTimer, 10);                         
}

// central grader
function checkquestion(event) {                                         
                                                             
    const clickedButtonElement = event.target                           
    const selectedOptionIndex = parseInt(clickedButtonElement.getAttribute('data-index')) 
    const correctAnswerPseudoIndex = questions[index].correctAnswer     

    if ( selectedOptionIndex === correctAnswerPseudoIndex) {             
        amountOfPoints = amountOfPoints + 10 ;                           
        displayFeedbackMessage('success');                               
    }                          
        else {                                                           
            amountOfPoints = amountOfPoints - 2 ;                        
            timeLeft -= 1000;                                            
            displayFeedbackMessage('incorrect');                         
            }                       
     
    if (index === questions.length -1) {                                 
        endGame();                                                       
    } else {
        index++;                                                        
        proceedNext();                                                  
    } 
    
    return amountOfPoints;                                       
}

// adding dynamic properties to the answers
function addOptionElement (optionsSection, index, i) {            

    const optionsEl = document.createElement('button');                 
    optionsEl.setAttribute('data-index', i)                             
      
      optionsEl.innerText = questions[index].options[i];              
      optionsSection.appendChild(optionsEl);                           
  
      optionsEl.addEventListener('click', checkquestion);              
}

//sets up display for the question card 
function proceedNext () { 

    const questionSection = document.getElementById('question-view');
    questionSection.innerHTML= '';

    const optionsSection = document.createElement('section');           
    optionsSection.setAttribute('id', 'options-space');

    const questionEl = document.createElement('h3');                    

    questionSection.appendChild(questionEl);                            
    questionSection.appendChild(optionsSection);     

    const questionConfig = questions[index];                            
    const questionOptions = questionConfig.options;                     

    questionEl.innerText = questionConfig.question;                     

    for (let i = 0; i < questionOptions.length; i++) {                   
        addOptionElement(optionsSection, index, i)                      
    }                                                       
    return questionSection;
}

// this will display whether they selected the correct or incorrect answer
function displayFeedbackMessage (feedbackKey){

    const feedback = document.createElement('p')                 
    feedback.setAttribute('style', 'padding-left: 10px;');             
    
    feedback.innerText= feedbackOptions[feedbackKey];                  
    const feedbackSection = document.getElementById('feedback');  
    feedbackSection.innerHTML = '';
    feedbackSection.appendChild(feedback);                             
}

// replaces home card with question card, maybe optimize later to have a replace function where you can apply both the question card and the score card if that's plausible 
function replaceHomeSection() {

    const questionSection = document.createElement('section');          
    questionSection.setAttribute('id', 'question-view')

    const feedbackSection = document.createElement('section')
    feedbackSection.setAttribute('id', 'feedback')

    rootSection.replaceChild(questionSection, homeSection);    
   
    rootSection.appendChild(feedbackSection)
}

//starting up the first cascade of events
startButton.addEventListener('click', function(){           
    startTimer();     
    replaceHomeSection();
    proceedNext();   
});

function handleSaveHighscore(amountOfPoints) {

    const initialsInput = document.getElementById('initials-box').value.trim();

    if(initialsInput === ''){
        alert('Please enter valid initials');
        return;
    }
    saveToStorage({
        initials: initialsInput,
        score: amountOfPoints,
    })
}

function loadScores(){

    var currentScores = JSON.parse(localStorage.getItem('high-scores'));
    var scoreList = document.getElementById('score-list');

    scoreList.innerHTML = '';

    if(currentScores === null){
        return;
    }

    currentScores.forEach(element => {
        var newListItem = document.createElement('li')
        newListItem.textContent =`${element.initials} : ${element.score}`;
        scoreList.append(newListItem);
    });
}

function saveToStorage(newScore){

    var currentScores = JSON.parse(localStorage.getItem('high-scores'));

    if(!currentScores){
        localStorage.setItem('high-scores', JSON.stringify([newScore]))
        return;
    }

    currentScores.push(newScore);
    localStorage.setItem('high-scores', JSON.stringify(currentScores));
    loadScores();
}