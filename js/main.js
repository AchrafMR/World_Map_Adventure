let country_content = document.getElementById("country_content");
let data_wrapper = document.getElementById("data_wrapper");
let close_btn = document.querySelector(".close");

document.querySelectorAll(".allPaths").forEach(e => {

    let countryName = e.id;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    console.log(finalURL);

    e.addEventListener("mouseover", function () {
        window.onmousemove=function (j) {
            x = j.clientX;
            y = j.clientY;
            document.getElementById('name_container').style.top = y-60  + 'px';
            document.getElementById('name_container').style.left = x +10 + 'px';
        }
        
        e.style.fill = "#fa0";
        document.getElementById("name_container").style.opacity = 1;
        
        document.getElementById("name_country").innerText = e.id;
    });
    e.addEventListener("mouseleave", function () {
        e.style.fill = "#ececec";
        document.getElementById("name_container").style.opacity = 0;
    });

    e.addEventListener('click', async () => {
        console.log(e.id);
        fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
            country_content.style.display = 'block';
            close_btn.addEventListener('click', function(){
                country_content.style.display = 'none';
            });
            data_wrapper.innerHTML = `
            <img src="${data[0].flags.svg}" class="flag-img">
            <h2>${data[0].name.common}</h2>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Capital:</h4>
                    <span>${data[0].capital[0]}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Continent:</h4>
                    <span>${data[0].continents[0]}</span>
                </div>
            </div>
             <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Population:</h4>
                    <span>${data[0].population}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Currency:</h4>
                    <span>${
                      data[0].currencies[Object.keys(data[0].currencies)].name
                    } - ${Object.keys(data[0].currencies)[0]}</span>
                </div>
            </div>
             <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Common Languages:</h4>
                    <span>${Object.values(data[0].languages)
                      .toString()
                      .split(",")
                      .join(", ")}</span>
                </div>
            </div>
            `;
        });
    });
});