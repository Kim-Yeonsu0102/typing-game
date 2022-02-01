const SETTING_TIME = 120;
let words = [];
let words02 = [
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
    "제가 당신을 얼마나 열렬히 흠모하고 사랑하는지를 말씀드리지 않을 수가 없습니다.",
    "김자크 사랑합니다.",
    "",
];
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




runToast = (text) => {
    const option = {
        text: text,
        duration: 1000,
        newWindow: true,
        offset: {
            x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 120 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        position: 'center',
        backgroundColor: 'linear-gradient(45deg, #58cf8f, #69dc82 )',

    }
    Toastify(option).showToast()

}
runToast()

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

    if (time <= time + 1) {
        bar.classList.add("animation");
    }

    wordInput.value = "";
    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex];
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
        runToast("Great!!")


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
    }
}

//getting Ready

init();