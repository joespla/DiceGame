/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function() {
  // Random number
  var dice = Math.floor(Math.random() * 6) + 1;
  // Display result
  var diceDOM = document.querySelector('.dice')
  diceDOM.style.display = 'block';
  diceDOM.src = '../img/dice-' + dice + '.png';
  // Update round score IF the rolled number was not one
  if (dice !== 1) {
    // Add score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }else {
    nextPlayer();
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  // Add current score to global score
  scores[activePlayer] += roundScore;
  // Update the UI
  document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
  // Check if player won the game
  if (scores[activePlayer] >= 10) {
    document.getElementById('name-'+activePlayer).textContent = 'WINNER!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  }else {
    // Next player
    nextPlayer();
  }

});

function nextPlayer(){
  // Set current score to zero
  document.getElementById('current-' + activePlayer).textContent = 0;
  roundScore = 0;
  // Change class to activate based on the active player
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
  // Change active player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  // Change class to activate based on the deactive player
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
  // Hide dice for next player
  document.querySelector('.dice').style.display = 'none';
}

//
