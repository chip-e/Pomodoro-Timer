const pomodoroTimer = document.querySelector('#pomo-timer');
const startButton = document.querySelector('#pomo-start');
const stopButton = document.querySelector('#pomo-stop');

let workDurationInput = document.querySelector('#input-work-duration');
let breakDurationInput = document.querySelector('#input-break-duration');

workDurationInput.value = '25';
breakDurationInput.value = '5';

// Timer buttons
startButton.addEventListener('click', () => {
    toggleClock();
});


stopButton.addEventListener('click', () => {
    toggleClock(true);
});

workDurationInput.addEventListener('input', () => {
  updatedWorkSessionTime = minuteToSeconds(workDurationInput.value);
});

breakDurationInput.addEventListener('input', () => {
  updatedBreakSessionTime = minuteToSeconds(breakDurationInput.value);
});

const minuteToSeconds = (minutes) => {
  return minutes * 60;
}

let isClockRunning = false;
let isClockStopped = true;
// Pomodoro Work time: 25 mins in seconds
let workSessionTime = 1500;
let currentTimeLeft = 1500;
// Short break time: 5 mins in seconds
let breakSessionTime = 300;
// Work and Break toggle
let sessionType = "Work";
let timeInCurrentSession = 0;
let taskLabel = document.querySelector('#pomo-task');
let updatedWorkSessionTime;
let updatedBreakSessionTime;

const progressBar = new ProgressBar.Circle('#pomo-timer', {
  strokeWidth: 2,
  text: {
    value: '25:00',
  },
  trailColor: '#f4f4f4',
})

const toggleClock = (reset) => {
  togglePlayPauseIcon(reset);
  if (reset) {
    // STOP TIMER
    stopClock();
  } else {
    if (isClockStopped) {
      setUpdatedtimers();
      isClockStopped = false;
    }
    if (isClockRunning === true){
    // PAUSE TIMER
      clearInterval(clockTimer);
      isClockRunning = false;
    } else {
    // START TIMER
      clockTimer = setInterval(() => {
        stepDown();
        displayCurrentTimeLeft();
        progressBar.set(sessionProgress());
      }, 1000);
      isClockRunning = true;
    }
    showStopIcon();
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
    return time < 10 ? `0${time}` : time;
  }
  if (hrs > 0) result += `$(hours):`
  result += `${addLeadingZeroes(mins)}:${addLeadingZeroes(seconds)}`;
  // pomodoroTimer.innerText = result.toString();
  progressBar.text.innerText = result.toString();
}

const stopClock = () => {
  // // Reset timer
  // Updating variable after stopping timer
  // Display time spent in session
  setUpdatedtimers();
  displaySessionLog(sessionType);
  clearInterval(clockTimer);
  isClockStopped = true;
  isClockRunning = false;
  // Reset time left 
  currentTimeLeft = workSessionTime;
  // Update display
  displayCurrentTimeLeft();
  // Resetting session to "Work"
  sessionType = 'Work';
  timeInCurrentSession = 0;
}

const stepDown = () => {
  if (currentTimeLeft > 0) {
    currentTimeLeft--;
    timeInCurrentSession++;
  } else if (currentTimeLeft === 0) {
    // Switching from "Work" to "Break"
    timeInCurrentSession = 0;
    if (sessionType === 'Work') {
      currentTimeLeft = breakSessionTime;
      displaySessionLog('Work');
      sessionType = 'Break';
      setUpdatedtimers();
      taskLabel.value = 'Break';
      taskLabel.disabled = true;
    } else {
      currentTimeLeft = workSessionTime;
      sessionType = 'Work';
      setUpdatedtimers();
      if (taskLabel.value === 'Break') {
        taskLabel.value = workSessionLabel;
      }
      taskLabel.disabled = false;
      displaySessionLog('Break');
    }
  }
  displayCurrentTimeLeft();
}

const displaySessionLog = (sessionType) => {
  const sessionsList = document.querySelector('#pomo-sessions');
  // appending li
  const li = document.createElement('li');
  // let sessionLabel = sessionType;
  if (sessionType === 'Work') {
    sessionLabel = taskLabel.value ? taskLabel.value : 'Work'
    workSessionLabel = sessionLabel;
  } else {
    sessionLabel = 'Break';
  }
  let elapsedTime = parseInt(timeInCurrentSession / 60);
  elapsedTime = elapsedTime > 0 ? elapsedTime : '< 1';

  const text = document.createTextNode(`${sessionLabel}: ${elapsedTime} min`);
  li.appendChild(text);
  sessionsList.appendChild(li);

}

const setUpdatedtimers = () => {
  if (sessionType === 'Work') {
    currentTimeLeft = updatedWorkSessionTime ? updatedWorkSessionTime : workSessionTime;
    workSessionTime = currentTimeLeft;
  } else {
    currentTimeLeft = updatedBreakSessionTime ? updatedBreakSessionTime : breakSessionTime;
    breakSessionTime = currentTimeLeft;
  }
}

const togglePlayPauseIcon = (reset) => {
  const playIcon = document.querySelector('#play-icon');
  const pauseIcon = document.querySelector('#pause-icon');
  if (reset) {
    // Revert to play icon when resetting
    if (playIcon.classList.contains('hidden')) {
      playIcon.classList.remove('hidden');
    }
    if (!pauseIcon.classList.contains('hidden')) {
      pauseIcon.classList.add('hidden');
    }
  } else {
    playIcon.classList.toggle('hidden');
    pauseIcon.classList.toggle('hidden');
  }

}

const showStopIcon = () => {
  const stopButton = document.querySelector('#pomo-stop');
  stopButton.classList.remove('hidden');
}


const sessionProgress = () => {
  // Calculating session completion rate
  const sessionDuration = 
    sessionType === 'Work' ? workSessionTime : breakSessionTime;
  return (timeInCurrentSession / sessionDuration);
}





