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
