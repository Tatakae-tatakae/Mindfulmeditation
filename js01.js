// Add interactivity for the levels
const levels = document.querySelectorAll('.level');
const timerContainer = document.getElementById('timer-container');
const timerDisplay = document.getElementById('timer');
const stopTimerButton = document.getElementById('stop-timer');
const audio = document.getElementById('meditation-audio');
const audioSource = document.getElementById('audio-source');

let countdown;
let totalTime;

// Convert minutes to MM:SS format
function formatTime(minutes, seconds) {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start the timer
function startTimer(duration) {
  let timeRemaining = duration * 60; // Convert minutes to seconds
  clearInterval(countdown); // Clear any previous timer
  countdown = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = formatTime(minutes, seconds);
    timeRemaining--;

    // Stop when time runs out
    if (timeRemaining < 0) {
      clearInterval(countdown);
      timerDisplay.textContent = "Session Complete!";
      audio.pause(); // Stop the sound
    }
  }, 1000);
}

// Stop the timer
function stopTimer() {
  clearInterval(countdown);
  timerContainer.classList.add('hidden');
  audio.pause(); // Pause audio
  audio.currentTime = 0; // Reset audio
}

// Attach event listeners to the levels
levels.forEach(level => {
  level.addEventListener('click', () => {
    const mindfulnessTime = parseInt(level.getAttribute('data-mindfulness'), 10);
    const soundFile = level.getAttribute('data-sound');

    // Set audio source and play
    audioSource.src = soundFile;
    audio.load();
    audio.play();

    // Show timer container and start timer
    timerContainer.classList.remove('hidden');
    startTimer(mindfulnessTime);
  });
});

// Attach event listener to stop button
stopTimerButton.addEventListener('click', stopTimer);
