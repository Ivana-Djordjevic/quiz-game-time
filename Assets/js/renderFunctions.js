const questions = [{
    question: 'What is the circumference of the Earth?', 
    options: [ '~20k miles', '~22k miles', '~23k miles', '~25k miles' ], 
  //  points: [-2, -2, -2, 10],
    correctAnswer: 3,
},{ 
    question: 'What is the circumference of Earths moon?', 
    options: [ '~5k miles', '~6k miles', '~7k miles', '~8k miles' ], 
   // points: [-2, -2, 10, -2],
    correctAnswer: 2,
},{ 
    question: 'What is the circumference of the Sun?', 
    options: [ '~1 million miles', '~3 millions miles', '~5 million', '~7 million miles' ], 
  //  points: [-2, 10, -2, -2],
    correctAnswer: 1,
},{ 
    question: 'What is the circumference of Pluto?', 
    options: [ '~5k miles', '~6k miles', '~7k miles', '~8k miles' ], 
  //  points: [10, -2, -2, -2],
    correctAnswer: 0,
},{
    question: 'What is the circumference of the Jupiter?', 
    options: [ '~170k miles', '~200k miles', '~240k miles', '~270k miles' ], 
  //  points: [-2, -2, -2, 10],
    correctAnswer: 3,
}
]

const feedbackOptions = ['Correct Answer!', 'Incorrect Answer, -10 seconds x_X'];

let amountOfPoints = 0;

const startButton = document.getElementById("start-button");
const timer = document.getElementById("timerDisplay");

startButton.setAttribute("style", "font-size: 30px; border-radius: 20px; padding: 10px; " );
timer.setAttribute("style", "font-size: 30px; text-shadow: 2px 2px 4px rgba(3, 2, 5, 0.5);" );

let timeLeft = 3000;

let index = 0;

let userScore = new Array(amountOfPoints) // maybe? 

const rootSection = document.getElementById('root');    // parent node
const homeSection = document.getElementById('home');    // child node

// #region

// alright so, we are on the right path
// we are struggling to envision what the node child for the end will look like
//
// okay so CHILD 1:
//          <h3> will be the title ie Game over 
//          <p> you score is ____ <br>
//          <p> Enter your itnitals: 
//          <input> box to enter initials 
//          <button> submit
// that will be the first child node
//
// then next CHILD 2: // 2nd child canceled - optmize another time, priortize meeting the bare min 
//          <h4> Challenge yourseld and try again 
//          <button> play again 
//
// kkay, so let's create those first, and worry about the next stop after
//
// #endregion



// userScore.push(newScore);  //newscore not defined, but we are adding new scores to the userScore array which is needed for local storage
// window.localStorage.setItem('userScore', JSON.stringify(userScore)); // saves to local storage



//function tryAgainSection

function endGame(){      //i dont know how to make questions section available 
                        // i set the rootSection and homeQuestion as global varibles and it did not affect the running code
                        // however setting questionSection as global did negatively affect the code 
                        // not sure what to do 
                        
    const scoreSection = document.createElement('section');
    scoreSection.setAttribute ('id', 'score-view');          //Child node

    const gameOverMessage = document.createElement('h4');
    gameOverMessage.setAttribute ('id', 'game-over');
    gameOverMessage.textContent = 'Game Over!';             // is innerText better?

    const userScoreDisplay = document.createElement('p');
    userScoreDisplay.setAttribute ('id', 'recent-score');
    userScoreDisplay.textContent = 'Your score is ' + userScore;

    const inputBox = document.createElement('input');
    inputBox.setAttribute('id', 'intials-box');

    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'submit-button');
    submitButton.innerText = 'Submit'; //line below commented to prevent js error 
   // submitButton.addEventListener('click', tryAgainSection)                     // figured innerText here because it's within the button
    //                                           // click will go to next child node not yet created
    //                                           // tryAgainSection not declared, its a placeholder
    const playAgainButton = document.createElement('button');
    playAgainButton.setAttribute('id', 'play-again-button')
    playAgainButton.innerText = 'Click here to go back to the main page';
    playAgainButton.addEventListener('click', location.reload() ) // not sure about this one 
                   // do i need a function to reuse dynamic properties of the startButton
                   // i could maybe a - turn the startbutton into a function, that way when you click play again, the startButton function reruns
                   // however that does not take into account that it it will be replacing diff nodes
                   //okay so maybe just bring it back to home page 
                   // just refresh the page i guess 

    scoreSection.appendChild(gameOverMessage);
    scoreSection.appendChild(userScoreDisplay);
    scoreSection.appendChild(inputBox);
    scoreSection.appendChild(submitButton); 

    rootSection.replaceChild(scoreSection, questionSection);
}

//basic countdown (endgamr functio is not filled)
function updateTimer() {                                      // keeps the seconds moving
    const n = (timeLeft/100).toFixed(2);                      // setting the decimal point, _ _._ _ seconds
    timeLeft--;                                               // increments down the assigned seconds by 1
    timer.innerText = n + ' seconds remaining';               // displays output of this function 

  if (timeLeft <= 0) {                                    // make it conditional so it doesn't go in the negatives
    clearInterval(timerInterval);                             // stops at 0.00 but for some reason it stop at 0.01 
    timer.innerText = 0 + ' seconds remaining'; 
    endGame ();                                               // will replace the questionSection with a calculatedScore section + 
  }
}

//start timer
function startTimer() {                                        // starts the timer
  timerInterval = setInterval(updateTimer, 10);                // by using '10' the countdown will display the miliseconds too 
}

// central grader
function checkquestion(event) {                               // data processor that ouputs the if the user selected a correct or incorrect answer
                                                              // you'll need a function that will 
    const clickedButtonElement = event.target
    const selectedOptionAndPointsIndex = parseInt(clickedButtonElement.getAttribute('data-index')) //gets the indices of the clicked answer
    const correctAnswerPseudoIndex = questions[index].correctAnswer  // is the number that needs to match the selected index by the user to get a correct answer 

    console.log({selectedOptionAndPointsIndex, correctAnswerPseudoIndex})

    if ( selectedOptionAndPointsIndex === correctAnswerPseudoIndex) {   //checks is their answer is correct
        amountOfPoints = amountOfPoints + 10 ;                           // if so you get 10 points
        displayFeedbackMessage(0);
    }                          
        else {                                                           // if incorrect answer
            amountOfPoints = amountOfPoints - 2 ;                        // you lose 2 points
            timeLeft -= 1000;                          
            displayFeedbackMessage(1);
            }                       
     
//        console.log(amountOfPoints);

    if (index === questions.length -1) {
        endGame()
    } else {
        index++;                                                            // go through index one by one
        proceedNext();                                                      // go through all the questions    
    } 
//        console.log(amountOfPoints);
}

// adding dynamic properties to the answers
function addOptionElement (optionsSection, index, i) {            // adding properties(values) to the answers

    console.log(index, i)
    const optionsEl = document.createElement('button');        // turn the answers into buttons
    optionsEl.setAttribute('data-index', i) 
      
      // optionsSection.innerHTML = ''                            // create a space to hold string, was removed
      optionsEl.textContent = questions[index].options[i]; // fills the string, with button-anted answers
      optionsSection.appendChild(optionsEl);                   // attaches the buttons above to the optionsSection template
  
      optionsEl.addEventListener('click', checkquestion);       // adds a click event to all buttons, and directs them
                                                               // to a function that will check if the user chose the correct answer
     // console.log(optionsSection, index);
}

//sets up display for the question card 
function proceedNext () { 

    const questionSection = document.getElementById('question-view');
    questionSection.innerHTML= '';
    const optionsSection = document.createElement('section'); // part of template
    optionsSection.setAttribute('id', 'options-space');

    const questionEl = document.createElement('h3');        //assigning a question the <h3> status

    questionSection.appendChild(questionEl);                 // arrange to form a whole template
    questionSection.appendChild(optionsSection);     

    const questionConfig = questions[index];                 // reaches into questions main variable 
    const questionOptions = questionConfig.options;         // reaches in the 'options' subcategory of the main variable

    // questionSection.innerHTML = '' ;                     // creating space to hold a string 
    questionEl.textContent = questionConfig.question;        // fills string above with a question (the loop will increment them)

    for (let i = 0; i < questionOptions.length; i++) {      // goes through all possible answers
        addOptionElement(optionsSection, index, i)          // function that will apply to all the answers
    }                                                       
    return questionSection;
}

// this will display whether they selected the correct or incorrect answer
function displayFeedbackMessage (feedbackIndex){

    const feedback = document.createElement('p')                 // new element to add
    feedback.setAttribute('style', 'padding-top: 10px;');     // padding so it's not glued beneath the options
    
    feedback.textContent= feedbackOptions[feedbackIndex]
    const feedbackSection = document.getElementById('feedback')  
    feedbackSection.innerHTML = ''
    feedbackSection.appendChild(feedback)                         // it's below the proceedNext () .: should appear below the options
}


//optimize later, just make a separate function for the other replacements
function replaceHomeSection () {

    const questionSection = document.createElement('section'); //part of template
    questionSection.setAttribute('id', 'question-view')

    const feedbackSection = document.createElement('section')
    feedbackSection.setAttribute('id', 'feedback')

    

    // console.log(questionSection)
    // console.log(homeSection)

    rootSection.replaceChild(questionSection, homeSection);    
   
    rootSection.appendChild(feedbackSection)
}

//starting up the first cascade of events
startButton.addEventListener('click', function(){           
    startTimer()     
    replaceHomeSection()
    proceedNext()   
});

// to save the user's scores 

function saveScores(amountOfPoints) {
// Save related form data as an object
   let storeScores = JSON.parse(localStorage.getItem(amountOfPoints));
   
   { 

// class example:
//     student: student.value,
//     grade: grade.value,
//     comment: comment.value.trim()
//  };
// Use .setItem() to store object in storage and JSON.stringify to convert it as a string
//  localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
}}
 


