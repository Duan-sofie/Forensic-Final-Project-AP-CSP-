// greet user based on last name
let startButton = document.getElementById("start"); 

// event listener for the loveIt button
document.getElementById("loveIt").addEventListener("click", function () {
    interest.innerHTML = "Great !!! Hope you'll like this simulation! Let's get started !!!"; 
    startButton.style.display = "block"; 
});

// event listener for the likeIt button
document.getElementById("likeIt").addEventListener("click", function () {
    interest.innerHTML = "Great ! You've found the right forensic simulation! Let's get started !!!"; 
    startButton.style.display = "block"; 
});

// event listener for the IDK button
document.getElementById("idk").addEventListener("click", function () {
    interest.innerHTML = "Okay! Try this simulation to see if you'll like it :)"; 
    startButton.style.display = "block"; 
});

document.getElementById("start").addEventListener("click", function () {
    document.getElementById("container").style.display = "block"; 
    document.getElementById("homePage").style.display = "none";
});

// user input for last name and greeting
let username = "";
document.getElementById("myButton").addEventListener("click", function () {
    username = checkLastName(document.getElementById("username").value); 
});

function checkLastName(input) {
    input = input.charAt(0).toUpperCase() + input.slice(1);
    let greeting = document.getElementById("greeting"); 
    let nextButton = document.getElementById("next0"); 

    if (input === "") {
        greeting.innerHTML = "Enter your last name."; 
        nextButton.style.display = "none"; 
    } else {
        greeting.innerHTML =
            "Hi, Dr. " + input + ". Please help us find out the truth. Let's begin!"; 
        nextButton.style.display = "inline-block"; 
    }
    return input;
}

document.getElementById("next0").addEventListener("click", function () {
    document.getElementById("step0").style.display = "none"; 
    document.getElementById("step1").style.display = "block"; 
});

// Murder type selection
document.getElementById("submit1").addEventListener("click", function () {
    let selectedMurderType = "";
    let murderRadios = document.getElementsByName("murderType");
    for (let i = 0; i < murderRadios.length; i++) {
        if (murderRadios[i].checked) {
            selectedMurderType = murderRadios[i].value; 
        }
    }

    let murderMessage = document.getElementById("murderMessage"); 
    let nextButton = document.getElementById("next1");

    if (selectedMurderType === "murder") {
        murderMessage.innerHTML = "Correct!"; 
        nextButton.style.display = "inline-block"; 
    } else {
        murderMessage.innerHTML = "Incorrect! The correct answer is 'A murder'."; 
        nextButton.style.display = "none"; 
    }
});

document.getElementById("back1").addEventListener("click", function () {
    document.getElementById("step1").style.display = "none"; 
    document.getElementById("step0").style.display = "block"; 
});

document.getElementById("next1").addEventListener("click", function () {
    document.getElementById("step1").style.display = "none"; 
    document.getElementById("step2").style.display = "block"; 
});

// Weather condition selection
document.getElementById("weatherConditionBtn").addEventListener("click", function () {
    const weatherCondition = document.getElementById("weatherCondition").value.toLowerCase(); 
    const validConditions = ["warm", "normal", "cool"]; // define valid conditions
    let weatherMessage = document.getElementById("weatherMessage"); 
    let nextButton = document.getElementById("next2"); 

    if (validConditions.includes(weatherCondition)) {
        weatherMessage.innerHTML = "You selected " + weatherCondition.toUpperCase() + "!"; // display selected condition
        nextButton.style.display = "inline-block"; 
    } else {
        weatherMessage.innerHTML = "Please enter a valid weather condition (warm, cool, or normal)."; 
        nextButton.style.display = "none"; 
    }
});


document.getElementById("back2").addEventListener("click", function () {
    document.getElementById("step2").style.display = "none"; 
    document.getElementById("step1").style.display = "block"; 
});


document.getElementById("next2").addEventListener("click", function () {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block"; 

    // Pre-calculate temperature options for Step 3
    let timeSinceDeath = calculateTimeSinceDeath(document.getElementById("weatherCondition").value.toLowerCase());
    let timeOptions = [
        (timeSinceDeath - 0.5).toFixed(2) + " hours ago",
        timeSinceDeath + " hours ago",
        (parseFloat(timeSinceDeath) + 0.6).toFixed(2) + " hours ago",
    ];

    // Update the options for the user to select
    document.getElementById("time-option-1-text").innerHTML = timeOptions[0];
    document.getElementById("time-option-2-text").innerHTML = timeOptions[1];
    document.getElementById("time-option-3-text").innerHTML = timeOptions[2];
});

// time since death calculation and selection
function calculateTimeSinceDeath(weatherCondition) {
    let normalBodyTemp = 37;
    let timeSinceDeath;
    let corpseTemp = 32;
    let hourlyTemperatures = [];
    let coolingRate;

    if (weatherCondition === "warm") {
        coolingRate = 0.5;
    } else if (weatherCondition === "normal") {
        coolingRate = 1.0;
    } else if (weatherCondition === "cool") {
        coolingRate = 1.5;
    }

    timeSinceDeath = ((normalBodyTemp - corpseTemp) / coolingRate).toFixed(2); // Calculate time since death

    // display hourly temperatures 
    document.getElementById("timeBasedOnWeather").innerHTML = "The time since death is approximately " + timeSinceDeath + " hours based on " + weatherCondition.toUpperCase() + " weather.";

    for (let i = 0; i < 10; i++) {
        let temp = (normalBodyTemp - i * coolingRate).toFixed(1);
        hourlyTemperatures.push("Hour " + (i + 1) + ": " + temp + "°C"); 
    }

    return timeSinceDeath; 
}

document.getElementById("submit3").addEventListener("click", function () {
    let selectedTimeOption = "";
    let timeOptions = document.getElementsByName("time"); 
    for (let i = 0; i < timeOptions.length; i++) {
        if (timeOptions[i].checked) {
            selectedTimeOption = timeOptions[i].nextElementSibling.innerHTML; 
        }
    }

    let timeOptionsMessage = document.getElementById("timeOptionsMessage"); 
    let nextButton = document.getElementById("next3");
    let correctAnswer = document.getElementById("time-option-2-text").innerText;

    if (selectedTimeOption === correctAnswer) {
        timeOptionsMessage.innerHTML = "Correct!";
        nextButton.style.display = "inline-block"; 
    } else {
        timeOptionsMessage.innerHTML = "Incorrect! Please try again.";
        nextButton.style.display = "none"; 
    }
});

document.getElementById("back3").addEventListener("click", function () {
    document.getElementById("step3").style.display = "none";
    document.getElementById("step2").style.display = "block";
});

document.getElementById("next3").addEventListener("click", function () {
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "block";

    // display hourly temperatures
    document.getElementById("hourlyTemp").innerHTML = hourlyTemperatures.join("<br>");
});

document.getElementById("submit4").addEventListener("click", function () {
    let suspects = document.getElementsByName("cb");
    const selectedSuspects = [];
    for (let i = 0; i < suspects.length; i++) {
        if (suspects[i].checked) {
            selectedSuspects.push(suspects[i].value);
        }
    }

    const correctSuspects = ["Roy R", "Ben B", "May M"];
    let suspectMessage = document.getElementById("suspectMessage");
    let nextButton = document.getElementById("next4");

    let matchCount = 0;
    for (let i = 0; i < selectedSuspects.length; i++) {
        if (correctSuspects.includes(selectedSuspects[i])) {
            matchCount++;
        }
    }

    if (matchCount === correctSuspects.length && selectedSuspects.length === correctSuspects.length) {
        suspectMessage.innerHTML = "Correct!";
        nextButton.style.display = "inline-block"; 
    } else {
        suspectMessage.innerHTML =
            "Incorrect! The correct suspects are Roy R, Ben B, and May M.";
        nextButton.style.display = "none"; 
    }
});

document.getElementById("back4").addEventListener("click", function () {
    document.getElementById("step4").style.display = "none";
    document.getElementById("step3").style.display = "block";
});

document.getElementById("next4").addEventListener("click", function () {
    document.getElementById("step4").style.display = "none";
    document.getElementById("step5").style.display = "block";
});

// Killer selection
document.getElementById("submit5").addEventListener("click", function () {
    let killer = "";
    let killerRadios = document.getElementsByName("killer");
    for (let i = 0; i < killerRadios.length; i++) {
        if (killerRadios[i].checked) {
            killer = killerRadios[i].value;
        }
    }
    
    let nextButton = document.getElementById("next5")
    let killerMessage = document.getElementById("killerMessage");
    if (killer === "Roy R") {
        killerMessage.innerHTML = "Correct!";
        nextButton.style.display = "inline-block";
    } else {
        killerMessage.innerHTML = "Incorrect! The killer is Roy R.";
    }
});


document.getElementById("back5").addEventListener("click", function () {
    document.getElementById("step5").style.display = "none";
    document.getElementById("step4").style.display = "block";
});


document.getElementById("next5").addEventListener("click", function () {
    document.getElementById("step5").style.display = "none";
    document.getElementById("congrats").style.display = "block";

    // display a thank-you message
    let greetingMessage = "Thank you, Dr. " + username + "! You solved the case!";
    document.getElementById("thx").innerHTML = greetingMessage;
    document.getElementById("yeah").style.display = "inline-block"; 
});

document.getElementById("backC").addEventListener("click", function () {
    document.getElementById("congrats").style.display = "none";
    document.getElementById("step5").style.display = "block";
});


document.getElementById("yeah").addEventListener("click", function () {
    document.getElementById("congrats").style.display = "none";
    document.getElementById("restart").style.display = "block";
});


document.getElementById("backR").addEventListener("click", function () {
    document.getElementById("restart").style.display = "none";
    document.getElementById("congrats").style.display = "block";
});

document.getElementById("restartYes").addEventListener("click", function () {
    location.reload(); // Restart the simulation 
});

document.getElementById("restartNo").addEventListener("click", function () {
    alert("Simulation not restarted.");
});



function time() {
    let d = new Date(); 
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = monthNames[d.getMonth()]; 
    let day = d.getDate(); // gets the day of the month.
    let suffix;

    // determines the suffix for the day (like st, nd, rd, th)
    if (day % 10 == 1 && day !== 11) {
        suffix = "st";
    } else if (day % 10 == 2 && day !== 12) {
        suffix = "nd";
    } else if (day % 10 == 3 && day !== 13) {
        suffix = "rd";
    } else {
        suffix = "th";
    }

    let hours = d.getHours(); 
    let minutes = d.getMinutes().toString().padStart(2,"0"); 
    let seconds = d.getSeconds().toString().padStart(2,"0"); 
    let year = d.getFullYear(); 

    return month + " " + day + suffix + " " + year + " " + hours + ":" + minutes + ":" + seconds;
}

function updateTime() {
    document.getElementById("date").innerHTML = time(); 
    setTimeout(updateTime, 1000); 
}


updateTime();

let Blue1 = document.getElementById("Blue1");
let Blue2 = document.getElementById("Blue2");
let Blue3 = document.getElementById("Blue3");
let Blue4 = document.getElementById("Blue4");
let Blue5 = document.getElementById("Blue5");

// colors https://www.w3schools.com/jsref/prop_style_backgroundcolor.asp
Blue1.addEventListener("click", function() {
    document.body.style.backgroundColor = "#1aa5e6"; 
});

Blue2.addEventListener("click", function() {
    document.body.style.backgroundColor = "#417EE8"; 
});

Blue3.addEventListener("click", function() {
    document.body.style.backgroundColor = "#8EAFE8";
});

Blue4.addEventListener("click", function() {
    document.body.style.backgroundColor = "#69D8EB"; 
});
