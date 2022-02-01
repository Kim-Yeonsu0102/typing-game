const SETTING_TIME = 120;
let words = [];
let time;
let isPlaying = false;
let score = 0;

const url = "https://random-word-api.herokuapp.com/word?number=100";
const wordDisplay = document.querySelector(".word-display");
const wordInput = document.querySelector(".word-input");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const btn = document.getElementById("btn");
const stopBtn = document.getElementById("stop");
const button = document.querySelector(".button");
const bar = document.querySelector(".progress__bar");
const checkBtn = document.getElementById("check_btn");
const lastScoreNum = document.querySelector(".lastScore");

runToast = (text) => {
    const option = {
        text: text,
        duration: 1000,
        newWindow: true,
        offset: {
            x: 0,
            y: 120,
        },
        position: "center",
    };

    Toastify(option).showToast();
};

const gerWords = () => {
    axios
        .get(url)
        .then((res) => {
            words = res.data.filter((word) => word.length < 8);
            button.innerText = "Start";
            stopBtn.disabled = true;
            stopBtn.classList.remove("loading");
            isPlaying = true;
        })
        .catch((err) => console.log(err));
};
const init = () => {
    time = SETTING_TIME;
    gerWords();
};

//게임초기화

const lastScore = () => {
    let lastScoreTxt = `최종 스코어 <br/> <span class="lastScore"> ${scoreDisplay.innerText+"점"} </span>  `;

    wordDisplay.innerHTML = lastScoreTxt;
    wordDisplay.classList.add("fontSize")
    wordDisplay.style.color = "#999";
    // wordDisplay.style.fontSize = "2rem"


    // score.style.color = "#598bcf";
};
const resetDisplayTxt = () => {
    wordDisplay.style.color = "#9d0ca5";
    wordDisplay.classList.remove("fontSize")
    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex];
};

function timeReset() {
    clearInterval(timeInterval);
    wordInput.removeEventListener("input", checkMach);
    bar.classList.remove("animation");
    btn.classList.remove("loading");
    button.innerText = "Reset";
    stopBtn.classList.add("loading");

    btn.disabled = false;
    stopBtn.disabled = true;
}

function reset() {
    resetDisplayTxt();

    time = SETTING_TIME;
    score = 0;
    timeDisplay.innerText = time;

    button.innerText = "Playing Now";
    btn.disabled = false;

    if (time <= time + 1) {
        bar.classList.add("animation");
    }

    wordInput.value = "";
}
//제한시간

const countDown = () => {
    if (time > 0) {
        time--;

        // clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;

    if (time == 0) {
        timeReset();
        lastScore();
    } else {
        wordInput.addEventListener("input", checkMach);
        bar.classList.add("animation");
    }
};

//게임시작

const checkMach = () => {
    let inputValue = wordInput.value.toLowerCase();
    let wordDisplayTxt = wordDisplay.innerText.toLowerCase();

    if (inputValue === wordDisplayTxt) {
        score += 10;
        runToast("Great!!");

        wordInput.value = "";
        const randomIndex = Math.floor(Math.random() * words.length);

        wordDisplay.innerText = words[randomIndex];
    }

    scoreDisplay.innerText = score;

    btn.classList.add("loading");
    btn.disabled = true;
    stopBtn.classList.remove("loading");
    stopBtn.disabled = false;
};

//event handler
function run() {
    if (isPlaying === false) {
        return;
    }
    reset();
    timeInterval = setInterval(countDown, 1000);
    checkMach();
    wordInput.addEventListener("input", checkMach);

    btn.disabled = true;
    stopBtn.disabled = false;
}

function stopTime() {
    if ((stopBtn.disabled = true)) {
        clearInterval(timeInterval);
        timeReset();
        lastScore();
    }
}

//getting Ready

init();

// const mediaSize = window.matchMedia('(min-width: 768px)');
// const changeMedia = (e) => {
//     if (e.matches) {

//         console.log('매치됨');
//     }
// }

// changeMedia(mediaSize);

// mediaSize.addListener(changeMedia);