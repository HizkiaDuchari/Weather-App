const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    console.log(respData);

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement("div");
    weather.classList.add("weather");

    if (temp > 34) {
        weather.innerHTML = `
            <h2>${temp}°C</h2>
            <small>It's BURNING outside</small>
        `;
    }else if (temp <= 34 && temp >=27) {
        weather.innerHTML = `
            <h2>${temp}°C</h2>
            <small>It's kinda hot outside so bring your sunscreen!</small>
        `;
    }else if (temp <= 26 && temp >=20) {
        weather.innerHTML = `
            <h2>${temp}°C</h2>
            <small>It's warm outside! You good to go!</small>
        `;
    }else{
        weather.innerHTML = `
            <h2>${temp}°C</h2>
            <small>It's cold outside! Bring your jacket!</small>
        `;
    }

    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener("submit", (parameters) => {
    parameters.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});
