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
  
      optionsEl.addEventListener('click', checkquestion)       // adds a click event to all buttons, and directs them
                                                               // to a function that will check if the user chose the correct answer
      console.log(optionsSection, index)
}

//sets up display for the question card 
function proceedNext () { 

    const questionSection = document.getElementById('question-view');
    questionSection.innerHTML= '';
    const optionsSection = document.createElement('section'); // part of template
    optionsSection.setAttribute('id', 'options-space');

    const questionEl = document.createElement('h3');        //assigning a question the <h3> status

    questionSection.appendChild(questionEl)                 // arrange to form a whole template
    questionSection.appendChild(optionsSection)     

    const questionConfig = questions[index]                 // reaches into questions main variable 
    const questionOptions = questionConfig.options;         // reaches in the 'options' subcategory of the main variable

    // questionSection.innerHTML = '' ;                     // creating space to hold a string 
    questionEl.textContent = questionConfig.question        // fills string above with a question (the loop will increment them)

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

    const rootSection = document.getElementById('root');    // parent node
    const homeSection = document.getElementById('home');    // child node

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

//will render them in a list 
// function renderScoreList () {
//     let scoreList = document.createElement('li');
// }

// to save the user's scores 

function saveScores(amountOfPoints) {
// Save related form data as an object
   let storeScores = JSON.parse(localStorage.getItem(amountOfPoints));
   
   { 

//     student: student.value,
//     grade: grade.value,
//     comment: comment.value.trim()
//  };
// Use .setItem() to store object in storage and JSON.stringify to convert it as a string
//  localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
}}
 
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