const pomodoroTime = document.querySelector('#pomodoro-time');
const startButton = document.querySelector('#start');
const breakButton = document.querySelector('#break');
const pomodoroButton = document.querySelector('#pomodoro');
const resetButton = document.querySelector('#reset');
let timeMinutes = 25;
let timeSeconds = 0;
let isStarted = false;
let timerId;
let mode = "pomodoro";

function makeTimer() {
    const minutes = timeMinutes.toString().padStart(2, '0');
    const seconds = timeSeconds.toString().padStart(2, '0');
    pomodoroTime.textContent = `${minutes}:${seconds}`;
};

startButton.addEventListener('click', () => {
    if (isStarted) {
        stopTimer();
    } else {
        timerId = setInterval(() => {
            if (timeSeconds > 0) {
                timeSeconds -= 1;
            } else if (timeMinutes > 0) {
                timeMinutes -= 1;
                timeSeconds = 59;
            }
            
            if (timeMinutes <= 0) {
                stopTimer();
            };
            
            makeTimer()
        }, 10);
        isStarted = !isStarted;  
    };

    startButton.textContent = isStarted ? "stop" : "start"; 
});

breakButton.addEventListener('click', () => {
    mode = "break";
    typeOfTimer();
    stopTimer();
    makeTimer();
    pomodoroButton.classList.remove('active');
    breakButton.classList.add('active')
});

pomodoroButton.addEventListener('click', () => {
    mode = "pomodoro";
    typeOfTimer();
    stopTimer();
    makeTimer();
    pomodoroButton.classList.add('active');
    breakButton.classList.remove('active')
});

resetButton.addEventListener('click', () => {
    stopTimer();
    typeOfTimer();
});

function stopTimer() {
    clearInterval(timerId);
    startButton.textContent = "start";
    isStarted = false;
};

function typeOfTimer() {
    if (mode === "pomodoro") {
        timeMinutes = 25;
        timeSeconds = 0;
        makeTimer();
    } else {
        timeMinutes = 5;
        timeSeconds = 0;
        makeTimer();
    };
}
