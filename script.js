const apiKey = "f9df991b4f3f6bf115c4d2c43c4e632c";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cardList = document.getElementById("cardList");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const detailPanel = document.getElementById("detailPanel");
const detailContent = document.getElementById("detailContent");
const closeDetail = document.getElementById("closeDetail");

searchBtn.addEventListener("click", function () {
    getWeather(cityInput.value);
});

closeDetail.addEventListener("click", function () {
    detailPanel.style.display = "none";
});

async function getWeather(city) {
    loading.style.display = "inline";
    error.style.display = "none";
    cardList.innerHTML = "";

    try {
        const response = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            apiKey
        );

        if (response.ok) {
            const data = await response.json();
            loading.style.display = "none";
            createCard(data);
        } else {
            throw new Error();
        }

    } catch (e) {
        loading.style.display = "none";
        error.style.display = "inline";
    }
}

function getInfoArray(data) {
    let infoArray = [];
    infoArray.push("Sıcaklık: " + data.main.temp + " °C");
    infoArray.push("Hissedilen: " + data.main.feels_like + " °C");
    infoArray.push("Nem: %" + data.main.humidity);
    return infoArray;
}

function createCard(data) {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h4");
    title.textContent = data.name;
    card.appendChild(title);

    const infoArray = getInfoArray(data);

    infoArray.forEach(function (info) {
        const p = document.createElement("p");
        p.textContent = info;
        card.appendChild(p);
    });

    const desc = document.createElement("p");
    desc.textContent = data.weather[0].description;
    card.appendChild(desc);

    const btn = document.createElement("button");
    btn.textContent = "Detay";
    btn.addEventListener("click", function () {
        showDetail(data);
    });

    card.appendChild(btn);
    cardList.appendChild(card);
}

function showDetail(data) {
    detailPanel.style.display = "block";
    detailContent.innerHTML = "";

    let details = [];
    details.push("Hissedilen: " + data.main.feels_like + " °C");
    details.push("Nem: %" + data.main.humidity);
    details.push("Rüzgar: " + data.wind.speed + " m/s");

    details.forEach(function (item) {
        const p = document.createElement("p");
        p.textContent = item;
        detailContent.appendChild(p);
    });
}
