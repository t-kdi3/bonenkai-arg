function saveClear(subject){

    const clears = JSON.parse(
        localStorage.getItem("clears") || "{}"
    );

    clears[subject] = true;

    localStorage.setItem(
        "clears",
        JSON.stringify(clears)
    );

    const keywordMap = {
        art:"ボ",
        calligraphy:"ウ",
        home:"ネ",
        music:"ン",
        nurse:"カ",
        office:"イ",
        library:"タ",
        it:"ノ"
    };

    const keyword = keywordMap[subject];

    let history = JSON.parse(
        localStorage.getItem(
            "keywordHistory"
        ) || "[]"
    );

    if(
        keyword &&
        !history.includes(keyword)
    ){
        history.push(keyword);

        localStorage.setItem(
            "keywordHistory",
            JSON.stringify(history)
        );
    }
}

function goStart(){
    location.href = "start.html";
}

function startWrongAnswerCooldown(options){
    const controls = options.controls || [];
    const feedback = options.feedback;
    const seconds = options.seconds || 5;
    const message = options.message || "不正解です。";

    if (startWrongAnswerCooldown.active) {
        return;
    }

    startWrongAnswerCooldown.active = true;
    controls.forEach((control) => {
        control.disabled = true;
    });

    let remaining = seconds;
    if (feedback) {
        feedback.textContent = `${message} 再挑戦まであと${remaining}秒`;
    }

    const timer = window.setInterval(() => {
        remaining -= 1;
        if (feedback) {
            feedback.textContent =
                remaining > 0
                    ? `${message} 再挑戦まであと${remaining}秒`
                    : `${message} もう一度挑戦できます。`;
        }

        if (remaining <= 0) {
            window.clearInterval(timer);
            controls.forEach((control) => {
                control.disabled = false;
            });
            startWrongAnswerCooldown.active = false;
        }
    }, 1000);
}
