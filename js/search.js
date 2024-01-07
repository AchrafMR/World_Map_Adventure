const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const countryInfo = document.getElementById('data_wrapper');
const err = document.getElementById('err');

const API_URL = 'https://restcountries.com/v3.1/name/';

searchButton.addEventListener('click', () => {
  const countryName = searchInput.value.trim();
  if (countryName) {
    fetchData(countryName);
  }
});

async function fetchData(countryName) {
  try {
    const response = await fetch(API_URL + countryName);
    const data = await response.json();
    if (data.status === 404) {
      // displayMessage('Country not found');
      err.innerHTML = 'Country not found';
    } else {
      displayCountry(data[0]);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    displayMessage('An error occurred');
  }
}

function displayCountry(country) {
  countryInfo.innerHTML = `
    <img src="${country.flags.svg}" class="flag-img">
    <h2>${country.name.common}</h2>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Capital:</h4>
            <span>${country.capital}</span>
        </div>
    </div>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Continent:</h4>
            <span>${country.continents[0]}</span>
        </div>
    </div>
      <div class="wrapper">
        <div class="data-wrapper">
            <h4>Population:</h4>
            <span> ${country.population}</span>
        </div>
    </div>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Currency:</h4>
            <span>${
              country.currencies[Object.keys(country.currencies)].name
            } - ${Object.keys(country.currencies)[0]}</span>
        </div>
    </div>
      <div class="wrapper">
        <div class="data-wrapper">
            <h4>Common Languages:</h4>
            <span>${Object.values(country.languages)
              .toString()
              .split(",")
              .join(", ")}</span>
        </div>
    </div>
  `;
}

function displayMessage(message) {
  countryInfo.innerHTML = `<p>${message}</p>`;
}
