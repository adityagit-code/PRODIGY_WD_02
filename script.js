let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timer);
    timer = null;
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;

    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("laps").innerHTML = "";

    // Remove active state from all buttons
    document.querySelectorAll(".buttons button")
        .forEach(btn => btn.classList.remove("active"));
}

function updateTime() {
    elapsedTime = Date.now() - startTime;

    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

    document.getElementById("display").textContent =
        `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function lapTime() {
    if (isRunning) {
        const lap = document.createElement("li");
        lap.textContent = document.getElementById("display").textContent;
        document.getElementById("laps").appendChild(lap);
    }
}

function pad(num) {
    return num < 10 ? "0" + num : num;
}

/* Highlight clicked button */
function handleButton(button) {
    const buttons = document.querySelectorAll(".buttons button");
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
}
