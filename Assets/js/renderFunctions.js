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

const amountOfPoints = 0;

const startButton = document.getElementById("start-button");
const timer = document.getElementById("timerDisplay");

startButton.setAttribute("style", "font-size: 30px; border-radius: 20px; padding: 10px; " );
timer.setAttribute("style", "font-size: 30px; text-shadow: 2px 2px 4px rgba(3, 2, 5, 0.5);" );

let timeLeft = 3000;

let index = 0;

// still also need to store the data

function endGame(){
// #region
// 1 - question card tunrs into 
// question = game over 
// options = enter initals: [box to enter initals], submit button
/* <section id='highscoreTable'>
    <h2> 
      Game Over!
    </h2>
  <form id="form">
      <label for="initials"> 
        Enter your itinals:
      </label>
      <input type="text" placeholder="type your initials here ^_^" id="iDboxField" />
      <button id="save">
        Save
      </button>
    </form>
  </section>
    <script src="./Assets/js/renderFunctions.js"></script> */
// #endregion

const scoreSection = document.createElement('section'); //part of template
scoreSection.setAttribute('id', 'score-view')


}

//basic countdown (endgamr functio is not filled)
function updateTimer() {                                      // keeps the seconds moving
    const n = (timeLeft/100).toFixed(2);                      // setting the decimal point, _ _._ _ seconds
    timeLeft--;                                               // increments down the assigned seconds by 1
    timer.innerText = n + ' seconds remaining';               // displays output of this function 
                                                              // maybe if wrong question deduct points instead of line 139
  if (timeLeft === 0.00) {                                    // make it conditional so it doesn't go in the negatives
    clearInterval(timerInterval);                             // stops at 0.00 but for some reason it stop at 0.01 
    endGame ();                                               // will replace the questionSection with a calculatedScore section + 
  }
}

//start timer
function startTimer() {                                        // starts the timer
  timerInterval = setInterval(updateTimer, 10);                // by using '10' the countdown will display the miliseconds too 
}



// #region 
// Question for Aristo: at the end of the JS statements, 
// is it better to ";" on all of them? or just leave them empty
// since it's not CSS and JS doesn't really care (?maybe)
// what do you recommend?
// #endregion

// central grader
function checkquestion(event) {                               // data processor that ouputs the if the user selected a correct or incorrect answer
                                                              // you'll need a function that will 
    const clickedButtonElement = event.target
    const selectedOptionAndPointsIndex = clickedButtonElement.getAttribute('data-index') //gets the indices of the clicked answer
    const correctAnswerPseudoIndex = questions.correctAnswer  // is the number that needs to match the selected index by the user to get a correct answer 

    if ( selectedOptionAndPointsIndex === correctAnswerPseudoIndex) {   //checks is their answer is correct
        amountOfPoints = amountOfPoints + 10 ;                           // if so you get 10 points
        displayFeedbackMessage();
    }                          
        else {                                                           // if incorrect answer
            amountOfPoints = amountOfPoints - 2 ;                        // you lose 2 points
                                                                         // can you combine two conditions likes that ? 
            timeLeft -= 1000;                          // does that work since there's a parameter in the function so it can use the time variable?
            displayFeedbackMessage();
            }                       
     
        console.log(amountOfPoints);

    index++;                                                            // go through index one by one
    proceedNext();                                                      // go through all the questions

        console.log(amountOfPoints);
    
    endGame();                                        // will end the game when function available
                                     //does that order make sense? since proceed next will limit the questions through the addOptionElement(), then the checkQuestion(),
                                     // so when they're both exhausted it will proceed to endGame()
}

// adding dynamic properties to the answers
function addOptionElement (optionsSection, index) {            // adding properties(values) to the answers

    const optionsEl = document.createElement('button');        // turn the answers into buttons
    optionsEl.setAttribute('data-index', index)
      
      optionsSection.innerHTML = ''                            // create a space to hold string
      optionsEl.textContent = questions[index].options[index]; // fills the string, with button-anted answers
      optionsSection.appendChild(optionsEl);                   // attaches the buttons above to the optionsSection template
  
      optionsEl.addEventListener('click', checkquestion)       // adds a click event to all buttons, and directs them
                                                               // to a function that will check if the user chose the correct answer
      console.log(optionsSection, index)
}

// #region
//     startGame() {
//       startTimer() // 
//       mountQuestion() { // proceedNext
//         mountOptions() // addOptionElements
//       }
//     }
// #endregion

//sets up display for the question card ¡¡¡ HAS NOT REPLACED THE 'home' card yet !!!
// figure where the replacement will happen 
// containts a error remark
function proceedNext () { 

    const questionSection = document.createElement('section'); //part of template
    questionSection.setAttribute('id', 'question-view')

    const optionsSection = document.createElement('section'); // part of template
    optionsSection.setAttribute('id', 'options-space');

    const questionEl = document.createElement('h3');         //assigning a question the <h3> status

    // #region
    // questionSection.innerHTML = ''
    // questionEl.textContent = questionConfig.question  
// i think the ReferenceError was coming up because i used questionConfig before naming it
    // #endregion

    questionSection.appendChild(questionEl)                 // arrange to form a whole template
    questionSection.appendChild(optionsSection)

    const questionConfig = questions[index]                 // reaches into questions main variable 
    const questionOptions = questionConfig.options;         // reaches in the 'options' subcategory of the main variable

    questionSection.innerHTML = '' ;                        // creating space to hold a string 
    questionEl.textContent = questionConfig.question        // fills string above with a question (the loop will increment them)

    for (let i = 0; i < questionOptions.length -1; i++) {   // goes through all possible answers
        addOptionElement(index)                             // function that will apply to all the answers
    }                                                       // this is where it will make the options dynamic 
    // remove root child (home id in html)
}

// this will display whether they selected the correct or incorrect answer
function displayFeedbackMessage (checkQuestion){

    const feedback = document.createElement('p')            // new element to add
    feedback.setAttribute('style', 'padding-top: 10px;');   // padding so it's not glued beneath the options
    // #region
    //should i put this below the proceedNextFunction so it appears below the options?
    //come back to this, after you're done to figure out the order in which JS will read it
    // #endregion
    questionSection.appendChild(feedback);                  // it's below the proceedNext () .: should appear below the options

    const feedbackConfig = feedbackOptions[index];          // can select bewtween the indices 

    feedback.innerHTML= '' ;                                // creates space to hold string above

    if (selectedOptionAndPointsIndex === correctAnswerPseudoIndex) {       // conditional statements to display correct feedback message
        feedback.textContent = feedbackConfig[0] 
    } 
        else {
        feedback.textContent = feedbackConfig[1]
    }
}


//optimize later, just make a separate function for the replacements
// not functional, need to connect to click event 
function replaceHomeSection (questionSection) {

    const rootSection = document.getElementById('root');    // parent node
    const homeSection = document.getElementById('home');    // child node

    rootSection.replaceChild(questionSection, homeSection );    //replaceChildren(...questionSection);
}

startButton.addEventListener('click', function(){           //starting up the first cascade of events
    startTimer()        
    replaceHomeSection()
    proceedNext()                                           // need to add: Element.replaceChildren()
                                                            // figure out best placement
    // #region 
    // document.getElementById('home').classList.add('hide')
    // document.getElementById('highscoreTable').classList.remove('hide')
    // #endregion
});

//will render them in a list 
function renderScoreList {

    let scoreList = document.createElement('li');
    

}



// to save the user's scores 
function saveScores(amountOfPoints) {
// Save related form data as an object
   let storeScores = JSON.parse(localStorage.getItem(amountOfPoints));
   
   { 

    student: student.value,
    grade: grade.value,
    comment: comment.value.trim()
 };
Use .setItem() to store object in storage and JSON.stringify to convert it as a string
 localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
}
 
// #region
// kkay well at least we've got a timer, basic, but it works]
// what other simple task can i do that will improve me mood
// ? oh, we can make the questions and answers
// #endregion


//#region
// what else can i handle at the moment 
//break it down
// break it down even more 
// what's a little thing you can do
// #endregion

// #region

// function createHomeNode () {
//     // create a root node, for the home component
//     // add any attributes to to the home component
//     // add any children to the home component 
// }

// function createButtonNode (){

// }

// function createScoreNode () {

// } 

// #endregion