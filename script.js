 let status = document.querySelector(".status");
    let W = document.getElementById("W");
    let L = document.getElementById("L");
    let R = document.getElementById("res");
    const yourImg = document.getElementById("your_choice");
    const compImg = document.getElementById("computer_choice");

    const score = JSON.parse(localStorage.getItem("score")) || {
      wins: 0,
      loses: 0,
    };

    function updateScoreUI() {
      W.innerText = score.wins;
      L.innerText = score.loses;
    }

    updateScoreUI();

    function playGuess(userChoice) {
      const images = {
        Head: "Heads.jpeg",
        Tails: "Tails.jpeg",
      };

      const compChoice = Math.random() < 0.5 ? "Head" : "Tails";

      status.style.display = "block";
      yourImg.src = images[userChoice];
      compImg.src = images[compChoice];
      yourImg.alt = userChoice;
      compImg.alt = compChoice;

      if (userChoice === compChoice) {
        score.wins++;
        R.textContent = "You Win! 🎉";
        R.style.color = "green";
      } else {
        score.loses++;
        R.textContent = "You Lose! 😞";
        R.style.color = "red";
      }

      localStorage.setItem("score", JSON.stringify(score));
      updateScoreUI();
    }

    function resetScore() {
      score.wins = 0;
      score.loses = 0;
      localStorage.removeItem("score");
      updateScoreUI();
      R.textContent = "your score has been reset successfully!";
      R.style.color = "#081b31";
      
    }

    let isAutoPlaying = false;
    let intervalId;

    function AutoPlay() {
      const autoPlayBtn = document.getElementById("autoPlayBtn");
      if (!isAutoPlaying) {
        intervalId = setInterval(() => {
          const randomChoice = Math.random() < 0.5 ? "Head" : "Tails";
          playGuess(randomChoice);
        }, 1000);
        isAutoPlaying = true;
        autoPlayBtn.textContent = "Stop";
      } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoPlayBtn.textContent = "AutoPlay";
      }
    }