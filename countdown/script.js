// All the DOM
const titleOfTimer = $("h1");
const body = $("body");
const startBtn = $("#start-btn");
const timeStructure = $(".timer");
const stopBtn = $("#stop-btn");
const resetBtn = $("#re-start-btn");
const pauseBtn = $("#pause-btn");
const resumeBtn = $("#continue-btn");
const timeUp = $(".time-up-message");
const instructions = $(".instructions");
const allBtn = $("button");

// Set the stop, pause and resume buttons display to be none
stopBtn.css("display", "none");
resumeBtn.css("display", "none");
pauseBtn.css("display", "none");


// Set the stop, pause and resume buttons display to be none initially
// $("body").addClass("show-buttons");

// Locally stored data
const storedTitle = localStorage.getItem("title");
const storedTimeUp = localStorage.getItem("timeUpMessage");
const storedBackground = localStorage.getItem("backgroundColor");
const storedHr = localStorage.getItem("durationOne");
const storedMin = localStorage.getItem("durationTwo");
const storedSec = localStorage.getItem("durationThree");
const storedFont = localStorage.getItem("font");

// Some colours that may be inputted
const defaultValues = ["default", "DEFAULT"];
const whiteValue = "white";

if (defaultValues.includes(storedBackground)) {
    body.attr("class", "d-flex h-100 text-center bg-dark");
} else if (whiteValue.toLowerCase() === storedBackground.toLowerCase()) {
    timeStructure.attr("class", "timer mt-2 pt-5 text-dark");
    titleOfTimer.attr("class", "text-center mt-2 text-dark");
} else {
    body.css("background-color", storedBackground);
}

if (storedFont === "cursive") {
    timeUp.addClass("cursive");
    titleOfTimer.addClass("cursive");
} else if (storedFont === "serif") {
    timeUp.addClass("serif");
    titleOfTimer.addClass("serif");
} else if (storedFont === "sans-serif") {
    titleOfTimer.addClass("sans-serif");
    timeUp.addClass("sans-serif");
} else if (storedFont === "fantasy") {
    titleOfTimer.addClass("fantasy");
    timeUp.addClass("fantasy");
}

// Title of the timer
titleOfTimer.html(storedTitle);

// variables
let timer;
let totalSeconds;
let initialSeconds;
let remainingSeconds;
// let timeoutId;

// Button handling the timer
startBtn.on("click", startTimer);

// Enter key eventListener to start the timer
$(document).on("keydown", function (event) {
    if (event.key === "Enter" && startBtn.is(":visible")) {
        startTimer();
    }
});

// Handling the timer function
function startTimer() {
    const hours = parseInt(storedHr) || 0;
    const minutes = parseInt(storedMin) || 0;
    const seconds = parseInt(storedSec) || 0;
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    initialSeconds = totalSeconds;
    remainingSeconds = totalSeconds;
    const interval = 1000;

    timer = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            
            timeStructure.css("display", "none");
            timeUp.html(storedTimeUp);
            timeUp.css("display", "block");
            timeUp.css("color", "white");
            body.css("background", "red");
            timeUp.addClass("blink");
            startBtn.prop("disabled", true);
        }
    }, interval);
    startBtn.css("display", "none");
    stopBtn.css("display", "block");
    pauseBtn.css("display", "block");
    instructions.html("");
}

function updateTimerDisplay() {
    const timerElement = $(".timer");
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    const formattedTime = `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
    timerElement.html(formattedTime);
}

// Button clicks

// pause button
pauseBtn.on("click", function(e) {
    e.preventDefault();
    pauseTimer();
});

// resume button
resumeBtn.on("click", (e) => {
    e.preventDefault();
    resumeTimer();
});

// reset button
resetBtn.on("click", (e) => {
    e.preventDefault();
    resetTimer();
});


// Key down functions
$(document).on("keydown", (e) => {
    e.preventDefault();
    if (e.key === " " && !startBtn.is(":visible")) {
        if (pauseBtn.is(":visible")) {
            pauseTimer();
        } else if (resumeBtn.is(":visible")) {
            resumeTimer();
        }
    }
});

$(document).on("keydown", (e) => {
    if (e.key === "Escape" && !startBtn.is(":visible")) {
        resetTimer();
    }
});

$(document).on("keydown", (e) => {
    if (e.key === "Delete") {
        stopTimer();
    }
});

stopBtn.on("click", (e) => {
    e.preventDefault();
    stopTimer();
});

// mouse over event
// set all the buttons' opacity to be zero
allBtn.addClass("disappear");
let timeoutId;


$(document).on("mouseover", (e) => {
    e.preventDefault();
    allBtn.removeClass("disappear");
    timeoutId = setTimeout(() => {
        if (startBtn.is(":visible") || stopBtn.is(":visible") || pauseBtn.is(":visible") || resumeBtn.is(":visible") || resetBtn.is(":visible")) {
            allBtn.addClass("disappear");
        }
    }, 3000);
    
    
});

// Functions handling the timer

// function to reset the timer
function resetTimer() {
    clearInterval(timer);
    remainingSeconds = initialSeconds;
    timeStructure.css("display", "block");
    timeUp.css("display", "none");
    body.css("background-color", storedBackground);
    timeUp.removeClass("blink");
    startBtn.prop("disabled", false);
    startBtn.css("display", "block");
    stopBtn.css("display", "none");
    pauseBtn.css("display", "none");
    resumeBtn.css("display", "none");
    updateTimerDisplay();
}

// function to pause the timer
function pauseTimer() {
    clearInterval(timer);
    pauseBtn.css("display", "none");
    resumeBtn.css("display", "block");
}

// function to resume timer
function resumeTimer() {
    timer = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            timeStructure.css("display", "none");
            timeUp.html(storedTimeUp);
            timeUp.css("display", "block");
            timeUp.css("color", "white");
            body.css("background-color", "red");
            timeUp.addClass("blink");
            startBtn.prop("disabled", true);
        }
    }, 1000);
    resumeBtn.css("display", "none");
    pauseBtn.css("display", "block");
}

function stopTimer() {
    window.location.href = "../clock+Set+up/index++.html";
}

// $(document).on("mousemove", () => {
//     $("body").addClass("show-buttons");
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//         if (startBtn.is(":visible") || stopBtn.is(":visible") || pauseBtn.is(":visible") || resumeBtn.is(":visible") || resetBtn.is(":visible")) {
//             $("body").removeClass("show-buttons");
//         }
//     }, 3000);
// });