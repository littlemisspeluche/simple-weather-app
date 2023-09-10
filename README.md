# Simple Weather App

This repository consists of the code of the simple-weather-app.
This project fetch WeatherAPI forecast and updates the dashboard data and modify the view: background will change according to the time (day/night) and the weather (e.g. "Sunny", "Patchy light snow" etc.)

Please go over all the steps stated below in order to run this code locally. 

## Start Frontend locally

- Clone the [weather app](https://github.com/littlemisspeluche/simple-weather-app)
- Create .env file in the root directory of the project.
- Visit [WeatherAPI](https://rapidapi.com/weatherapi/api/weatherapi-com/)
- Sign up / Login to create the necessary keys
- Copy 'X-RapidAPI-Key' and 'X-RapidAPI-Host' values
- Add to .env new key "REACT_APP_API_KEY" and paste 'X-RapidAPI-Key' value
- Add to .env new key "REACT_APP_RAPID_API_HOST" and paste 'X-RapidAPI-Host' value

- In order to install project packages you only need to run `yarn`
- In order to start it locally you only need to run `yarn start`, and then open the browser in http://localhost:3000

To see full API documentation go over to: https://www.weatherapi.com/docs/
