var scores, roundScore, activePlayer, gamePlaying, prevDice1, prevDice2;

gamePlaying = true;

resetValues();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    // Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // Display result
    document.getElementById('dice1').style.display = 'block';
    document.getElementById('dice2').style.display = 'block';
    document.getElementById('dice1').src = '../img/dice-' + dice1 + '.png';
    document.getElementById('dice2').src = '../img/dice-' + dice2 + '.png';
    // Update round score IF the rolled number was not one
    if (dice1 !== 1 && dice2 !== 1) {
      if (dice1 === 6 && prevDice1 === 6 || dice2 === 6 && prevDice2 === 6) {
        // Player looses score
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = 0;
        nextPlayer();
      }else {
        // Add score
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        prevDice1 = dice1;
        prevDice2 = dice2;
      }
    }else {
      nextPlayer();
    }
  }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.getElementById('name-'+activePlayer).textContent = 'WINNER!';
      hideDices();
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }else {
      // Next player
      nextPlayer();
    }
  }

});

document.querySelector('.btn-new').addEventListener('click', resetValues);

function nextPlayer() {
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
  hideDices();
  prevDice = undefined;
}

function resetValues() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;

  hideDices();
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

  gamePlaying = true;
}

function hideDices() {
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';
}
