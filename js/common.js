function saveClear(subject){

    localStorage.setItem(
        "clear_" + subject,
        "true"
    );

}

function goStart(){

    location.href="start.html";

}

function allClear(){

    const subjects = [

        "music",
        "art",
        "calligraphy",
        "home",
        "it",
        "nurse",
        "library",
        "office"

    ];

    return subjects.every(
        s => localStorage.getItem(
            "clear_"+s
        )
    );

}