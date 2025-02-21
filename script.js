const pomodoroTime = document.querySelector('#pomodoro-time');
const startButton = document.querySelector('#start');
const breakButton = document.querySelector('#break');
const pomodoroButton = document.querySelector('#pomodoro');
const resetButton = document.querySelector('#reset');
let timeMinutes = 25;
let timeSeconds = 60;
let isStarted = false;
let updateMinutes;
let updateSeconds; 

function makeTimer() {
    const minutes = timeMinutes.toString().padStart(2, '0');
    const seconds = timeSeconds.toString().padStart(2, '0');
    pomodoroTime.textContent = `${minutes}:${seconds}`;
};

startButton.addEventListener('click', () => {
    if (isStarted) {
        clearInterval(updateMinutes);
        clearInterval(updateSeconds);
        isStarted = !isStarted;
    } else {
        updateMinutes = setInterval(() => {
            timeMinutes--;
            if (timeMinutes <= 0) {
                clearInterval(updateMinutes);
                clearInterval(updateSeconds);
                
                timeMinutes = 25;
                timeSeconds = 0;
                startButton.textContent = "start";
            };
            makeTimer()
        }, 600);
        
        updateSeconds = setInterval(() => {
            timeSeconds--;
            if (timeSeconds <= 0) {
                timeSeconds = 59;
            };
            makeTimer()
        }, 10);
        isStarted = !isStarted;  
    };

    startButton.textContent = isStarted ? "stop" : "start"; 
});

breakButton.addEventListener('click', () => {
    clearInterval(updateMinutes);
    clearInterval(updateSeconds);
    timeMinutes = 5;
    timeSeconds = 0;
    makeTimer();
    pomodoroButton.classList.remove('active');
    breakButton.classList.add('active')
});

pomodoroButton.addEventListener('click', () => {
    timeMinutes = 25;
    timeSeconds = 0;
    makeTimer();
    pomodoroButton.classList.add('active');
    breakButton.classList.remove('active')
});

resetButton.addEventListener('click', () => {
    clearInterval(updateMinutes);
    clearInterval(updateSeconds);
    if (pomodoroButton) {
        timeMinutes = 25;
        timeSeconds = 0;
        makeTimer();
    } else {
        timeMinutes = 5;
        timeSeconds = 0;
        makeTimer();
    }
})

