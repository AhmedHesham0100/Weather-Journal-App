/* Global Variables */

// Personal API Key for OpenWeatherMap API
const appId = "0e50a2ab5f172cdeea2ee4c0d3415973";

// inputs
const zipCode = document.querySelector("#zip");
const feelingComment = document.querySelector("#feelings");

// generate button 
const btnGenerate = document.querySelector("#generate");

//dat for update ui
const dateForUi = document.querySelector("#date");
const tempForUi = document.querySelector("#temp");
const contentForUi = document.querySelector("#content");

// url weather api
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

//////////////////////////////////////////////////////////

// post request-- data from user function
const postData = async (url = '', data = {}) => {

    console.log("inputs data:", data);

    const response = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        const dataNew = await response.json()
        console.log("new data", dataNew)
        return dataNew
    }
    catch (error) {
        console.log("error", error)
    }

}

// update ui function
async function updateUI() {

    const response = await fetch("/getdata")

    const data = await response.json()
    console.log("updtae ui", data)

    tempForUi.innerText = `${Math.round(data.temp)}  °C`;
    contentForUi.innerText = data.comment;
    dateForUi.innerText = data.date;
}

// function fetch weather
const fetchWeather = async (url) => {

    const response = await fetch(url, {
        method: 'GET',
       
    })
    try {
        const data = await response.json()
        return data
    }
    catch (error) {
        console.log("error", error)
    }
}

// weather api request
async function weatherRequest() {

    const zipCodeValue = zipCode.value;

    const requestUrl = `${baseUrl}?zip=${zipCodeValue}&units=metric&appid=${appId}`

    if (zipCodeValue.length === 5 && feelingComment.value !== "") {

        const returnRequestWeather = await fetchWeather(requestUrl);

        const temp = returnRequestWeather.main.temp

        // Create a new date instance dynamically with JS
        let d = new Date();
        let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();

        const myData = {
            temp: temp,
            comment: feelingComment.value,
            date: newDate,
        }

        await postData('/postdata', myData)

        await updateUI();

    } else {
        if (zipCodeValue.length !== 5) {
            console.error("zip code value length not equal 5 !!!")
            alert("zip code value length not equal 5 !!!")
        } else {
            console.error("you should enter feeling today !!!")
            alert("you should enter feeling today !!!")
        }

        return
    }
}

//after click generate button
btnGenerate.addEventListener("click", weatherRequest);

