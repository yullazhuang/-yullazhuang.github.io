const apiKey = '6a2e0477f1ca58227429606183f228b5';
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherIcon = document.getElementById('weather-icon');
const tempElement = document.querySelector('.feellike');
const humidityElement = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const visibility = document.querySelector('.visibility');
const suggestions = document.querySelector('suggestions');
const weatherImage = document.getElementById('weatherImage');


async function getWeatherData(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  if (response.ok) {
    cityName.textContent = data.name;
    temperature.textContent = `${data.main.temp.toFixed()}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    tempElement.textContent = `${data.main.temp.toFixed()}°C`;
    humidityElement.textContent = `${data.main.humidity}%`;
    pressure.textContent = ` ${data.main.pressure} hPa`;
    sunrise.textContent = `${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    sunset.textContent = `${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
    visibility.textContent = `${data.visibility / 1000} km`;
  } else {
    alert('Error fetching weather data.');
  }
}

function updateWeatherImage(temperature) {
  if (temperature < 10) {
    weatherImage.src = 'assets/images/cloud.png';
  } else if (temperature >= 10 && temperature < 20) {
    weatherImage.src = 'assets/images/partly-sun.png';
  } else if (temperature >= 20 && temperature < 25) {
    weatherImage.src = 'assets/images/rain.png';
  } else if (temperature >= 25 && temperature < 30) {
    weatherImage.src = 'assets/images/sun.png';
  } else {
    weatherImage.src = 'assets/images/thunderstorm.png';
  }
}

// Gọi hàm với nhiệt độ mẫu
updateWeatherImage(15);
// Lấy thông tin thời tiết của Hà Nội khi trang được tải
getWeatherData('Hanoi');

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  const city = cityInput.value;
  getWeatherData(city);
});