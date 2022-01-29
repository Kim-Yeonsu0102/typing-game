const SETTING_TIME = 5;
let words02 = ["1", "2", "3"];
let words = [
    "넌 신 같은 거 될 수도 없고, 되어서도 안 돼.",
    "끝과 시작의 밤에, 한 편의 이야기를 지어 비밀로 간직하라.",
    "상서로운 짐승과 선인이 살아나 이야기의 주인을 찾으리니.",
    "그러니까 나랑 만나. 앞으로 세 번.",
    "애초에 내 관심사는 너 하나야.",
    "빌어먹을 선하 자식이 벌여 놓은 일은 내가 수습하지.",
    "그럼 내 집으로 와.",
    "비켜. 난 내 반려를 보러왔으니까.",
    "난 네가 수 천 번 날 바람 맞혀도 화 안나.",
    "가재나 게 같은 걸 별로 안 좋아하는 것뿐이야.",
];
let time;
let isPlaying = false;
let score = 0;

const wordDisplay = document.querySelector(".word-display");
const wordInput = document.querySelector(".word-input");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const btn = document.getElementById("btn");
const stopBtn = document.getElementById("stop");
const button = document.querySelector(".button");
const bar = document.querySelector(".progress__bar");
const checkBtn = document.getElementById("check_btn");



//게임초기화

function timeReset() {
    clearInterval(timeInterval);
    wordInput.removeEventListener("input", checkMach);
    bar.classList.remove("animation");
    btn.classList.remove("loading");
    button.innerText = "Reset";
    btn.disabled = false;
    stopBtn.disabled = true;
    stopBtn.classList.add("loading");
}



function reset() {
    time = 120;
    score = 0;
    timeDisplay.innerText = time;
    button.innerText = "Playing Now";
    btn.disabled = false;
    stopBtn.disabled = true;
    stopBtn.classList.remove("loading");

    if (time <= time + 1) {
        bar.classList.add("animation");
    }

    wordInput.value = "";
    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex];
}
//제한시간

const countDown = () => {
    time = 120;
    if (time > 0) {
        time--;

        // clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;

    if (time == 0) {
        timeReset();
    } else {
        wordInput.addEventListener("input", checkMach);
        bar.classList.add("animation");
    }
};

//게임시작

const checkMach = () => {
    bar.classList.add("animation");

    let inputValue = wordInput.value.toLowerCase();
    let wordDisplayTxt = wordDisplay.innerText.toLowerCase();

    if (inputValue === wordDisplayTxt) {
        score += 10;

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
    reset();
    timeInterval = setInterval(countDown, 1000);
    checkMach();
    btn.disabled = true;
    stopBtn.disabled = false;
}

function stopTime() {
    if ((stopBtn.disabled = true)) {
        clearInterval(timeInterval);
        timeReset();
    }
}

wordInput.addEventListener("input", checkMach);