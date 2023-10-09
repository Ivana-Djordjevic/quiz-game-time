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

const startButton = document.getElementById('start-button');
const timer = document.getElementById('timerDisplay');

startButton.setAttribute("style", "font-size: 30px; border-radius: 20px; padding: 10px; " );
timer.setAttribute("style", "font-size: 30px; text-shadow: 2px 2px 4px rgba(3, 2, 5, 0.5);" );

let amountOfPoints = 0;
let timeLeft = 3000;
let index = 0;
let submitScore = false;

const rootSection = document.getElementById('root');                        
const homeSection = document.getElementById('home');      

const scoreSection = document.createElement('section');
scoreSection.setAttribute ('id', 'score-view');      

const questionSection = document.createElement('section');          
questionSection.setAttribute('id', 'question-view');

function playAgain() {

    const playAgainSection = document.getElementById('play-again-card');
    playAgainSection.innerHTML = '';

    const playAgainButtonEl = document.createElement('button');
    playAgainButtonEl.setAttribute("style", "font-size: 30px; border-radius: 20px; padding: 10px; " );
    playAgainButtonEl.innerText = 'Play Again';

    playAgainSection.appendChild(playAgainButtonEl);
    
    playAgainButtonEl.addEventListener('click', function(){  
        timeLeft = 3000; 
        index = 0;    
        amountOfPoints = 0; 
        submitScore = false;   
        startTimer();    
        replaceScoreSection();
        proceedNext();   
    });
}

function endGame(){     
                         
    document.getElementById('feedback').innerHTML='';
    
    clearInterval(timerInterval); 
                        
    scoreSection.innerHTML = ''                    

    const gameOverMessage = document.createElement('h4');
    gameOverMessage.setAttribute ('id', 'game-over');
    gameOverMessage.innerText = 'Game Over!';             

    scoreSection.appendChild(gameOverMessage);

    const userScoreDisplay = document.createElement('p');
    userScoreDisplay.setAttribute ('id', 'recent-score');
    userScoreDisplay.innerText = 'Your score is ' + amountOfPoints;          

    scoreSection.appendChild(userScoreDisplay);

    const inputBox = document.createElement('input');
    inputBox.setAttribute('id', 'initials-box');
    inputBox.setAttribute('placeholder', 'Enter your initals here');
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
        console.log('hello')
        handleSaveHighscore(amountOfPoints);
    });

    loadScores();
    playAgain();

    rootSection.replaceChild(scoreSection, questionSection);

    return amountOfPoints;
}

// helper function - assists playAgain()
function replaceScoreSection() {

    rootSection.replaceChild(questionSection, scoreSection);
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
    optionsEl.setAttribute('id', 'options-box')                
                           
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
    feedback.setAttribute('style', 'position:absolute; left:20%;');             
    
    feedback.innerText= feedbackOptions[feedbackKey];                  
    const feedbackSection = document.getElementById('feedback');  
    feedbackSection.innerHTML = '';
    feedbackSection.appendChild(feedback);                             
}

// replaces home card with question card, maybe optimize later to have a replace function where you can apply both the question card and the score card if that's plausible 
function replaceHomeSection() {

    const feedbackSection = document.createElement('section')
    feedbackSection.setAttribute('id', 'feedback')

    rootSection.replaceChild(questionSection, homeSection);    
   
    rootSection.appendChild(feedbackSection)
}

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

    const currentScores = JSON.parse(localStorage.getItem('high-scores'));
    const scoreList = document.getElementById('score-list');

    scoreList.innerHTML = '';

    if(currentScores === null){
        return;
    }

    currentScores.sort((a, b) => b.score - a.score);

    currentScores.forEach(element => {
        const newListItem = document.createElement('li')
        newListItem.textContent =`${element.initials} : ${element.score}`;
        scoreList.append(newListItem);
    });
}

function saveToStorage(newScore){

    let currentScores = JSON.parse(localStorage.getItem('high-scores'));

    if(!currentScores){
        currentScores =[];
    }

    if(!submitScore){
        currentScores.push(newScore);
        localStorage.setItem('high-scores', JSON.stringify(currentScores));
        submitScore = true;
        loadScores(); 
    }
}

//starting up the first cascade of events
startButton.addEventListener('click', function(){           
    startTimer();     
    replaceHomeSection();
    proceedNext();   
});

// resets the highscore
document.getElementById('reset-scores').addEventListener('click', function(event){
    localStorage.removeItem('high-scores')
    loadScores()
})

loadScores();