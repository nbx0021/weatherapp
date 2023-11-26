document.getElementById('button-addon2').addEventListener('click', async function() {
    const city = document.getElementById('cityInput').value.trim();
    if (city !== '') {
        const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'use your API key',
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            console.log(result); // Log the response to inspect its structure

            // Check if the response contains valid data
            if (result && result.temp && result.humidity) {
                // Update the weather information on the card
                document.getElementById('location').innerText = `${city}`;
                document.getElementById('temperature').innerText = `${result.temp}°C`;
                document.getElementById('humidity').innerText = `${result.humidity}%`;
                
                // Additional weather details
                // You may modify this section based on the available data in your API response
                const additionalDetails = `
                    ☁️ Cloudiness: ${result.cloud_pct}%
                    🌡️ Feels Like: ${result.feels_like}°C
                    ⬇️ Min Temperature: ${result.min_temp}°C
                    ⬆️ Max Temperature: ${result.max_temp}°C
                    🌬️ Wind Speed: ${result.wind_speed} m/s
                    🧭 Wind Degrees: ${result.wind_degrees}°
                    🌅 Sunrise: ${new Date(result.sunrise * 1000).toLocaleTimeString()}
                    🌇 Sunset: ${new Date(result.sunset * 1000).toLocaleTimeString()}
                `;
                document.getElementById('description').innerText = additionalDetails;
            } else {
                console.error('Invalid or incomplete data received from the API.');
            }
        } catch (error) {
            console.error(error);
        }
    }
});
