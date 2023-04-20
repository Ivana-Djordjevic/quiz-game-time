// #region
// User Story
//        AS A coding boot camp student
//        I WANT to take a timed quiz on JavaScript fundamentals that stores high scores  
//        SO THAT I can gauge my progress compared to my peers
// Acceptance Criteria
//        GIVEN I am taking a code quiz
//        WHEN I click the start button
//        THEN a timer starts and I am presented with a question
//        WHEN I answer a question
//        THEN I am presented with another question
//        WHEN I answer a question incorrectly
//        THEN time is subtracted from the clock
//        WHEN all questions are answered or the timer reaches 0
//        THEN the game is over
//        WHEN the game is over
//        THEN I can save my initials and my score
// #endregion

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

const rootSection = document.getElementById('root');                        // parent node
const homeSection = document.getElementById('home');                        // child node

function endGame(){     
                                       
    clearInterval(timerInterval); 
                        
    const scoreSection = document.createElement('section');
    scoreSection.setAttribute ('id', 'score-view');                          //Child node

    const gameOverMessage = document.createElement('h4');
    gameOverMessage.setAttribute ('id', 'game-over');
    gameOverMessage.innerText = 'Game Over!';             

    scoreSection.appendChild(gameOverMessage);

    const userScoreDisplay = document.createElement('p');
    userScoreDisplay.setAttribute ('id', 'recent-score');
    userScoreDisplay.innerText = 'Your score is ' + amountOfPoints;          // userscore is a placeholder until we figure out the localstorage stuff

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
//        feedbackSection.remove(feedback);  
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
function updateTimer() {                                                // keeps the seconds moving
    const n = (timeLeft/100).toFixed(2);                                // setting the decimal point, _ _._ _ seconds
    timeLeft--;                                                         // increments down the assigned seconds by 1
    timer.innerText = n + ' seconds remaining';                         // displays output of this function 

  if (timeLeft <= 0) {                                                  // make it conditional so it doesn't go in the negatives
    timer.innerText = 0 + ' seconds remaining'; 
    endGame();                                                          // replaces question card with score card    
  }
}

//start timer
function startTimer() {                                                 // starts the timer
  timerInterval = setInterval(updateTimer, 10);                         // by using '10' the countdown will display the miliseconds too 
}

// central grader
function checkquestion(event) {                                         // data processor: grades the answers. assigns points and deducts time given incorrectness of answer 
                                                             
    const clickedButtonElement = event.target                           // when you click on an answer, this function will execute the code below
    const selectedOptionIndex = parseInt(clickedButtonElement.getAttribute('data-index')) //gets the indices of the clicked answer
    const correctAnswerPseudoIndex = questions[index].correctAnswer     // is the number that needs to match the selected index by the user to get a correct answer 

    if ( selectedOptionIndex === correctAnswerPseudoIndex) {             //checks if their answer is correct
        amountOfPoints = amountOfPoints + 10 ;                           // if so you get 10 points
        displayFeedbackMessage('success');                               // user receives feedback of correct answer
    }                          
        else {                                                           // if incorrect answer
            amountOfPoints = amountOfPoints - 2 ;                        // you lose 2 points
            timeLeft -= 1000;                                            // 10 seconds deducted from timer
            displayFeedbackMessage('incorrect');                         // user receives feedback of incorrect asnwer
            }                       
     
    if (index === questions.length -1) {                                 // .length returns the total amount of elements, .: 5 questions, -1 because array indices start at 0
        endGame();                                                       // replaces question card with score card 
    } else {
        index++;                                                         // go through index one by one
        proceedNext();                                                   // grade each click   
    } 
    
    return amountOfPoints;                                               // total value of points earned within one quiz
}

// adding dynamic properties to the answers
function addOptionElement (optionsSection, index, i) {            

    const optionsEl = document.createElement('button');                 // tunrs all optionsEl into a button
    optionsEl.setAttribute('data-index', i)                             // could not reach = questions[index].options[i] because [index]*2 in the same line does not work, needed to denotate them individually 
      
      optionsEl.innerText = questions[index].options[i];                // fills the string, with button-anted answers
      optionsSection.appendChild(optionsEl);                            // attaches the button-ated options to the optionsSection template
  
      optionsEl.addEventListener('click', checkquestion);               // adds a click event to all buttons, and directs them to the central grader
}

//sets up display for the question card 
function proceedNext () { 

    const questionSection = document.getElementById('question-view');
    questionSection.innerHTML= '';

    const optionsSection = document.createElement('section');           // part of template
    optionsSection.setAttribute('id', 'options-space');

    const questionEl = document.createElement('h3');                    //assigning a question the <h3> status

    questionSection.appendChild(questionEl);                            // arrange to form a whole template
    questionSection.appendChild(optionsSection);     

    const questionConfig = questions[index];                            // reaches into questions main variable 
    const questionOptions = questionConfig.options;                     // reaches in the 'options' subcategory of the main variable

    questionEl.innerText = questionConfig.question;                     // fills string with question (the loop will increment them)

    for (let i = 0; i < questionOptions.length; i++) {                  // goes through all possible answers
        addOptionElement(optionsSection, index, i)                      // function that will apply to all the answers
    }                                                       
    return questionSection;
}

// this will display whether they selected the correct or incorrect answer
function displayFeedbackMessage (feedbackKey){

    const feedback = document.createElement('p')                 
    feedback.setAttribute('style', 'padding-left: 10px;');             // padding so it's not glued beneath the options
    
    feedback.innerText= feedbackOptions[feedbackKey];                  // goes through the key here, .: during the proceedNext function, you can assign which value you want 
    const feedbackSection = document.getElementById('feedback');  
    feedbackSection.innerHTML = '';
    feedbackSection.appendChild(feedback);                             // it's below the proceedNext () .: should appear below the options
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

    // #region
    // function saveHighscore() {

    //     const inputBox = document.createElement('input');

    //     inputBox.addEventListener('keypress', function(event) {  //display function potential wip, maybe? so it displays the score and initals 
    //         if (event.key === 'Enter') {
    //             event.preventDefault();
    //             document.getElementById('submit-button').click();
    //         }
    //     })     // to grab user initals 
    // } 
    // #endregion
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