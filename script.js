const pomodoroTimer = document.querySelector('#pomo-timer')
const startButton = document.querySelector('#pomo-start')
const pauseButton = document.querySelector('#pomo-pause')
const stopButton = document.querySelector('#pomo-stop')

// Timer buttons
startButton.addEventListener('click', () => {
    toggleClock();
})

pauseButton.addEventListener('click', () => {
    toggleClock();
})

stopButton.addEventListener('click', () => {
    toggleClock(true);
})

let isClockRunning = false;

// Pomodoro Work time: 25 mins in seconds
let workSessionTime = 1500;
let currentTimeLeft = 1500;

// Short break time: 5 mins in seconds
let shortBreakTime = 300;

const toggleClock = (reset) => {
  if (reset) {
    // STOP TIMER
  } else {
    if (isClockRunning === true){
    // PAUSE TIMER
    clearInterval(clearTimer);
      isClockRunning = false;
    } else {
    // START TIMER
      isClockRunning = true;
      clockTimer = setInterval(() => {
        currentTimeLeft--;
        displayCurrentTimeLeft();
      }, 1000);
    }
  }
}
// Time display
const displayCurrentTimeLeft = () => {
  const secondsLeft = currentTimeLeft;
  let result = '';
  const seconds = secondsLeft % 60;
  const mins = parseInt(secondsLeft / 60) % 60;
  let hrs = parseInt(secondsLeft / 3600);

  // Leading 0's if less than 10
  function addLeadingZeroes(time) {
    return time < 10 ? `0$(time)` : time;
  }
  if (hrs > 0) result += `$(hours):`
  result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
  pomodoroTimer.innerText = result.toString();
}
































