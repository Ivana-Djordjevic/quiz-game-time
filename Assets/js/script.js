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
},{ 
    question: 'What is the circumference of Earths moon?', 
    options: [ '~5k miles', '~6k miles', '~7k miles', '~8k miles' ], 
    correctAnswer: 2,
},{ 
    question: 'What is the circumference of the Sun?', 
    options: [ '~2 million miles', '~3 millions miles', '~4 million', '~5 million miles' ], 
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

// #region
// when you click on it, the first question will appear & the timer starts
// #endregion
function startGame () {

}

// will start a countdown 
function timer () {

}

// will proceed to the next question after you select an answer from the current question 
function proceedToNextQuestion () {

}

// will let you know if the correct or wrong answer was selected 
function correctAnswerSelected () {

}

// will deduct 10 seconds from the timer if the question is answered incorrectly
function deductTime () {

}

// will end the game if the user gets too many incorrect answers, 
// and as a result will the game end before going through all the questions, 
// --> and proceed to scores if user runs out of time 
function endGamePrematurely () {
// need to validate this: if timer reaches 0 before going throught the questions.length then proceed to scores container, else ignore 
}

// after user is done answering questions it will tell them their score and ask to enter their initials to submit
function proceedToCurrentScore () { 
    // can the following functions be consolidated: proceedToNextQuestion & proceedToScores, maybe? figure out later
// 
}

//

// replay button will start the game again
function replay () {

}

//randomize the the questions, so when the user restarts the game, the questions are not in the same order
function randomizeOrderOfQuestions () {

}

// access the stored highscores 
function lookAtScores () {
    //when you click on the Highscores button from the header you'll get the list + replay button 
    //add a conditional statement so that if they click on the "highscores" button before playing, 
    //the replay button will display "play" -- maybe add another function?

    //set it so that the list of scores has a max of 10 entries,
    // if there's more than 10, it will only store the highest ones - maybe a new function
}

// set a max number of entries, and delete the lowest scores
function deleteLowestScores () {

}