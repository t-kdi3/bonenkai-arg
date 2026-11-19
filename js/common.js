const RANKING_API_URL =
    "https://script.google.com/macros/s/AKfycbwOvRHsxmXHXbZ3yZ9HY8dQ3c6ZalGXN-h9rWqXcXgDM9MP-5UX6WU0lBfmiQEE20hK/exec";

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

async function resetGlobalRanking(token){
    const response = await fetch(
        RANKING_API_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                action: "reset",
                token: token
            })
        }
    );

    if(!response.ok){
        throw new Error(`ランキングAPIでエラーが発生しました（${response.status}）。`);
    }

    const result = await response.json();

    if(!result.success){
        throw new Error(
            result.message || "ランキングのリセットに失敗しました。"
        );
    }

    return result;
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
