function date() {
    let currentdate = new Date();
    let year = currentdate.getFullYear()
    let month
    let day
    if ((currentdate.getMonth() + 1) < 10) {
        month = "0" + (currentdate.getMonth() + 1)
    }
    else {
        month = (currentdate.getMonth() + 1)
    }
    if (currentdate.getDate() < 10) {
        day = "0" + currentdate.getDate()
    }
    else {
        day = currentdate.getDate()
    }
    let date = day
    return (date)
}


// function time() {
//     let currenttime = new Date()
//     let time
//     if (currenttime.getHours() < 10) {
//         time = "0" + currenttime.getHours()
//     }
//     else {
//         time = currenttime.getHours()
//     }
//     let hour = time + ":" + "00" + ":" + "00"
//     return (hour)
// }

function walltime() {
    let currenttime = new Date()
    let time = currenttime.getHours()
    return (time)
}

function displaydate(text) {
    let currentdate = new Date();
    let day
    if (date() == text.days[0].datetime.split("-")[2]) {
        if (currentdate.getDay() == 0) {
            day = "Sun"
        }
        else if (currentdate.getDay() == 1) {
            day = "Mon"
        }
        else if (currentdate.getDay() == 2) {
            day = "Tue"
        }
        else if (currentdate.getDay() == 3) {
            day = "Wed"
        }
        else if (currentdate.getDay() == 4) {
            day = "Thu"
        }
        else if (currentdate.getDay() == 5) {
            day = "Fri"
        }
        else if (currentdate.getDay() == 6) {
            day = "Sat"
        }
        else {
            console.log("unkown error in display date function")
        }

    }

    else if (date() > text.days[0].datetime.split("-")[2]) {
        if (currentdate.getDay() == 0) {
            day = "Sat"
        }
        else if (currentdate.getDay() == 1) {
            day = "Sun"
        }
        else if (currentdate.getDay() == 2) {
            day = "Mon"
        }
        else if (currentdate.getDay() == 3) {
            day = "Tue"
        }
        else if (currentdate.getDay() == 4) {
            day = "Wed"
        }
        else if (currentdate.getDay() == 5) {
            day = "Thu"
        }
        else if (currentdate.getDay() == 6) {
            day = "Fri"
        }
        else {
            console.log("unkown error in display date function")
        }

    }

    else {
        if (currentdate.getDay() == 0) {
            day = "Mon"
        }
        else if (currentdate.getDay() == 1) {
            day = "Tue"
        }
        else if (currentdate.getDay() == 2) {
            day = "Wed"
        }
        else if (currentdate.getDay() == 3) {
            day = "Thu"
        }
        else if (currentdate.getDay() == 4) {
            day = "Fri"
        }
        else if (currentdate.getDay() == 5) {
            day = "Sat"
        }
        else if (currentdate.getDay() == 6) {
            day = "Sun"
        }
        else {
            console.log("unkown error in display date function")
        }

    }


    let final = day
    return (final)


}

let city = "delhi"
async function getweather() {
    try {


        let fetch_weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?include=fcst%2Cobs%2Chistfcst%2Cstats%2Cdays%2Chours%2Ccurrent%2Calerts&key=4YUWUDBEDBCX2GU3VCUWVWSPG&options=beta&contentType=json`)
        let text = await fetch_weather.json()

        if (text.currentConditions.conditions.split(",")[0] == "Partially cloudy") {
            video1.src = "video/day-cloudy.webm"
            video2.src =""
        }
        else if (text.currentConditions.conditions.split(",")[0] == "Overcast") {
            video1.src = "video/day-cloudy.webm"
            video2.src =""
        }
        else if (text.currentConditions.conditions.split(",")[0] == "Rain") {
            video1.src = "video/day-cloudy.webm"
            video2.src =""
        }
        else {
            if (walltime() >= 19 || walltime() <= 5) {
                video1.src=""
                video2.src = "video/nightsky.webm"
            }
            else {
                video1.src = "video/clear sky.webm"
                video2.src =""

            }
        }
        document.querySelector(".secondary").innerHTML = ""
        for (let i = 1; i < 15; i++) {
            document.querySelector(".secondary").innerHTML = document.querySelector(".secondary").innerHTML +
                `<div class="block">
            <img src="${video1.src.split("webm")[0] + "png"}" class="backimg">
            <img src="${video2.src.split("webm")[0] + "png"}" class="backimg">
            <div class="details">
                <h1>${text.days[i].datetime}</h1>
                <div class="icon">
                    <center><img src="" width="40px" id="icons${i}"></center>
                    <center><p>${text.days[i].conditions.split(",")[0]}</p></center>
                </div>
                <h2>${Math.floor(0.55 * (text.days[i].feelslike - 32))+"<sup>&deg;</sup>"}</h2>
                
            </div>
            </div>`

            if (text.days[i].conditions.split(",")[0] == "Partially cloudy") {
                document.getElementById(`icons${i}`).src = "https://img.icons8.com/?size=100&id=15359&format=png&color=000000"
            }
            else if (text.days[i].conditions.split(",")[0] == "Overcast") {
                document.getElementById(`icons${i}`).src = "https://img.icons8.com/?size=100&id=15359&format=png&color=000000"
            }
            else if (text.days[i].conditions.split(",")[0] == "Rain") {
                document.getElementById(`icons${i}`).src = "https://img.icons8.com/?size=100&id=15360&format=png&color=000000"
            }
            else {
                document.getElementById(`icons${i}`).src = "https://img.icons8.com/?size=100&id=15352&format=png&color=000000"
            }


            
        }


        document.getElementById("search_submit").classList.remove("none");
        document.getElementById("search_submit2").classList.add("none");
        console.log(text)

        document.getElementById("temp").innerHTML = (Math.floor(0.55 * (text.currentConditions.feelslike - 32))) + "<sup>&deg;</sup>"
        document.getElementById("desc").innerHTML = text.description
        document.getElementById("location").innerHTML = text.resolvedAddress
        document.getElementById("condition").innerHTML = "Weather Condition: " + text.currentConditions.conditions.split(",")[0]
        document.getElementById("date").innerHTML = displaydate(text) + " | " + text.days[0].datetime.split("-")[2]






    }



    catch (error) {
        alert("You Entered Wrong Location")
        city = "delhi"
        getweather()
    }

}

document.getElementById("search_submit").addEventListener("click", () => {
    if (document.getElementById("search").value == "") {
        console.log("No Input Found")
    }
    else if (isNaN(document.getElementById("search").value)) {
        document.getElementById("search_submit").classList.add("none");
        document.getElementById("search_submit2").classList.remove("none");
        city = document.getElementById("search").value
        document.getElementById("search").value = ""
        getweather()

    }
    else {
        console.log("Invalid Input")
    }
})


getweather()


