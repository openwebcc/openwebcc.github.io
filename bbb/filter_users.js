// implement a user-filter in BBB

// prepare pulldown
let participantsList = [];
let avatarClass = null;

// prepare textbox
let userNameDivs = [];
let userNameClass = null;

// isolate "real" classname from added random string (e.g. participantsList--1MvMwF)
const isClass = function (cls, clsname) {
    return (cls.split("--")[0]) === clsname;
}

// collect DIVs and real class names
const divs = document.querySelectorAll("div");
for (let i = 0; i < divs.length; i++) {
    const maindiv = divs[i];

    for (let cls of maindiv.classList) {
        if (isClass(cls, "participantsList")) {
            // remember DIV in participants list
            participantsList.push(maindiv);

            // set initial filter status for pulldown and textbox in data-attributes
            maindiv.setAttribute("data-filtered-status", "show");
            maindiv.setAttribute("data-filtered-keyword", "show");

            // get all DIVs for this participant and extract real classnames and username string
            const subdivs = maindiv.querySelectorAll("div");
            for (let subdiv of subdivs) {
                for (let subcls of subdiv.classList) {
                    if (isClass(subcls, "userAvatar")) {
                        // remember "real" classname of avatar DIV that holds status info for pulldown search
                        avatarClass = subcls;
                    } else if (isClass(subcls, "userName")) {
                        // remember "real" classname of username DIV for textbox search
                        userNameClass = subcls;

                        // remember DIV for textbox search
                        userNameDivs.push(subdiv.innerText);
                    }
                }
            }
        }
    }
}

// handle pulldown menu
document.querySelector(".filter-status--klaus").onchange = function (evt) {
    // set filter to apply
    const filter = evt.target.options[evt.target.options.selectedIndex].value;

    // loop through DIVs of participants list
    for (maindiv of participantsList) {
        // preset status of this participant
        let status = {
            avatar: false,
            moderator: false,
            presenter: false,
            muted: false,
            voice: false,
            listenOnly: false,
        }
        // extract current status from first DIV of avatar DIV
        let classes = maindiv.querySelector(`.${avatarClass} > div`).classList;
        for (cls of classes) {
            cls = cls.split("--")[0];
            if (status.hasOwnProperty(cls)) {
                status[cls] = true;
            } else {
                // notify developer in case more status classes are found in other settings
                alert(`Unknown status ${cls}: please implement it`)
            }
        }

        // set visiblity status in data-attribute "data-filtered-status" according to pulldown value 
        if (filter === "") {
            maindiv.dataset.filteredStatus = "show";
        } else if (filter === "moderator" && status.moderator) {
            maindiv.dataset.filteredStatus = "show";
        } else if (filter === "presenter" && status.presenter) {
            maindiv.dataset.filteredStatus = "show";
        } else if (filter === "voice_active" && status.voice && !status.muted && !status.listenOnly) {
            maindiv.dataset.filteredStatus = "show";
        } else if (filter === "voice_muted" && status.voice && status.muted) {
            maindiv.dataset.filteredStatus = "show";
        } else if (filter === "listenOnly" && status.listenOnly) {
            maindiv.dataset.filteredStatus = "show";
        } else {
            maindiv.dataset.filteredStatus = "hide";
        }

        // show / hide entry taking keyword filter into account
        if (maindiv.dataset.filteredStatus === "show" && maindiv.dataset.filteredKeyword === "show") {
            // show entry
            maindiv.style.display = "block";
        } else {
            // hide entry
            maindiv.style.display = "none";
        }
    }
}

// handle keyword search
document.querySelector(".filter-keyword-klaus").onkeyup = function (evt) {
    // set keyword text to search for
    let val = evt.target.value;

    // loop through DIVs with names of participants
    for (let i = 0; i < userNameDivs.length; i += 1) {
        // add shortcuts to main DIV and username string
        let maindiv = participantsList[i];
        let username = userNameDivs[i];

        // set regexp to search for keyword
        let re = new RegExp(val, "i");

        // set visiblity status in data-attribute "data-filtered-keyword" according to keyword match 
        if (val === "" || username.search(re) !== -1) {
            participantsList[i].dataset.filteredKeyword = "show";
        } else {
            participantsList[i].dataset.filteredKeyword = "hide";

        }

        // show / hide entry taking pulldown filter into account
        if (maindiv.dataset.filteredStatus === "show" && maindiv.dataset.filteredKeyword === "show") {
            // show entry
            maindiv.style.display = "block";
        } else {
            // hide entry
            maindiv.style.display = "none";
        }
    }
}