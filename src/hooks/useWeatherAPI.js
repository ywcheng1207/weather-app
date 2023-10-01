// library
import { useEffect, useState } from 'react'

const fetchCurrentWeather = ({ FORECAST_URL }) => {
  return fetch(FORECAST_URL)
    .then((res) => res.json())
    .then((data) => {
      const forecastData = data.DailyForecasts[0]
      return {
        locationName: '台北市',
        windSpeed: forecastData.Day.Wind.Speed.Value,
        rainPossibility: forecastData.Day.RainProbability,
        observationTime: forecastData.Day.Date
      }
    })
}

const fetchWeatherCondition = ({ CONDITION_URL }) => {
  return fetch(CONDITION_URL)
    .then((res) => res.json())
    .then((data) => {
      return {
        description: data[0].WeatherText,
        temperature: data[0].Temperature.Metric.Value,
        weatherCode: data[0].WeatherIcon,
        isLoading: false
      }
    })
}

const useWeatherAPI = ({ FORECAST_URL, CONDITION_URL }) => {
  // state
  const [currentWeather, setCurrentWeather] = useState({
    locationName: '台北市',
    description: '',
    windSpeed: 0,
    temperature: 0,
    rainPossibility: 0,
    observationTime: new Date(),
    isLoading: true
  })
  // function
  const fetchData = async () => {
    setCurrentWeather((pre) => ({
      ...pre,
      isLoading: true
    }))
    const [currentWeatherData, conditionData] = await Promise.all([
      fetchCurrentWeather({ FORECAST_URL }),
      fetchWeatherCondition({ CONDITION_URL })
    ])
    setTimeout(() => {
      setCurrentWeather({
        ...currentWeatherData,
        ...conditionData,
        isLoading: false
      })
    }, 300)
  }
  // effect
  useEffect(() => {
    fetchData()
  }, [])

  return [currentWeather, fetchData]
}

export default useWeatherAPI
