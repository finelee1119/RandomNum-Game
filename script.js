// 랜덤숫자 문제 내기
let computerNum = 0;

function pickRandomNum() {  // 1~100 사이 랜덤숫자 구하기
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답", computerNum);
}

pickRandomNum()


// html문서(document)에서 필요한 elements 가져오기
let userInput = document.getElementById("user-input") // 유저 입력값
let resultArea = document.getElementById("result-area"); // 결과값

let playButton = document.getElementById("play-button") // play버튼
let resetButton = document.getElementById("reset-button"); // reset버튼

let chances = 5; // 5번의 기회 부여
let gameOver = false; // false로 일단 초기화
let chanceArea = document.getElementById("chance-area"); // 남은 기회

let history = [];


// html문서에서 가져온 elements를 저장한 변수를 활용해서 이벤트 만들기
// "이벤트"가 발생하면 ~라는 함수를 실행시키겠다
playButton.addEventListener("click", play) // play버튼을 클릭하면 play함수 실행
resetButton.addEventListener("click", reset) // reset버튼을 클릭하면 reset함수 실행
userInput.addEventListener("focus", function() { // 익명함수 잠시 활용!(여기서만 쓸 거라)
    userInput.value = ""; // 입력창에 포커스를 두면 입력값 비우기
})


// 실행할 함수 만들기
function play() {  // 유저가 입력한 값을 변수에 저장하고, 비교하기
    let userValue = userInput.value
    
    if(userValue < 1 || userValue > 100) { // 유효성 검사1
        resultArea.textContent = "1과 100 사이 숫자를 입력해주세요"
        return; // 아무것도 리턴하지 않고 play함수를 종료시킴
    }

    if(history.includes(userValue)) { // 유효성 검사2
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요"
        return;
    }


    chances--; // play될 때마다 chance가 1씩 줄어듦
    chanceArea.textContent = `남은 기회 : ${chances}번`; // 동적인 값 : 백틱과 $

    if(userValue < computerNum) {
        resultArea.textContent = "Up!"
    } else if(userValue > computerNum) {
        resultArea.textContent = "Down!"
    } else {
        resultArea.textContent = "정답!"
        gameOver = true; // 정답을 맞추면 게임오버
    }

    history.push(userValue); //유효성 검사와 비교를 마친 값은 history배열에 추가


    if (chances == 0) { // 기회가 0이 되면 게임오버
        gameOver = true;
    }
    
    if (gameOver == true) { // 게임오버가 되면 버튼이 비활성화 되어 게임 불가
        playButton.disabled = true;
    }
}


function reset() {  // reset버튼을 클릭하면, 게임을 리셋해주기
    pickRandomNum();  // 새로운 랜덤숫자를 내주기

    resultArea.textContent = "이번에는 맞춰보세요!" // 결과값이 나오는 곳의 텍스트 수정
    chanceArea.textContent = "남은 기회 : 5번" // 남은 기회가 나오는 곳의 텍스트 표시

    chances = 5; // 기회 채워주기
    gameOver = false; // 게임오버 바꿔주기

    userInput.value = "";  // user input창을 비워주고

    playButton.disabled = false; // play버튼 다시 활성화 

}




// 유저가 이미 입력한 숫자를 또 입력 => "이미 입력했던 숫자입니다" & 기회를 깎지 않음



