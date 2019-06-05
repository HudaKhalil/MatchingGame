# Memory Game Project
![](https://cdn1.imggmi.com/uploads/2019/4/21/d3e3dce1f934f396f8a27fb65862ceb9-full.png)

Also known as ***Concentration Game***, is a card game in which all of the cards are laid face down on a surface and two cards are flipped face up over each turn. The object of the game is to turn over pairs of matching cards as fast as you can.


## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

  Players flip over cards to locate the pairs that match The goal. There are a couple of interactions handled:

  - ***Creating Card Board***
  Create a grid of four columns and four rows. The parent div will be the ***deck*** containing all cards. The cards can be created as an unordered list and stored in array called cardList and styled to look like a paper card using flexbox and CSS styling effects.
        
  - ***Shuffle Cards***
  In this project, a function to shuffle an array was already provided from here. This is known as Fisher-Yates (aka Knuth) Shuffle. With this function, we should be able to shuffle our cards on the game board.
  
  - ***Flipping cards***
  FlipCard function job, the icons are behind the card and it flips to show the icon when it’s clicked. When closed, card background color is dark blue and the font size is zero. When opened background color changes to light pink and font size increase.
  
  - ***Check Cards Matched or Not***
  For this part, we need to make each card unique. The function matcCard check the innerHTML of both flipped cards if they are matched it will play sound and add matched cards to machedCards array list. if the cards not matched another error sound will play and the cards will be flipped backward again.
  
  - ***Counting Moves***
  Another function called countMoves will start counting player moves after clicking the second card each time. And results will be saved in moves counter to be displayed on the score-panel.
  
  - ***Rating System***
  Depending on moves counter, if the player moves between 8 and 12 the stars will be decrement by one star and if the player exceeds 13 moves another start will be decrement from his rating score. 
  
  - ***Game Timer***
  The timer function startTimer will start after checking the first click done by the player in the game and stop if the player win or the game restarted.
  
  - ***Game Restart Button***
    function resetGame, the main job of this function is to empty the cardBox and reset all game timers then startGame again.
    
  - ***Congratulations Modal***
  The winGame function checks to see if all cards are matched, then stop the timer and gets total number of moves, stars rating and time spent. It displays all previous collected information in a congratulation modal. There are also functions to close the modal and reset the game on clicking the close icon and play again.

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
