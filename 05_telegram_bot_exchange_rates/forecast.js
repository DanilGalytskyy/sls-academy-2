import axios from "axios";

export default async function getWeatherForecast(interval) {
    const api = `https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=f33ff8a6de7d717174ef993a8fd50f3f`;
    const intervalInMilliseconds = interval * 60 * 60 * 1000;

    try {
        const response = await axios.get(api);
        const forecasts = response.data.list;

        let forecastMessage = `Weather forecast for London every ${interval} hours:\n\n`;

        for (let i = 0; i < forecasts.length; i += intervalInMilliseconds / (3 * 60 * 60 * 1000)) {
            const currentForecast = forecasts[i];
            const dateTime = new Date(currentForecast.dt_txt).toLocaleString();
            const temperature = currentForecast.main.temp;
            const weatherDescription = currentForecast.weather[0].description;

            forecastMessage += `${dateTime}\nTemperature: ${temperature}°C\nWeather: ${weatherDescription}\n\n`;
        }

        return forecastMessage;
    } catch (error) {
        throw new Error('Failed to fetch the weather forecast.');
    }
}