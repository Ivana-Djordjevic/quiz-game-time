# quiz-game-time

## Description

- The goal is the following:

"User Story
       AS A coding boot camp student
       I WANT to take a timed quiz on JavaScript fundamentals that stores high scores  
       SO THAT I can gauge my progress compared to my peers

Acceptance Criteria
       GIVEN I am taking a code quiz
       WHEN I click the start button
       THEN a timer starts and I am presented with a question
       WHEN I answer a question
       THEN I am presented with another question
       WHEN I answer a question incorrectly
       THEN time is subtracted from the clock
       WHEN all questions are answered or the timer reaches 0
       THEN the game is over
       WHEN the game is over
       THEN I can save my initials and my score"**

I have met the the criterias, however there is still much work that needs to be if this were for a real client: bugs in the JS, and inconsiscent CSS. Also, content wise, i would expect more questions, because no one can challenge themselves enough to want a highscore with only 5 questions.

Javascript issues: 
1- need to either remove the feedback child node or add a conditional statement to it, so it disappears when the game ends
2- need to add addtional properties to the input bar so it includes the placeholder and the user doesn't have to wonder what to type in, adding it after the naming its id was not fruitful
3- need to add a functional 'play again button' so the user does have to disconnect from play mode and refresh the page themselves. In addition to that, the CSS of it would need to appear below the input box & submit button, with a top margin so it's not glued to one another.
4- highscore section the bug: only displays the initials and score if you submit it twice. also in most games high scores are listed in descending order, so the user does not have look for their highest score, it currrently looks likes word vomit and displays the scores in the order in which they were earned. so it needs an additional functino to monitor that

CSS issues:
1- highscores should be to the right of the screen, but below the root id 
2- the score themselves should be below the "Highscores" heading, which they are not, alhough it is stylistic, the would be done in JS i believe
2- the button for the "Reset Scores" and the questions do match the style, unless they're being hovered over
3- the question font-size is too small
4- the possible answers should be in block display for more consistency (aka, i could easily select the third answer, and click away in less than a second. they also need line height so they're not glued together
5- the feedback message should also display in block, not inline with the possible answers. it should appear below

The images below will illustrate the aforementioned issues:
![screenshot of a webpage that explains the rule of a game and has start button](intro.jpg)
![the question view: questions at top with answers all in one line below](questionDisplay.jpg)
![the score view: displays the user score in a unorganized way](scoreDisplay.jpg)

Here is the link: https://runningaroundintheabyss.github.io/quiz-game-time/

## Instalations

N/A

## Usage

A quiz to pass your time. Given its issues, it would not be a pleasing user experience.

## Credits

 ** from their README file 

    https://ucdavis.bootcampcontent.com/ucdavis-boot-camp/UCD-VIRT-FSF-PT-03-2023-U-LOLC/-/blob/main/04-Web-APIs/02-Challenge/README.md 
 

## License

MIT License

